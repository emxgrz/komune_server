const router = require("express").Router();
const Service = require("../models/Service.model");
const { verifyToken } = require("../middlewares/auth.middlewares");

// POST "/api/service" => crea un nuevo servicio
router.post("/", verifyToken, async (req, res, next) => {
  const { title, description, professional, skills } = req.body;

  if (!title || !description || !professional) {
    return res.status(400).json({ message: "Los campos título, descripción y profesional son requeridos" });
  }

  try {
    const newService = await Service.create({
      title,
      description,
      professional,
      skills,
    });
    res.status(201).json(newService);
  } catch (error) {
    next(error);
  }
});

// GET "/api/service" => todos los servicios
router.get("/", async (req, res, next) => {
  try {
    const services = await Service.find().populate("professional");
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
});

// GET "/api/service/:id" => obtiene un servicio por ID
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const service = await Service.findById(id).populate("professional");
    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }
    res.status(200).json(service);
  } catch (error) {
    next(error);
  }
});

// PUT "/api/service/:id" => actualiza un servicio
router.put("/:id", verifyToken, async (req, res, next) => {
  const { id } = req.params;
  const { title, description, skills } = req.body;

  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    // Guard clause: solo permite la edición si el usuario es el proveedor
    if (service.professional.toString() !== req.payload._id) {
      return res.status(403).json({ message: "No tienes permiso para editar este servicio" });
    }

    const updatedService = await Service.findByIdAndUpdate(
      id,
      { title, description, skills },
      { new: true }
    );
    res.status(200).json(updatedService);
  } catch (error) {
    next(error);
  }
});

// DELETE "/api/service/:id" => elimina un servicio
router.delete("/:id", verifyToken, async (req, res, next) => {
  const { id } = req.params;

  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    // Guard clause: solo permite la eliminación si el usuario es el proveedor
    if (service.professional.toString() !== req.payload._id) {
      return res.status(403).json({ message: "No tienes permiso para eliminar este servicio" });
    }

    await Service.findByIdAndDelete(id);
    res.status(200).json({ message: "Servicio eliminado correctamente" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
