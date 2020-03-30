const express = require('express');
require('../app/db/connect');
const cors = require('cors');

const app = express();

// const log = require('./routes/middleware/log');
// const auth = require('./routes/middleware/auth');

//  const loginRouter = require('./routes/api/login');
const driverRouter = require('./routes/api/drivers');

app.use(express.json());
app.use(cors());
//  app.use(log);
app.use('/api', driverRouter);
//  app.use('/api', loginRouter);

//  app.use(auth);


app.listen(8081);