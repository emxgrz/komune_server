const router = require("express").Router();

const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { verifyToken } = require("../middlewares/auth.middlewares");

// POST "/api/auth/signup" => recibe credenciales de usuario y lo crea en la DB
router.post("/signup", async (req, res, next) => {

  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    res.status(400).json({ message: "Todos los campos son requeridos" });
    return;
  }

  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/gm;
  if (!regexPassword.test(password)) {
    res.status(400).json({ message: "La contraseña debe tener, al menos: una mayúscula, una minúscula, un número y entre 8 y 16 caracteres" });
    return;
  }
  
  try {
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      res.status(400).json({ message: "Usuario ya registrado con ese email" });
      return;
    }

    const salt = await bcrypt.genSalt(14);
    const hashPassword = await bcrypt.hash(password, salt);
    
    await User.create({
      email,
      password: hashPassword,
      username
    });

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
  
});

// POST "/api/auth/login" => recibe credenciales de usuario y lo autentica. Envía Token (llave virtual)
router.post("/login", async (req, res, next) => {

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Todos los campos son requeridos" });
    return;
  }

  try {
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      res.status(400).json({ message: "Usuario no encontrado" });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "La contraseña no es correcta" });
      return;
    }

    const payload = {
      _id: foundUser._id,
      email: foundUser.email
    };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d"
    });

    res.status(200).json({ authToken: authToken });
    
  } catch (error) {
    next(error);
  }
});

// GET "/api/auth/verify" => recibe el Token y lo valida. Ruta para cuando el usuario vuelve a la app.
router.get("/verify", verifyToken, (req, res) => {
  res.status(200).json(req.payload);
});

// Ejemplo de una llamada privada como /user/perfil
// router.get("/user/perfil", verifyToken, (req, res) => {
//   res.json({ message: "Aquí tienes tu información privada" });
// });

module.exports = router;
