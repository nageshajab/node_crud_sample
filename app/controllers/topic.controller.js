const db = require("../models");
const Topic = db.topics;

// Create and Save a new topic
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "title can not be empty!" });
    return;
  }

  // Create a topic
  const topic = new Topic({
    title: req.body.title,
    description: req.body.description,
    tasks: req.body.tasks
  });

  // Save topic in the database
  topic
    .save(topic)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the topic."
      });
    });
};

// Retrieve all topics from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Topic.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving topics."
      });
    });
};

// Find a single topic with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Topic.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found topic with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving topic with id=" + id });
    });
};

// Update a topic by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Topic.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update topic with id=${id}. Maybe topic was not found!`
        });
      } else res.send({ message: "Topic was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating topic with id=" + id
      });
    });
};

// Delete a topic with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Topic.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete topic with id=${id}. Maybe Topic was not found!`
        });
      } else {
        res.send({
          message: "Topic was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Topic with id=" + id
      });
    });
};

// Delete all Topics from the database.
exports.deleteAll = (req, res) => {
  Topic.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} topics were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all topics."
      });
    });
};
