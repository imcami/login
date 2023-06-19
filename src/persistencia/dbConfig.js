import mongoose from 'mongoose';
import 'dotenv/config'





// Conexión a la base de datos MongoDB
mongoose.connect(process.env.URI),('mongodb://localhost/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Definición del esquema para el modelo de usuarios
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Creación del modelo de usuarios
const User = mongoose.model('User', userSchema);