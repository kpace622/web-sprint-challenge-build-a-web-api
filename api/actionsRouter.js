// Write your "actions" router here!

const express = require('express');
const Actions = require('../data/helpers/actionModel.js')

const router = express.Router();

router.get('/', (req, res) => {
  Actions.get()
  .then(action => {
    res.status(200).json(action)
  })
  .catch(err => {
    console.log(err)
  })
})

router.get('/:id', (req, res) => {
  Actions.get(req.params.id)
  .then(response => {
    if (response) {
      res.status(200).json(response)
    } else {
      res.status(404).json({message: "ID not found"})
    }
  })
  .catch(err => {
    console.log(err)
  })
})

router.post('/', requiredBody, (req, res) => {
  Actions.insert(req.body)
  .then(response => {
    res.status(201).json(response)
  })
  .catch(err => {
    console.log(err)
  })
})

router.put('/:id', requiredBody, (req, res) => {
  Actions.update(req.params.id, req.body)
  .then(response => {
    if (response) {
      res.status(200).json(response)
    } else {
      res.status(404).json({message: "ID not found"})
    }
  })
  .catch(err => {
    console.log(err)
  })
})

router.delete('/:id', (req, res) => {
  Actions.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({message: "Deleted!"})
    } else {
      res.status(404).json({message: "ID not founc"})
    }
  })
})

function requiredBody(req, res, next) {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(400).json({ message: 'Please include request body' })
  } else {
    next();
  }
}

module.exports = router