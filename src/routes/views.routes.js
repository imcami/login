import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/errorLogin", (req, res) => {
  res.render("errorLogin");
});

router.get("/errorSignup", (req, res) => {
  res.render("errorSignup");
});

router.get("/profile", (req, res) => {
  console.log(req);
  res.render("profile");
});

export default router;
