const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = express.Router();

app.use(morgan('dev'))
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


const appointmentRoutes = require('./api/routes/appointments');
const employeeRoutes = require('./api/routes/employees');

//middlewares
app.use(express.json());
app.use((req,res,next) =>{
        res.setHeader('Access-Control-Expose-Headers','Content-Range'),
        res.setHeader('Access-Control-Allow-Origin','*'),
        res.setHeader('Access-Control-Allow-Headers','*'),
        next()
})

app.use('/appointments',appointmentRoutes);
app.use('/employee',employeeRoutes);

//DB config
const connection_url = 'mongodb://admin:admin@cluster0-shard-00-00.nctsk.mongodb.net:27017,cluster0-shard-00-01.nctsk.mongodb.net:27017,cluster0-shard-00-02.nctsk.mongodb.net:27017/saloon?ssl=true&replicaSet=atlas-mx6mbv-shard-0&authSource=admin&retryWrites=true&w=majority';
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