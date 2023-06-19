import express from 'express'
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars'
import session from 'express-session'
import cookieParser from 'cookie-parser';
import fileStore from 'session-file-store'
import loginRouter from './routes/login.routes.js'
import viewsRouter from './routes/views.routes.js'
import usersRouter from './routes/users.routes.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true})) // para poder recibir los datos del formulario de forma correcta
app.use(cookieParser()) //trabaja como un middleware, para tener signed cookies debemos pasarle una constante de dotenv

//CSS
app.use(express.static('public'));

//ROUTES
app.use('/views', viewsRouter)
app.use('/login', loginRouter)
app.use('/api/users', usersRouter)

//COOKIES
// generar info en cookies
app.get('/crearCookie', (req, res) => {
    res
      .cookie('sessionId', '4385pt4kjlfrjlkef43', { maxAge: 120000 })
      .json({ message: 'Creando nuestra primera cookie' })
  })
app.get('/crearCookie', (req, res)=>{
    res 
    .cookie('sessionIdFirmado', '9834u43hfnwj9032u8nfkw',{
        signed: true, // para poder firmar la cookie

    })
    .json({
        message: 'Leyendo cookies', cookie: session 
    })
})

app.get('/leerCookieFirmada', (req, res)=>{
    //console.log(req)
    const {sessionIdFirmado} = req.signedCookies
    console.log(sessionIdFirmado)
    res.send('Probando')
}) 


// CONFIGURACION DE HANDLEBARS
app.engine('hbs', handlebars.engine()) 
app.set('views', path.join( __dirname + 'views'))
app.set('view engine', 'handlebars')

//SESSIONS  
const filestore = fileStore(session)
app.use(session({
    store: new filestore({
        path: __dirname + '/sessions',
        ttl: 10000,
    }), 
    secret: 'sesssionSecret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}))
// RUTA DE PRUEBA PARA USUARIOS
const users = [
    {
       email: 'mail@email.com',
       password: '1234encode'

    }]
    
app.get('/login', (req, res ) => {
    res.render('login')
    const { email, password } = req.body 
    const users = users.find(user => user.email === email && user.password === password) //busca el usuario en el array
    res.send('Probando session')
})

app.listen(PORT, ()=>{
    console.log(`SERVER ON PORT ${PORT}`)
})
