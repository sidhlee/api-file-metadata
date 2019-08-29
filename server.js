'use strict'

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api');
const multer = require('multer');


const app  = express();

app.use(cors());
//TODO: when do we need the path for express.static?
app.use('/public',express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/views/index.html');
})

app.use('/api', apiRouter);

app.use((req, res, next) => {
    return next({status: 400, message: 'not found'}) // closes connection & fails the request
})


app.use((err, req, res, next) => { //http://expressjs.com/en/guide/error-handling.html
    console.error(err.stack || err); // writes to stderr (console.log writes to stdout)

    let errCode, errMessage;

    if( err instanceof multer.MulterError) { // if Multer error while uploading
        errCode = 406 // Not Acceptable (server doesn't find content following the criteria given by the user agent
        errMessage = err.message || 'Error Uploading File(s) with Multer'
    } else { // generic or custom error
        errCode = err.status || 500
        errMessage = err.message || 'Internal Server Error'
    }
    res.status(errCode).type('text')
      .send(errMessage);
});

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
});

