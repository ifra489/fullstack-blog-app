const mongoose = require("mongoose");


//create file schema

const fileSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    uploaded_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
   
  },
  {
    timestamps: true,
  },
);

const File = mongoose.model("File", fileSchema);

module.exports = File;
