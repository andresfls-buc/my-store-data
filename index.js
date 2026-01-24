// index.js (In the Root)
require('dotenv').config();
const express = require('express');
const routerApi = require('./routes'); 
const { logErrors, ormErrorHandler, boomErrorHandler, errorHandler } = require('./middlewares/error.handler');

const app = express();
app.use(express.json());

// Basic health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'active',
    // Helpful for debugging: tells you which DB it thinks it's using
    environment: process.env.NODE_ENV || 'development',
    dbUrl: process.env.DATABASE_URL ? 'Detected' : 'Missing' 
  });
});

// Mount routes
routerApi(app);

// Error Middlewares
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

/**
 * LOGIC FOR LOCALHOST VS VERCEL
 * Vercel uses the 'module.exports' below.
 * Your local machine needs the 'app.listen' below.
 */
const PORT = process.env.PORT || 3000;

// If we are NOT on Vercel, start the server manually
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`-------------------------------------------`);
    console.log(`🚀 LOCAL SERVER: http://localhost:${PORT}`);
    console.log(`🛠️ HEALTH CHECK: http://localhost:${PORT}/health`);
    console.log(`-------------------------------------------`);
  });
}

// Export for Vercel
module.exports = app;