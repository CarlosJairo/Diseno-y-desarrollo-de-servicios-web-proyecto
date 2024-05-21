import mongoose from "mongoose";

const servicioSchema = mongoose.Schema({
  nombre: { type: String, required: true },
  duracion: { type: Number, required: true },
  precio: { type: Number, required: true },
  imagen: { type: String, required: true },
});

const horaSchema = mongoose.Schema({
  hora: {
    type: String,
    required: true,
  },
  libre: {
    type: Boolean,
    required: true,
  },
});

const horarioSchema = mongoose.Schema({
  fecha: {
    type: String,
    required: true,
  },
  horas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hora" }],
});

const empleadoSchema = mongoose.Schema({
  especialidad: { type: String, required: true },
  descripcion: { type: String, required: true },
  peluqueriaId: { type: mongoose.Schema.Types.ObjectId, ref: "Peluqueria" },
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente" },
  fechaIngreso: { type: String, required: true },
  numIdentificacion: { type: String, required: true },
  contactoEmergencia: { type: String, required: true },
  salarioBase: { type: Number, required: true },
  direccion: { type: String, required: true },
  servicios: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Servicio", required: true },
  ],
  horarios: [{ type: mongoose.Schema.Types.ObjectId, ref: "Horario" }],
});

const Empleado = mongoose.model("Empleado", empleadoSchema);
const Servicio = mongoose.model("Servicio", servicioSchema);
const Horario = mongoose.model("Horario", horarioSchema);
const Hora = mongoose.model("Hora", horaSchema);

export { Empleado, Servicio, Horario, Hora };
