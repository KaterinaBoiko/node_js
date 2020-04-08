const express = require('express');
const Load = require('../../db/models/load');
const Truck = require('../../db/models/truck');
const loadSchema = require('../../joiSchemas/loadSchema');
const router = express.Router();

router.get('/loads', (req, res) => {
    if (req.user.role == 'shipper') {
        Load.find({ created_by: req.user._id })
            .then(loads => res.json({ status: 'Success', loads }))
            .catch(e => { res.status(500).json(e.message) })
    } else if (req.user.role == 'driver') {
        Load.find({ assigned_to: req.user._id })
            .then(loads => res.json({ status: 'Success', loads }))
            .catch(e => { res.status(500).json(e.message) })
    }
});

router.get('/loads/:id', (req, res) => {
    Load.findById(req.params.id)
        .then(load => res.json({ status: 'ok', load }))
        .catch(e => { res.status(500).json(e.message) })
});

router.post('/loads', (req, res) => {
    const { error, value } = loadSchema.validate(req.body);
    if (error)
        return res.status(400).json(error.details[0].message)
    if (req.user.role != 'shipper')
        return res.status(400).json('You don`t have permission')

    const load = new Load(value);
    load.save()
        .then(() => { res.json({ status: 'Load created successfully' }) })
        .catch(e => { res.status(500).json(e.message) });
});

router.delete('/loads/:id', async (req, res) => {
    await Load.findById(req.params.id)
        .then(load => {
            if (load.status != 'new')
                return res.status(400).json('You can delete only NEW loads.')
        })
        .catch(e => { res.status(500).json(e.message) })

    Load.findByIdAndDelete(req.params.id)
        .then(() => res.json({ status: 'ok' }))
        .catch(e => { res.status(500).json(e.message) })
});

router.put('/loads/:id', (req, res) => {
    const { error, value } = loadSchema.validate(req.body);
    if (error)
        res.status(400).json(error.details[0].message)
    else {
        Load.findByIdAndUpdate(req.params.id, value, { new: true })
            .then(load => res.json({ status: 'ok', truck }))
            .catch(e => { res.status(500).json(e.message) })
    }
});

router.patch('/loads/:id/post', (req, res) => {
    const { error, } = loadSchema.validate(req.body);
    if (error)
        return res.status(400).json(error.details[0].message);
    if (req.user.role != 'shipper')
        return res.status(400).json('You don`t have permission')

    Load.findById(req.params.id)
        .then(async load => {
            result = await findTruckForLoad(load);
            console.log(result);
            res.json(result)
        })
        .catch(e => { res.status(500).json(e.message) })
})

router.patch('/loads/:id/state', (req, res) => {
    const { error, value } = loadSchema.validate(req.body);
    if (error)
        return res.status(400).json(error.details[0].message);
    if (req.user.role != 'driver' && req.user._id != value.assigned_to)
        return res.status(400).json('You don`t have permission')

    Load.findByIdAndUpdate(req.params.id, { state: value.state }, { new: true })
        .then(() => res.json({ status: 'Load state changed successfully' }))
        .catch(e => { res.status(500).json(e.message) })
})

function findTruckForLoad(load) {
    console.log(load);
    Load.findByIdAndUpdate(load._id, { status: 'posted' }, { new: true })

    return Truck.find({ assigned_to: { $ne: null }, status: { abbr: 'is', status: 'in service' } })
        .then(trucks => {
            const truck = trucks.find(x => compareLoadAndTruck(load, x))
            console.log(truck);
            if (!truck) {
                Load.findByIdAndUpdate(load._id, { status: 'new' }, { new: true })
                return { status: 'No drivers found' }
            } else {
                Truck.findByIdAndUpdate(truck._id, { status: { abbr: 'ol', status: 'on load' } }, { new: true })
                Load.findByIdAndUpdate(load._id, { state: 'en route to pick up' }, { new: true })
                return {
                    status: 'Load posted successfully',
                    assigned_to: truck.assigned_to
                }
            }
        })
        .catch(e => e)
}

function compareLoadAndTruck(load, truck) {
    return (
        truck.type.dimensions.width >= load.dimensions.width &&
        truck.type.dimensions.length >= load.dimensions.length &&
        truck.type.dimensions.height >= load.dimensions.height &&
        truck.type.payload >= load.payload
    );
}

module.exports = router;