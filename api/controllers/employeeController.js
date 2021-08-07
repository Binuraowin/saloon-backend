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
                id:new mongoose.Types.ObjectId(),
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

      // count: docs.length,
      
      data: docs.map(doc => {
        return {
          name: doc.name,
          jobRole: doc.jobRole,
          service: doc.service,
          workingHours: doc.workingHours,
          workedHours: doc.workedHours,
          sallery: doc.sallery,
          id:doc.id,
          _id: doc._id,
        };
      })
    };
    //   if (docs.length >= 0) {
      res.header('Content-Range', 'Employees 0-10/100')
    // res.setHeader('X-Total-Count', docs.length);
    // console.log(response.employees)
    res.status(200).json(response.data);
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

exports.employee_create = (req, res, next) => {
  console.log(req.body)
  Employee.find({
    userName:req.body.name
    }).exec()
    .then(employee => {
      if (employee.length > 1) {
        return res.status(409).json({
          message: "UserName Exists"
        });
      } else {
            const user = new Employee({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              id:new mongoose.Types.ObjectId(),
              jobRole: req.body.jobRole,
              service: req.body.service,
              workingHours: req.body.workingHours,
              workedHours: req.body.workedHours,
              sallery: req.body.sallery,
              password: 'ee'
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
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.get_one_employee =(req,res,next) =>{
  const id = req.params.employeeId;
  console.log(id)
  Employee.find({
    id:id,
  }).select(
      "name _id service id jobRole workingHours workedHours sallery"
).exec()
.then(docs => {
      if (docs.length >0) {
        const response = {

              id:docs[0].id,
              name: docs[0].name,
              jobRole: docs[0].jobRole,
              service: docs[0].service,
              workingHours: docs[0].workingHours,
              workedHours: docs[0].workedHours,
              sallery: docs[0].sallery,
              _id: docs[0]._id,
            
        };
      res.header('Content-Range', 'Employees 0-2/10')
      console.log('admin',docs[0].id)
      console.log(response)
      res.status(200).json(response);
      } else {
        console.log('error')
          res.status(404).json({
              message: 'No entries found'
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
// exports.employee_delete = (req, res, next) => {
//   Employee.findByIdAndRemove({ id: req.params.employeeId })
//       .exec()
//       .then(result => {
//         res.header('Content-Range', 'Employees 0-2/10')
//         res.status(200).json({
//           message: "User deleted"
//         });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({
//           error: err
//         });
//       });
//   };
  

  exports.employee_delete = (req, res, next) => {
    const id = req.params.employeeId;
    Employee.find({
      id: id,
    }).select("userName _id date time service id consumer email phone")
    .exec()
    .then(doc => {
      if (doc) {
        console.log(doc)
        Employee.findByIdAndRemove({
          _id: doc[0]._id
        })
        .exec()
        .then(result => {
          res.header('Content-Range', 'Employees 0-2/10')
          // res.setHeader('X-Total-Count', docs.length);
          res.status(201).json({
            id:result.id,
            name: result.name,
            jobRole: result.jobRole,
            service: result.service,
            workingHours: result.workingHours,
            workedHours: result.workedHours,
            sallery: result.sallery,
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