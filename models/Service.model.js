const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  skills: [String],
  createdAt: { type: Date, default: Date.now }
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
