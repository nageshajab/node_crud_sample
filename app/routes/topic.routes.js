module.exports = app => {
  const topics = require("../controllers/topic.controller.js");

  var router = require("express").Router();

  // Create a new topic
  router.post("/", topics.create);

  // Retrieve all topics
  router.get("/", topics.findAll);

  // Retrieve a single topic with id
  router.get("/:id", topics.findOne);

  // Update a topic with id
  router.put("/:id", topics.update);

  // Delete a topic with id
  router.delete("/:id", topics.delete);

  // delet all topics
  router.delete("/", topics.deleteAll);

  app.use("/api/topics", router);
};
