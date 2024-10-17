const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  professional: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["en progreso...", "completado", "cancelado"], default: "en progreso..." },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
