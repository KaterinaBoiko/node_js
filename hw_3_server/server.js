const express = require('express');
require('./db/connect');
const cors = require('cors');

const app = express();

const log = require('./routes/middleware/log');
const auth = require('./routes/middleware/auth');

const loginRouter = require('./routes/api/login');
const driverRouter = require('./routes/api/drivers');
const shipperRouter = require('./routes/api/shippers');
const truckRouter = require('./routes/api/trucks');
const loadRouter = require('./routes/api/loads');
const profileRouter = require('./routes/api/profile');

app.use(express.json());
app.use(cors());
app.use(log);
app.use('/api', loginRouter);
app.use('/api', driverRouter);
app.use('/api', shipperRouter);

app.use(auth);

app.use('/api', profileRouter);
app.use('/api', truckRouter);
app.use('/api', loadRouter);

app.listen(8081);
