const mongoose = require("mongoose");

const Employee = require('../models/employee');
const Appointment = require('../models/appointment');


exports.appointment_get_all = (req,res,next)=>{
    Appointment.find().select(
        "userName _id date time service"
    ).exec()
    .then(docs => {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
            return {
              userName: doc.userName,
              date: doc.date,
              time: doc.time,
              service: doc.service,
              _id: doc._id,
              request: {
                type: "GET",
                url: "http://localhost:3000/products/" + doc._id
              }
            };
          })
        };
        //   if (docs.length >= 0) {
        res.status(200).json(response);
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
    const appointment = new Appointment({
        _id: new mongoose.Types.ObjectId(),
        userName: req.body.userName,
        date: req.body.date,
        time: req.body.time,
        service: req.body.service,

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
            _id: result._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/appointments/" + result._id
            }
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