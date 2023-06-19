import e, { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);

    // Verificar si el usuario existe
    const user = await user.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.render(
        "loginError",
        res.status(401).json({ error: "Credenciales inválidas" })
      );
    }

    res.json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }

  req.session["username"] = username;
  req.session["password"] = password;
  console.log(req);
  res.send("Bienvenido");
});

export default router;
