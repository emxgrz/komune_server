const router = require("express").Router();
const Work = require("../models/Work.model");
const User = require("../models/User.model")
const { verifyToken } = require("../middlewares/auth.middlewares");

// POST "/api/work" => crea un nuevo servicio
router.post("/", verifyToken, async (req, res, next) => {
  const { title, description, professional, skills } = req.body;

  if (!title || !description || !professional) {
    return res.status(400).json({ message: "Los campos título, descripción y profesional son requeridos" });
  }

  try {
    const newWork = await Work.create({
      title,
      description,
      professional,
      skills,
    });
    console.log("El nuevo servisio", newWork)
    await User.findByIdAndUpdate(professional, { $push: { work: newWork._id } });
    res.status(201).json(newWork);
  } catch (error) {
    next(error);
  }
});


// GET "/api/work" => todos los servicios
router.get("/", async (req, res, next) => {
  try {
    const works = await Work.find().populate("professional");
    res.status(200).json(works);
  } catch (error) {
    next(error);
  }
});

// GET "/api/work/:id" => obtiene un servicio por ID. Usar para buscar servicios
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const work = await Work.findById(id).populate("professional");
    if (!work) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }
    res.status(200).json(work);
  } catch (error) {
    next(error);
  }
});

//GET the works of the user

router.get("/my-works", verifyToken, async (req, res, next) => {
  try {
    const userId = req._id; 

    const works = await Work.find({ professional: userId }).populate("professional");

    if (works.length === 0) {
      return res.status(404).json({ message: "No se encontraron servicios para este usuario." });
    }

    res.status(200).json(works);
  } catch (error) {
    next(error);
  }
});

// gets the works of A user

router.get("/user/:userId", async (req, res, next) => {
  const { userId } = req.params;

  try {
    
    const works = await Work.find({ professional: userId }).populate("professional");
    
    if (works.length === 0) {
      return res.status(404).json({ message: "No se encontraron servicios para este profesional." });
    }

    res.status(200).json(works);
  } catch (error) {
    next(error);
  }
});



// PUT "/api/work/:id" => actualiza un servicio
router.put("/:id", verifyToken, async (req, res, next) => {
  const { id } = req.params;
  const { title, description, skills } = req.body;

  try {
    const work = await Work.findById(id);
    if (!work) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    if (work.professional.toString() !== req.payload._id) {
      return res.status(403).json({ message: "No tienes permiso para editar este servicio" });
    }

    const updatedWork = await Work.findByIdAndUpdate(
      id,
      { title, description, skills },
      { new: true }
    );
    res.status(200).json(updatedWork);
  } catch (error) {
    next(error);
  }
});

// DELETE "/api/work/:id" => elimina un servicio
router.delete("/:id", verifyToken, async (req, res, next) => {
  const { id } = req.params;

  try {
    const work = await Work.findById(id);
    if (!work) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    // Guard clause: solo permite la eliminación si el usuario es el proveedor
    if (work.professional.toString() !== req.payload._id) {
      return res.status(403).json({ message: "No tienes permiso para eliminar este servicio" });
    }

    await Work.findByIdAndDelete(id);
    res.status(200).json({ message: "Servicio eliminado correctamente" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
