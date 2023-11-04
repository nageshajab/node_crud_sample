module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      tasks:[
        {
          title:String,
          Status:String
        }
      ]
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Topic = mongoose.model("topic", schema);
  return Topic;
};
