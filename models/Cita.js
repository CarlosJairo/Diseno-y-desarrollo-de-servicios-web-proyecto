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
  servicios: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Servicio", required: true },
  ],
  fecha: { type: Date, required: true },
  hora: { type: String, required: true },
  estado: { type: String, default: "pendiente" },
});

const Cita = mongoose.model("Cita", citaSchema);

export default Cita;
