module.exports = app => {
  const tags = require("../controllers/tags.controller.js");

  var router = require("express").Router();

  // Create a new tag
  router.post("/", tags.create);

  // Retrieve all tags
  router.get("/", tags.findAll);

  // Retrieve a single tag with id
  router.get("/:id", tags.findOne);

  // Update a tag with id
  router.put("/:id", tags.update);

  // Delete a tag with id
  router.delete("/:id", tags.delete);

  router.delete("/", tags.deleteAll);

  app.use("/api/tags", router);
};