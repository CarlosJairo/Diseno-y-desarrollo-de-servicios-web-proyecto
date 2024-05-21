import mongoose from "mongoose";

const citaSchema = new mongoose.Schema({
  clienteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
  empleadoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empleado",
    required: true,
  },
  peluqueriaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Peluqueria",
    required: true,
  },
  servicios: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Servicio", required: true },
  ],
  pagada: {
    type: Boolean,
    required: true,
    default: false,
  },
  horarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Horario",
    required: true,
  },
  horaId: { type: mongoose.Schema.Types.ObjectId, ref: "Hora", required: true },
  estado: { type: String, default: "pendiente" },
});

const Cita = mongoose.model("Cita", citaSchema);

export default Cita;
