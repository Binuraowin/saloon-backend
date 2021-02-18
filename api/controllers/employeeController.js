const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const Employee = require('../models/employee');


exports.employee_signup = (req,res,next) =>{
    Employee.find({name: req.body.name})
    .exec()
    .then(employee => {
        if (employee.length >= 1) {
          return res.status(409).json({
            message: "UserName Exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new Employee({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                id:uuidv4(),
                jobRole: req.body.jobRole,
                service: req.body.service,
                workingHours: req.body.workingHours,
                workedHours: req.body.workedHours,
                sallery: req.body.sallery,
                password: hash
              });
              user
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: "User created"
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
}

exports.employee_login = (req,res,next) =>{
    Employee.find({userName:req.body.userName})
    .exec()
    .then(employee => {
        if (employee.length < 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id
              },
              "secret",
              {
                expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
}

exports.get_all_employee =(req,res,next) =>{
  Employee.find().select(
    "name _id service id jobRole workingHours workedHours sallery"
).exec()
.then(docs => {
    const response = {

      count: docs.length,
      
      employees: docs.map(doc => {
        return {
          name: doc.name,
          jobRole: doc.jobRole,
          service: doc.service,
          workingHours: doc.workingHours,
          workedHours: doc.workedHours,
          sallery: doc.sallery,
          _id: doc._id,
        };
      })
    };
    //   if (docs.length >= 0) {
      res.header('Content-Range', 'Employees 0-2/10')
    // res.setHeader('X-Total-Count', docs.length);
    console.log(res)
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

exports.get_admin_employee =(req,res,next) =>{
  Employee.find().select(
    "name id date time service"
).exec()
.then(docs => {
    const response = {

      // count: docs.length,
      // employees: docs.map(doc => {
      //   return {
      //     name: doc.name,
      //     jobRole: doc.jobRole,
      //     service: doc.service,
      //     workingHours: doc.workingHours,
      //     workedHours: doc.workedHours,
      //     sallery: doc.sallery,
      //     _id: doc._id,
      //   };
      // })
    };
    //   if (docs.length >= 0) {
      res.header('Content-Range', 'Employees 0-2/10')
      console.log('admin')
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
exports.employee_delete = (req, res, next) => {
    User.remove({ _id: req.params.employeeId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "User deleted"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
  