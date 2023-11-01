const db = require("../models");
const Tags = db.tags;

exports.create2 = async (str) => {

  // Validate request
  if (!str) {
    console.warn('tag cannot be empty');
    return;
  }

  var tags = await this.findAll2(str);
  if (tags.length > 0) {
    console.debug('found tag already');
    return;
  }

  // Create a tag
  const tag = new Tags({
    tag: str
  });

  // Save Tutorial in the database
  tag
    .save(tag)
    .then(data => {
      console.debug(data);
    })
    .catch(err => {
      console.error(err.message || "Some error occurred while creating the tag.");
    });
};


// Create and Save a new tag
exports.create = async (req,res) => {

  // Validate request
  if (!req.body.tag) {
    console.warn('tag cannot be empty');
    return;
  }

  var tags = await this.findAll2(req.body.tag);
  if (tags.length > 0) {
    console.debug('found tag already');
    return;
  }

  // Create a tag
  const tag = new Tags({
    tag: req.body.tag
  });

  // Save Tutorial in the database
  tag
    .save(tag)
    .then(data => {
      console.debug(data);
    })
    .catch(err => {
      console.error(err.message || "Some error occurred while creating the tag.");
    });
};

// Retrieve all tags from the database.
exports.findAll = async (req, res) => {
  const str = req.query.tag;
  var condition = str ? {
    str: {
      $regex: new RegExp(str),
      $options: "i"
    }
  } : {};
  return new Promise((resolve, reject) => {
    Tags.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving urls."
        });
      });
  });
};


// Retrieve all tags from the database.
exports.findAll2 = async (str) => {

  var condition = str ? {
    str: {
      $regex: new RegExp(str),
      $options: "i"
    }
  } : {};
  return new Promise((resolve, reject) => {
    //Tags.find(condition)
    Tags.find({  tag: str } )
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        console.error(err.message || "Some error occurred while retrieving tags.");
      });
  });
};

// Find a single tag with id
exports.findOne = (id) => {

  Tags.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({
          message: "Not found tag with id " + id
        });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({
          message: "Error retrieving tag with id=" + id
        });
    });
};

// Update a tag by the id in the request
exports.update = (id, str) => {
  if (!str) {
    console.warn('tag cannot be empty');
  }

  Tags.findByIdAndUpdate(id, str, {
      useFindAndModify: false
    })
    .then(data => {
      if (!data) {
        console.warn(`Cannot update tag with id=${id}. Maybe tag was not found!`);

      } else {
        console.log("Tag was updated successfully.");
      }
    })
    .catch(err => {
      console.err("Error updating url with id=" + id);
    });
};

// Delete a tag with the specified id in the request
exports.delete = (id) => {
  Tags.findByIdAndRemove(id, {
      useFindAndModify: false
    })
    .then(data => {
      if (!data) {
        console.debug(`Cannot delete url with id=${id}. Maybe url was not found!`);
      } else {
        console.debug("url was deleted successfully!");
      }
    })
    .catch(err => {
      console.error("Could not delete url with id=" + id);
    });
};

// Delete all tags from the database.
exports.deleteAll = (req, res) => {
  Tags.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} tags were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all tags."
      });
    });
};