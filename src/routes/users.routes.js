import { Router } from "express";
import { usersModel } from "../persistencia/models/users.models.js";

const router = Router();

// Creación del modelo de usuarios
const users = mongoose.model("User", userSchema);

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "El usuario ya existe" });
    }
    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    // Crear nuevo usuario
    const newUser = new users({
      username,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "Registro exitoso" });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
  users.push(req.body);
  res.redirect("/api/views");
});

export default router;
