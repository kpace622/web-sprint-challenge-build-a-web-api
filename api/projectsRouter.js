// Write your "projects" router here!
const express = require('express');
const Projects = require('../data/helpers/projectModel.js')

const router = express.Router();

router.get('/', (req, res) => {
  Projects.get()
  .then(action => {
    res.status(200).json(action)
  })
  .catch(err => {
    console.log(err)
  })
})

router.get('/:id', (req, res) => {
  Projects.get(req.params.id)
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
  Projects.insert(req.body)
  .then(response => {
    res.status(201).json(response)
  })
  .catch(err => {
    console.log(err)
  })
})

router.put('/:id', requiredBody, (req, res) => {
  Projects.update(req.params.id, req.body)
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
  Projects.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({message: "Deleted!"})
    } else {
      res.status(404).json({message: "ID not founc"})
    }
  })
})

router.get('/:id/actions', (req, res) => {
  Projects.getProjectActions(req.params.id)
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

function requiredBody(req, res, next) {
  if (req.body.description && req.body.name) {
    next();
  } else {
    res.status(400).json({ message: 'Please include request body' })
  }
}

module.exports = router;