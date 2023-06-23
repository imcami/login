import express from "express";
import { dirname, join } from "path";
import { create } from 'express-handlebars';
import session from "express-session";
import cookieParser from "cookie-parser";
import fileStore from "session-file-store";
import loginRouter from "./routes/login.routes.js";
import viewsRouter from "./routes/views.routes.js";
import usersRouter from "./routes/users.routes.js";
import mongoStore from "connect-mongo";
import passport from "passport";
import dotenv from "dotenv";


const app = express();
const PORT = 8080;
const hbs = create();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());

// SESSIONS MONGO
app.use(
  session({
    store: mongoStore.create({
      mongoUrl: process.env.URI,
      ttl: 60,
    }),
    secret: "sessionSecret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);

// CSS
app.use(express.static("public"));

// ROUTES
app.use("/views", viewsRouter);
app.use("/login", loginRouter);
app.use("/api/users", usersRouter);

// COOKIES
app.get("/crearCookie", (req, res) => {
  res
    .cookie("sessionId", "4385pt4kjlfrjlkef43", { maxAge: 120000 })
    .json({ message: "Creando nuestra primera cookie" });
});

app.get("/crearCookieFirmada", (req, res) => {
  res
    .cookie("sessionIdFirmado", "9834u43hfnwj9032u8nfkw", {
      signed: true,
    })
    .json({
      message: "Leyendo cookies",
      cookie: req.session,
    });
});

app.get("/leerCookieFirmada", (req, res) => {
  const { sessionIdFirmado } = req.signedCookies;
  console.log(sessionIdFirmado);
  res.send("Probando");
});

// CONFIGURACION DE HANDLEBARS
app.engine('handlebars', hbs.engine);
app.set("views", join(dirname(import.meta.url), "views"));
app.set("view engine", "hbs");

// SESSIONS
const filestore = fileStore(session);
app.use(
  session({
    store: new filestore({
      path: join(dirname(import.meta.url), "sessions"),
      ttl: 10000,
    }),
    secret: "sessionSecret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
    },
  })
);

// RUTA DE PRUEBA PARA USUARIOS
const users = [
  {
    email: "mail@example.com",
    password: "1234encode",
  },
];

app.get("/login", (req, res) => {
  res.render("login");
  const { email, password } = req.body;
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  res.send("Probando session");
});

app.listen(PORT, () => {
  console.log(`SERVER ON PORT ${PORT}`);
});
