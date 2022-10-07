import express from "express";
import employeesRoutes from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.routes.js";
import {PORT} from './config.js'

const app = express();

//Comprobación de API
/**
app.get('/employees', (req, res) => res.send('creando empleados'));

app.post('/employees', (req, res) => res.send('actualizando empleados'));

app.put('/employees', (req, res) => res.send('obteniendo empleados'));

app.delete('/employees', (req, res) => res.send('borrando empleados'));
 */

// Comprobación de conexión a bbdd
/**
 app.get('/ping', async (req, res) => {
    const [result] = await pool.query('SELECT 1 + 1 AS RESULT');
    res.json(result[0]);
});
 */
app.use(express.json());

app.use('/api',employeesRoutes);

app.use(indexRoutes);

app.use((req, res, next) =>{
    res.status(404).json({
        message: 'Not found'
    })
})

export default app;