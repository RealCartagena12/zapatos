const express = require('express'); // Importa el paquete express para crear el servidor y manejar rutas
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Zapato = require('./models/Zapato');
const cors = require('cors'); // Importa el paquete cors para manejar políticas de CORS

const app = express(); // Crea la instancia de la aplicación Express

app.use(cors()); // Habilita CORS para todas las rutas

dotenv.config();

const PORT = process.env.PORT || 3000; // Define el puerto: usa la variable de entorno PORT o 3000 por defecto

app.use(express.json()); // Middleware: permite que Express parsee cuerpos JSON en las peticiones

async function start(){
  try{
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Conectado a MongoDB Atlas');
  app.listen(PORT, () => console.log(`API lista en http://localhost:${PORT}`));
  }catch(err){
  console.error('Error conectando a MongoDB:', err.message);
  process.exit(1);
  };
}

start();




// Servidor escuchando
app.listen(PORT, () => { // Inicia el servidor y pone a la app a escuchar en el puerto definido
    console.log(`API lista en http://localhost:${PORT}`); // Mensaje en consola indicando que el servidor está activo
});




