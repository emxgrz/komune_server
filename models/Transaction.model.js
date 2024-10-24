const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  work: { type: mongoose.Schema.Types.ObjectId, ref: "Work", required: true },
  professional: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: {type:String, required:true},
  description: {type: String, required:true},
  status: { type: String},
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
