const mongoose = require("mongoose");

const Employee = require('../models/employee');
const Appointment = require('../models/appointment');


exports.appointment_get_all = (req,res,next)=>{
    Appointment.find().select(
        "userName _id date time service id consumer email phone"
    ).exec()
    .then(docs => {
        const response = {
          // count: docs.length,
          products: docs.map(doc => {
            return {
              userName: doc.userName,
              date: doc.date,
              time: doc.time,
              service: doc.service,
              _id: doc._id,
              id:doc.id,
              request: {
                type: "GET",
                url: "http://localhost:3000/appointments/" + doc._id
              }
            };
          })
        };
        //   if (docs.length >= 0) {
          res.header('Content-Range', 'Appointments 0-2/10')
        res.status(200).json(docs);
        //   } else {
        //       res.status(404).json({
        //           message: 'No entries found'
        //       });
        //   }
      })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
}

exports.appointment_create =(req,res,next) =>{
  Appointment.find({
    date:req.body.date,
    time:req.body.time,
    consumer:req.body.consumer,
  }).exec()
  .then(appointment =>{
    if(appointment.length > 3){
      return res.status(404).json({
        message: "Date Fixed"
      });
    }else{
      const appointment = new Appointment({
        _id: new mongoose.Types.ObjectId(),
        userName: req.body.userName,
        date: req.body.date,
        time: req.body.time,
        service: req.body.service,
        consumer:req.body.consumer,
        email:req.body.email,
        phone:req.body.phone,
        id:req.body.id

    });
    appointment.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created appointement successfully",
          createdProduct: {
            userName: result.name,
            date: result.price,
            time: result.time,
            service: result.service,
            consumer:result.consumer,
            email:result.email,
            phone:result.phone,
            id:result.id,
            _id: result._id,
            // request: {
            //   type: "POST",
            //   url: "http://localhost:3000/appointments/" + result._id
            // }
          }
        });
      })
    }
  })
  .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
}

exports.appointment_get_one = (req,res,next) =>{
  const id = req.params.apointmentId;
  Appointment.findById(id)
    .select( "userName _id date time service id")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          appointment: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/appintments"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
}

exports.appointment_update = (req,res,next) =>{
  const id = req.params.apointmentId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Appointment.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "apointment updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/apointments/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.appointment_delete =(req,res,next) =>{
  const id = req.params.apointmentId;
  Appointment.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Appointment deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/appointments",
          body: { userName: "String", date: "Number" }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}