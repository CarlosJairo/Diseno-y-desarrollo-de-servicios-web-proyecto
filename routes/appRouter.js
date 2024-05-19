import express from "express";
import {
  cancelarCita,
  generarCita,
  horariosEmpleado,
  iniciarSesion,
  listarCitasPendientes,
  listarEmpleados,
  listarPeluquerias,
  obtenerEmpleado,
  obtenerPeluqueria,
  pagarCita,
  registrarCliente,
  registrarPeluqueria,
  serviciosEmpleado,
} from "../controllers/controllers.js";

const router = express.Router();

// Clientes
router.post("/clientes/registro", registrarCliente);
router.post("/clientes/login", iniciarSesion);

// Rutas de Peluquerías
router.get("/peluquerias", listarPeluquerias);
router.get("/peluquerias/:id", obtenerPeluqueria);
router.post("/peluquerias/registrar/clienteId", registrarPeluqueria);

// Rutas de Empleados
router.get("/peluquerias/:peluqueriaId/empleados", listarEmpleados);

// Ruta horarios de empleados
router.get("/peluquerias/:peluqueriaId/empleados/:empleadoId", obtenerEmpleado);
router.get(
  "/peluquerias/:peluqueriaId/empleados/:empleadoId/servicios",
  serviciosEmpleado,
);
router.get(
  "/peluquerias/:peluqueriaId/empleados/:empleadoId/horarios",
  horariosEmpleado,
);

// Pago
router.post("/citas/pagar", pagarCita);

// // Rutas de Citas
router.post("/citas/generar", generarCita);
router.get("/clientes/:clienteId/citas/pendientes", listarCitasPendientes);
router.put("/citas/:citaId/cancelar", cancelarCita);

export default router;
