const router = require("express").Router();
const Transaction = require("../models/Transaction.model");
const { verifyToken } = require("../middlewares/auth.middlewares");



// POST "/api/transaction" => crea una nueva transacción (requiere autenticación)
router.post("/", verifyToken, async (req, res, next) => {
  const { work, professional, client, status } = req.body;

  if (!work || !professional || !client || !status) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  try {
    const newTransaction = await Transaction.create({
      work,
      professional,
      client,
      status,
    });    

    

    res.status(201).json(newTransaction);
  } catch (error) {
    next(error);
  }
});

// GET "/api/transaction" => obtiene todas las transacciones (requiere autenticación)
router.get("/", verifyToken, async (req, res, next) => {
  try {
    const transactions = await Transaction.find()
      .populate("work")
      .populate("professional")
      .populate("client");
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
});

// GET "/api/transaction/:id" => obtiene una transacción específica por ID (requiere autenticación)
router.get("/:id", verifyToken, async (req, res, next) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findById(id)
      .populate("work")
      .populate("professional")
      .populate("client");
    if (!transaction) {
      return res.status(404).json({ message: "Transacción no encontrada" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
});

// PUT "/api/transaction/:id" => actualiza una transacción específica (requiere autenticación)
router.put("/:id", verifyToken, async (req, res, next) => {
  const { id } = req.params;
  const { status, completedAt } = req.body;

  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { status, completedAt },
      { new: true }
    );
    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transacción no encontrada" });
    }
    res.status(200).json(updatedTransaction);
  } catch (error) {
    next(error);
  }
});

// DELETE "/api/transaction/:id" => elimina una transacción específica (requiere autenticación)
router.delete("/:id", verifyToken, async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transacción no encontrada" });
    }
    res.status(200).json({ message: "Transacción eliminada correctamente" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
