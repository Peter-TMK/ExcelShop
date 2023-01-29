const express = require('express');
const categoryRouter = express.Router()
const Category = require('../models/category.model')


categoryRouter.get('/', async (req, res) => {
    const categoryItem = await Category.find()

    if (!categoryItem) {
        res.status(500).json({
            error: 'No category(ies) found!',
        })
    }
    res.send(categoryItem)
})

categoryRouter.post('/', async (req, res) => {
    const category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    })
    
    await category.save();
    if(!category){
        return res.status(404).send('Category not created!')
    }

    res.status(201).send(category);
})

categoryRouter.delete('/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id).then(category => {
        if(category){
            return res.status(200).send('Category successfully deleted!')
        }else{
            return res.status(400).send('Category NOT found!')
        }
    }).catch(err => {
        return res.status(404).json({
            message: 'Invalid command!',
            err
        })
    })
})


module.exports = categoryRouter;