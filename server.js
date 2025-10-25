const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Configuración de PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'parcial_db',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || '12345'
});

// Endpoint raíz con información del estudiante
app.get('/', (req, res) => {
  res.json({
    estudiante: 'Miguel Angel Molina Cruz',
    carrera: 'Ingenieria en Sistemas Computacionales',
    codigo: 'MC22I04002',
    universidad: 'Universidad de Sonora',
    mensaje: 'Parcial Docker - Ejercicio Integrado'
  });
});

// Endpoint health
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Endpoint para verificar conexión a BD
app.get('/db-status', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      status: 'Conexión exitosa',
      timestamp: result.rows[0].now
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error de conexión',
      error: error.message
    });
  }
});

// Endpoint para obtener estudiantes
app.get('/estudiantes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM estudiantes ORDER BY id');
    res.json({
      total: result.rowCount,
      estudiantes: result.rows
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✓ Servidor corriendo en puerto ${PORT}`);
});
