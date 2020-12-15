const express = require('express');

var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {User} = require('../model/usermodel');

router.get('/',(req,res) => {

    User.find( (err,docs) => {
        if(!err){res.send(docs)}
        else{
            console.log('Error in getting Users',err);
        }
    });

})

router.get('/:name', (req, res) => {

    if(req.params.name == ''){
        res.status(404).json({ message: "Please enter the name" });
    }
    User.findOne({ "name": req.params.name }, (err, docs) => {
        if (err) {
            res.status(500).json({ error:  "The user information could not be retrieved." })
        }
        else {
            res.send(docs)
        }
    })
})

router.post('/', (req, res) => {
    
    if(req.body.name == '' || req.body.prograd_id == ''){
        res.status(400).json({ errorMessage: "Please provide name and prograd id for the user." })
    }

    var usr = new User({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        prograd_id: req.body.prograd_id,
        squad: req.body.squad
    })
    usr.save((err, docs) => {
        if (!err) {
            res.status(201).send('Created user');
            return res.send(docs);
        } else {
            return res.status(500).json({ errorMessage: "There was error while save the data to the database." })
        }
    })
})

router.put('/:name', (req, res) => {
    // if (!ObjectId.isValid(req.params.id))
    //     return res.status(400).send(`No record given with id: ${req.params.id}`)
    if(req.params.name == '' || req.params.prograd_id){
        res.status(400).send(`Please enter the name and prograd id`)
    }

    var usr = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        type: req.body.type
    }

    // User.findByIdAndUpdate(req.params.id, { $set: usr }, { new: true }, (err, docs) => {
    //     if (!err) {
    //         res.send(docs)
    //     } else {
    //         console.log('Error in updating users', JSON.stringify(err, undefined, 2));
    //     }
    // })
    User.updateOne({ 'name': req.params.name }, usr, (err, docs) => {
        if (!err) {
            res.status(200).send('OK');
            res.redirect(`/api/users`);
        } else {
            return res.status(500).json({ errorMessage: "There was error while Updating the data to the database." })
        }
    })
})

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(404).json({errorMessaage:`No record with given id: ${req.params.id}`});

    User.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) { res.send(docs) }
        else {
            return res.status(500).json({ errorMessage: "There was error while deleting the data to the database." })
        }
    })
})


module.exports = router;