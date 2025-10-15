// ========================================
// API REST SIMPLE PARA GESTIONAR EXPERIENCIA LABORAL
// ========================================

// 1. IMPORTAR LAS LIBRERÍAS QUE NECESITAMOS
const express = require('express'); // Express: framework para crear APIs
const cors = require('cors');       // CORS: permite que otros sitios web usen nuestra API

// 2. CONFIGURAR NUESTRA APLICACIÓN
const app = express();              // Crear la aplicación Express
const PORT = 3001;                  // Puerto donde va a correr nuestro servidor

// 3. CONFIGURAR MIDDLEWARES
app.use(cors());                    // Permitir peticiones desde cualquier origen
app.use(express.json());            // Convertir JSON del body de las peticiones a objetos JavaScript

// 4. "BASE DE DATOS" EN MEMORIA (se borra al apagar el servidor)
let experiences = [
  {
    id: 1,
    company: "Lettuce Financial Labs",
    role: "Automation Engineer",
    startDate: "July 2025",
    endDate: null,
    description: "Creating and designing automation workflows to fill out online forms",
    tech: ["Node.js", "Stagehand", "Playwright"],
    highlights: ["Implemented email verification automation", "Integrated LLM reasoning in gray areas", "Designed complex automation flows"]
  },
  {
    id: 2,
    company: "Krea Group",
    role: "Accounts Receivable and Bookkeeping Assistant",
    startDate: "July 2023",
    endDate: "February 2024",
    description: "Helping keep updated accounts receivable through daily ledger operations",
    tech: ["QuickBooks", "Excel"],
    highlights: ["Reduced inflated numbers from previous bookkeeping", "Efficiently corrected prior errors"]
  },
  {
    id: 3,
    company: "TEDxActonAcademyGuatemala",
    role: "Head of Budgeting & Sponsorship Committee",
    startDate: "October 2022",
    endDate: "June 2023",
    description: "In charge of budgeting and raising funds through sponsorships",
    tech: ["Excel", "Canva"],
    highlights: ["Secured partnerships with local and national sponsors", "Led a team of 4, dividing weekly tasks accordingly"]
  }
];

// ========================================
// DEFINIR LAS RUTAS DE NUESTRA API
// ========================================

// 5. GET /experiences - OBTENER TODAS LAS EXPERIENCIAS
app.get('/experiences', (req, res) => {
  res.json(experiences);
});

// 6. GET /experiences/:id - OBTENER UNA EXPERIENCIA POR ID
app.get('/experiences/:id', (req, res) => {
  const id = Number(req.params.id);
  const exp = experiences.find(e => e.id === id);

  if (!exp) {
    return res.status(404).json({ error: 'Experiencia no encontrada' });
  }

  res.json(exp);
});

// 7. POST /experiences - CREAR UNA NUEVA EXPERIENCIA
app.post('/experiences', (req, res) => {
  const { company, role, startDate, endDate, description, tech, highlights } = req.body;

  // Validar campos obligatorios
  if (!company || !role || !startDate) {
    return res.status(422).json({ 
      error: 'Los campos "company", "role" y "startDate" son obligatorios.' 
    });
  }

  const nuevoId = Math.max(0, ...experiences.map(e => e.id)) + 1;

  const nuevaExperiencia = {
    id: nuevoId,
    company,
    role,
    startDate,
    endDate: endDate || null,
    description: description || '',
    tech: Array.isArray(tech) ? tech : [],
    highlights: Array.isArray(highlights) ? highlights : []
  };

  experiences.push(nuevaExperiencia);
  res.status(201).json(nuevaExperiencia);
});

// 8. PATCH /experiences/:id - ACTUALIZAR PARCIALMENTE UNA EXPERIENCIA
app.patch('/experiences/:id', (req, res) => {
  const id = Number(req.params.id);
  const exp = experiences.find(e => e.id === id);

  if (!exp) {
    return res.status(404).json({ error: 'Experiencia no encontrada' });
  }

  const { company, role, startDate, endDate, description, tech, highlights } = req.body;

  if (company !== undefined) exp.company = company;
  if (role !== undefined) exp.role = role;
  if (startDate !== undefined) exp.startDate = startDate;
  if (endDate !== undefined) exp.endDate = endDate;
  if (description !== undefined) exp.description = description;
  if (tech !== undefined) exp.tech = Array.isArray(tech) ? tech : exp.tech;
  if (highlights !== undefined) exp.highlights = Array.isArray(highlights) ? highlights : exp.highlights;

  res.json(exp);
});

// 9. DELETE /experiences/:id - ELIMINAR UNA EXPERIENCIA
app.delete('/experiences/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = experiences.findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Experiencia no encontrada' });
  }

  const expEliminada = experiences.splice(index, 1)[0];
  res.json(expEliminada);
});

// 10. MANEJAR RUTAS NO ENCONTRADAS
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// 11. INICIAR EL SERVIDOR
app.listen(PORT, () => {
  console.log(`🚀 API de Experiencia Laboral escuchando en http://localhost:${PORT}`);
  console.log(`📋 Endpoints disponibles:`);
  console.log(`   GET    /experiences     - Ver todas las experiencias`);
  console.log(`   GET    /experiences/:id - Ver una experiencia específica`);
  console.log(`   POST   /experiences     - Crear una nueva experiencia`);
  console.log(`   PATCH  /experiences/:id - Actualizar una experiencia`);
  console.log(`   DELETE /experiences/:id - Eliminar una experiencia`);
});