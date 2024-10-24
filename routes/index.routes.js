const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRouter = require("./auth.routes");
router.use("/auth", authRouter);

const serviceRouter = require("./work.routes");
router.use("/work", serviceRouter);

const transactionRouter = require("./transaction.routes");
router.use("/transaction", transactionRouter);

const reviewRouter = require("./review.routes");
router.use("/review", reviewRouter);

const userRoutes = require("./user.routes")
router.use("/user", userRoutes)

const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);


module.exports = router;
