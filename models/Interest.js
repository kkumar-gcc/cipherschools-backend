const mongoose = require("mongoose");

const interestSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String },
    count: { type: Number },
  },
  { timestamps: true }
);

const Interest = mongoose.model("interest", interestSchema);

module.exports = Interest;
