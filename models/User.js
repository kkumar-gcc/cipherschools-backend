const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    mobileNo: { type: Number },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    aboutMe: { type: String },
    portfolioUrl: { type: String },
    facebookUrl: { type: String },
    instagramUrl: { type: String },
    linkedinUrl: { type: String },
    twitterUrl: { type: String },
    githubUrl: { type: String },
    education: { type: String },
    currentJob: { type: String },
    followers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    followings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    interests: [],
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
