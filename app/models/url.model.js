module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      url: String,      
      tags: []
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Urls = mongoose.model("urls", schema);
  return Urls;
};
