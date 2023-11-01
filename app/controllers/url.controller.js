const db = require("../models");
const Url = db.Urls;
const tagcontroller=require('./tags.controller');

// Create and Save a new url
exports.create = (req, res) => {
  // Validate request
  if (!req.body.url) {
    res.status(400).send({
      message: "url can not be empty!"
    });
    return;
  }

  // Create an url
  const url = new Url({
    url: req.body.url,
    tags: req.body.tags
  });

  // Save Tutorial in the database
  url
    .save(url)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the url."
      });
    });

  //insert tags
  req.body.tags.forEach(async e => {
   await tagcontroller.create(e);
  });
};

// Retrieve all urls from the database.
exports.findAll = (req, res) => {
  const url = req.query.url;
  var condition = url ? {
    url: {
      $regex: new RegExp(url),
      $options: "i"
    }
  } : {};

  Url.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving urls."
      });
    });
};

// Find a single Url with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Url.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({
          message: "Not found url with id " + id
        });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({
          message: "Error retrieving url with id=" + id
        });
    });
};

// Update a url by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Url.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false
    })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update url with id=${id}. Maybe url was not found!`
        });
      } else res.send({
        message: "Url was updated successfully."
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating url with id=" + id
      });
    });
};

// Delete a url with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Url.findByIdAndRemove(id, {
      useFindAndModify: false
    })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete url with id=${id}. Maybe url was not found!`
        });
      } else {
        res.send({
          message: "url was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete url with id=" + id
      });
    });
};

// Delete all urls from the database.
exports.deleteAll = (req, res) => {
  Url.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} urls were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all urls."
      });
    });
};