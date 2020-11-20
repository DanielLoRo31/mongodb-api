const express = require("express");
const router = express.Router();

// accedemos al controlador
const userController = require("../controllers/userControllerMongo");

router.get("/", userController.get);

router.get("/:id", userController.getById);

router.get("/role/:role", userController.getByRole);

router.post("/", userController.post);

// el put es para actualizar todo el archivo
//el patch para actualizar solo algunos
router.patch("/:id", userController.patch);

router.delete("/:id", userController.delete);

module.exports = router;
