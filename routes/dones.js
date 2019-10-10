const express = require('express');
const router = express.Router();
const Done = require('../models/Done.js');
const mongoose = require('mongoose');

// GET ALL DONES
router.get('/',async (req,res)=>{
    try
    {
        const dones = await Done.find();
        res.json(dones);
    }
    catch (error)
    {
        res.json({message:error})
    }
});

// SUBMIT A DONE
router.post('/',async (req,res)=>{
    const done = new Done({
        title:req.body.title,
        _id:req.body._id
    });
    try
    {
        const savedDone = await done.save();
        res.json(savedPost);
    }
    catch (error)
    {
        res.json({message:error});
    }
});

// GET A SINGLE POST BY ID
router.get('/:doneId', async (req,res) => {

    try
    {
        const post = await Done.findById(req.params.postId);
        res.json(post);
    }
    catch(error)
    {
        res.json({message:error})
    }
});

// DELETE POST
router.delete('/:doneId', async (req,res) => {
    let _id  = mongoose.Types.ObjectId(req.params.doneId);

    try
    {
        const removedDone = await Done.remove({_id});
    }
    catch (error)
    {
        res.json({message:error});
    }
});

//UPDATE A DONE
router.patch('/',async (req,res) => {
    try {

        const updatedDone = await  Done.update(
            {_id:req.body._id},
            {$set:{title:req.body.title}}
        );

        res.json(updatedDone);

    }
    catch (error) {
        res.json({message:error})
    }
});

module.exports = router;