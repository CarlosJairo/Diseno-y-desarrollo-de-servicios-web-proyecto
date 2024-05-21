import mongoose from "mongoose";

const pagoSchema = new mongoose.Schema({
  citaId: { type: mongoose.Schema.Types.ObjectId, ref: "Cita", required: true },
  monto: { type: Number, required: true },
  fecha: { type: String, required: true },
  metodoPago: { type: String, required: true },
});

const Pago = mongoose.model("Pago", pagoSchema);

export default Pago;
