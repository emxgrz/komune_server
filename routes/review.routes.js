const router = require("express").Router();
const Review = require("../models/Review.model");
const Transaction = require("../models/Transaction.model"); // Asegúrate de que el modelo Transaction esté importado
const { verifyToken } = require("../middlewares/auth.middlewares");

router.post("/", verifyToken, async (req, res, next) => {
  const { transaction, reviewer, rating, comment } = req.body;

  if (!transaction || !reviewer || !rating) {
    return res.status(400).json({ message: "Los campos transacción, revisor y calificación son requeridos" });
  }

  try {
    const foundTransaction = await Transaction.findById(transaction);
    if (!foundTransaction) {
      return res.status(404).json({ message: "Transacción no encontrada" });
    }

    if (foundTransaction.status !== "completado") {
      return res.status(400).json({ message: "La reseña solo puede ser dejada si la transacción está completada" });
    }

    const newReview = await Review.create({
      transaction,
      reviewer,
      rating,
      comment,
    });
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
});

router.get("/", verifyToken, async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .populate("transaction")
      .populate("reviewer");
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});


router.get("/:id", verifyToken, async (req, res, next) => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id)
      .populate("transaction")
      .populate("reviewer");
    if (!review) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
});


router.put("/:id", verifyToken, async (req, res, next) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { rating, comment },
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }
    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
});







module.exports = router;
