const router = require("express").Router();
const User = require("../models/User.model");
const Work = require("../models/Work.model");

const { verifyToken } = require("../middlewares/auth.middlewares");
const { mongoose } = require("mongoose");


// GET "/api/user" => obtiene la información de todos los usuarios
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// GET "/api/user/:id" => obtiene la información de un usuario específico por ID
router.get("/:id", verifyToken, async (req, res, next) => {
  const { id } = req.params;
  
  try {
    const user = await User.findById(id).populate("work");
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/search/:id", async (req, res, next) => {
  const { id } = req.params;
  
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});



// PUT "/api/user/:id" => actualiza la información de un usuario específico (requiere autenticación)
router.put("/:id", verifyToken, async (req, res, next) => {
  const { id } = req.params;
  const { username, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { username, email }, { new: true });
    if (!updatedUser) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// DELETE "/api/user/:id" => elimina un usuario específico (requiere autenticación)
router.delete("/:id", verifyToken, async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.user; 

  if (userId !== id) {
    return res.status(403).json({ message: "No tienes permiso para eliminar este usuario." });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
