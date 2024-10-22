const mongoose = require("mongoose");

const workSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  professional: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  skills: [String],
  images: [{
    type: String 
  }],
  location: {
    city: { type: String },
    country: { type: String }
  },
  createdAt: { type: Date, default: Date.now }
});

const Work = mongoose.model("Work", workSchema);

module.exports = Work;
