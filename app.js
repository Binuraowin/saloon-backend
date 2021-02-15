const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


app.use(morgan('dev'))
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


//DB config
const connection_url = '';
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
});

mongoose.Promise = global.Promise;


app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS'){
        res.header("Access-Control-Allow-Methods",'PUT,POST,PATCH,DELETE');
        return res.status(200).json({});
    }
})


app.use((req,res,next)=>{
    const err = new Error('not found');
    err.status = 404;
    next(err);
})

app.use((err, req,res,next)=>{
    res.status(err.status || 500);
    res.json({
        err:{
            message:err.message
        }
    })
})

module.exports = app;