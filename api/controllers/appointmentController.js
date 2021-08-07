const mongoose = require("mongoose");
const {
  v4: uuidv4
} = require('uuid');
const Employee = require('../models/employee');
const Appointment = require('../models/appointment');


exports.appointment_get_all = (req, res, next) => {
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
            id: doc.id,
            request: {
              type: "GET",
              url: "http://localhost:3000/appointments/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.header('Content-Range', 'Appointments 0-5/20')
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

exports.appointment_create = (req, res, next) => {
  Appointment.find({
      date: req.body.date,
      time: req.body.time,
      consumer: req.body.consumer,
    }).exec()
    .then(appointment => {
      if (appointment.length > 2) {
        return res.status(404).json({
          message: "Date Fixed"
        });
      } else {
        const appointment = new Appointment({
          _id: new mongoose.Types.ObjectId(),
          userName: req.body.userName,
          date: req.body.date,
          time: req.body.time,
          service: req.body.service,
          consumer: req.body.consumer,
          email: req.body.email,
          phone: req.body.phone,
          id: uuidv4(),
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
                consumer: result.consumer,
                email: result.email,
                phone: result.phone,
                id: result.id,
                _id: result._id,
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

exports.appointment_get_one = (req, res, next) => {
  const id = req.params.appointmentId;
  Appointment.find({
      id: id,
    }).select("userName _id date time service id consumer email phone")
    .exec()
    .then(doc => {
      if (doc) {
        res.header('Content-Range', 'Employees 0-2/10')
        // res.setHeader('X-Total-Count', docs.length);
        res.status(201).json({
           id:1,
           userName: doc[0].userName,
            date: doc[0].date,
            time: doc[0].time,
            service: doc[0].service,
            consumer: doc[0].consumer,
            email: doc[0].email,
            phone: doc[0].phone,
            _id: doc[0]._id,
        });
      } else {
        res
          .status(404)
          .json({
            message: "No valid entry found for provided ID"
          });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.appointment_update = (req, res, next) => {
  const id = req.params.appointmentId;
  Appointment.findByIdAndUpdate(req.body._id,req.body,{ useFindAndModify: false })
    .exec()
    .then(result => {
      res.header('Content-Range', 'Employees 0-2/10')
      console.log(result)
      // res.setHeader('X-Total-Count', docs.length);
      res.status(201).json({
        id:1,
        userName: result.userName,
         date: result.date,
         time: result.time,
         service: result.service,
         consumer: result.consumer,
         email: result.email,
         phone: result.phone,
         _id: result._id,
       
     });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.appointment_delete = (req, res, next) => {
  const id = req.params.appointmentId;
  Appointment.find({
    id: id,
  }).select("userName _id date time service id consumer email phone")
  .exec()
  .then(doc => {
    if (doc) {
      Appointment.findByIdAndRemove({
        _id: doc[0]._id
      })
      .exec()
      .then(result => {
        res.header('Content-Range', 'Employees 0-2/10')
        // res.setHeader('X-Total-Count', docs.length);
        res.status(201).json({
           id:1,
           userName: result.userName,
            date: result.date,
            time: result.time,
            service: result.service,
            consumer: result.consumer,
            email: result.email,
            phone: result.phone,
            _id: result._id,
          
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });

    } else {
      res
        .status(404)
        .json({
          message: "No valid entry found for provided ID"
        });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });

}