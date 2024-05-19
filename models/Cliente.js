import mongoose from "mongoose";

const clienteSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  fechaNacimiento: {
    type: Date,
    required: true,
  },
  roles: {
    type: [String],
    default: ["cliente"],
  },
});

const Cliente = mongoose.model("Cliente", clienteSchema);

export default Cliente;
