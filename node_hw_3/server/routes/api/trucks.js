const express = require('express');
const Truck = require('../../db/models/truck');
const truckSchema = require('../../joiSchemas/truckSchema');
const router = express.Router();

router.get('/trucks', (req, res) => {
    Truck.find({ created_by: req.user._id })
        .then(trucks => res.json({ status: 'ok', trucks }))
        .catch(e => { res.status(500).json(e.message) })
});

router.get('/readytrucks', (req, res) => {
    Truck.find({ assigned_by: { $ne: null }, status: { abbr: 'is', status: 'in service' } })
        .then(trucks => res.json({ status: 'ok', trucks }))
        .catch(e => { res.status(500).json(e.message) })
})

router.get('/trucks/:id', (req, res) => {
    Truck.findById(req.params.id)
        .then(truck => res.json({ status: 'ok', truck }))
        .catch(e => { res.status(500).json(e.message) })
});

router.post('/trucks', (req, res) => {
    const { error, value } = truckSchema.validate(req.body);
    if (error)
        res.status(400).json(error.details[0].message)
    else {
        const truck = new Truck(value);
        truck.save()
            .then(() => { res.json({ status: 'new truck created' }) })
            .catch(e => { res.status(500).json(e.message) });
    }
});

router.delete('/trucks/:id', (req, res) => {
    Truck.findByIdAndDelete(req.params.id)
        .then(() => res.json({ status: 'ok' }))
        .catch(e => { res.status(500).json(e.message) })
});

router.put('/trucks/:id', async (req, res) => {
    const { error, value } = truckSchema.validate(req.body);
    if (error)
        res.status(400).json(error.details[0].message)
    else {
        if (value.assigned_by) {
            await Truck.findOne({ assigned_by: value.assigned_by }, (err, truck) => {
                if (truck) {
                    truck.assigned_by = undefined;
                    truck.save();
                }
            })
        }
        Truck.findByIdAndUpdate(req.params.id, value, { new: true })
            .then(truck => res.json({ status: 'ok', truck }))
            .catch(e => { res.status(500).json(e.message) })
    }
});


router.patch('/trucks/:id/status', (req, res) => {
    const { error, value } = truckSchema.validate(req.body);
    if (error)
        return res.status(400).json(error.details[0].message);

    Truck.findByIdAndUpdate(req.params.id, value, { new: true })
        .then((truck) => res.json({ status: 'Truck status changed successfully', driverId: truck.assigned_by }))
        .catch(e => { res.status(500).json(e.message) })
})

module.exports = router;