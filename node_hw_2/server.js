const express = require('express');
const app = express();

const log = require('./routes/middleware/log');
const auth = require('./routes/middleware/auth');

const booksRouter = require('./routes/api/books');
const loginRouter = require('./routes/api/login');
const userRouter = require('./routes/api/me');
const notesRouter = require('./routes/api/notes');

app.use(express.json());
app.use(log);

app.use('/api', booksRouter);
app.use('/api', loginRouter);

app.use(auth);
app.use('/api', userRouter);
//app.use(auth);
app.use('/api', notesRouter);

app.listen(8081);
 //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJLYXRlcnluYSIsInBhc3N3b3JkIjoiMTIzYWJjIiwiaWF0IjoxNTg0NjExNjU3fQ.oDkd42w7kdsoy4esK-YZB9cm2BFIBnDKlZvJFtDXsoc