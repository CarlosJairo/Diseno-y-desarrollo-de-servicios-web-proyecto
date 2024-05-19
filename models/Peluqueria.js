import mongoose from "mongoose";

const peluqueriaSchema = mongoose.Schema(
  {
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    horarioSemana: { type: String, required: true },
    horarioFinSemana: { type: String, required: true },
    fotoPerfil: { type: String, required: true },
    clienteId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Cliente",
    },
  },
  { timestamps: true },
);

const Peluqueria = mongoose.model("Peluqueria", peluqueriaSchema);

export default Peluqueria;
