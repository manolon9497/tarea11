import express from 'express';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// --- PEGA AQUÍ TU CONFIGURACIÓN DE FIREBASE (La que copiaste en el Paso 1) ---
const firebaseConfig = {
  apiKey: "AIzaSyCkb-weWWUV-9oKLW65e4QAZVmM5siF8-Y",
  authDomain: "docker-task-1fd62.firebaseapp.com",
  projectId: "docker-task-1fd62",
  storageBucket: "docker-task-1fd62.firebasestorage.app",
  messagingSenderId: "57649546130",
  appId: "1:57649546130:web:15eba388f679fe5010b74b",
  measurementId: "G-PB8S0WV5S8"
};
// -----------------------------------------------------------------------------

// Inicializar Firebase
const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  try {
    // Leemos la colección "pruebas" que creaste
    const querySnapshot = await getDocs(collection(db, "pruebas"));
    let mensajes = [];
    querySnapshot.forEach((doc) => {
      mensajes.push(doc.data().mensaje);
    });

    // Mostramos el HTML
    res.send(`
      <div style="font-family: sans-serif; text-align: center; padding: 50px;">
        <h1>Tarea 16: Docker + Firebase 🐳🔥</h1>
        <p>Mensaje recuperado desde la nube (Firestore):</p>
        <h2 style="color: #FFA611; font-size: 30px;">${mensajes.join(' | ') || 'No hay mensajes aún'}</h2>
        <hr>
        <p>Este sitio está corriendo aislado dentro de un contenedor Docker.</p>
      </div>
    `);
  } catch (error) {
    res.send(`<h3>Error conectando a Firebase:</h3> <p>${error.message}</p>`);
  }
});

app.listen(port, () => {
  console.log(`App corriendo en http://localhost:${port}`);
});