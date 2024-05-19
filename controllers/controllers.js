import Cita from "../models/Cita.js";
import Cliente from "../models/Cliente.js";
import Pago from "../models/Pago.js";
import Peluqueria from "../models/Peluqueria.js";
import { Empleado } from "../models/Empleado.js";
import { Types } from "mongoose";

async function registrarCliente(req, res) {
  try {
    const client = Cliente(req.body);
    const data = await client.save();

    res.json({
      err: false,
      message: "El usuario ha sido registrado",
      data,
    });
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function iniciarSesion(req, res) {
  const { email, password } = req.body;

  try {
    // Buscar el usuario
    const user = await Cliente.findOne({ email });

    // si el Usuario no está registrado
    if (!user) {
      return res
        .status(400)
        .json({ err: true, message: "Usuario no registrado" });
    }

    // Comparar la contraseña
    const passwordIsCorrect = password === user.password;

    if (!passwordIsCorrect) {
      return res.status(400).json({
        err: true,
        message: "Error en la autenticación, contraseña incorrecta",
      });
    }

    // Mensaje de confirmación
    res.json({ err: false, message: "Autenticación satisfactoria", user });
  } catch (error) {
    res.json(error);
  }
}

async function registrarPeluqueria(req, res) {
  try {
    const nuevaPeluqueria = Peluqueria(req.body);

    // Guardar la nueva peluquería
    const peluqueria = await nuevaPeluqueria.save();

    // Obtener el clienteId del cuerpo de la solicitud
    const { clienteId } = req.body;

    // Actualizar el rol del cliente a "administrador"
    await Cliente.findByIdAndUpdate(
      clienteId,
      { $addToSet: { roles: "administrador" } },
      { new: true }, // Para devolver el documento actualizado
    );

    res.status(201).json({
      err: false,
      message: "Peluquería registrada con éxito",
      peluqueria,
    });
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function listarPeluquerias(req, res) {
  try {
    const data = await Peluqueria.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function obtenerPeluqueria(req, res) {
  try {
    const { id } = req.params;

    if (!id) throw { message: "Por favor proporciona el id" };

    const data = await Peluqueria.findOne({ _id: id });
    res.json({ data });
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function listarEmpleados(req, res) {
  try {
    const { peluqueriaId } = req.params;

    const result = Types.ObjectId.createFromHexString(peluqueriaId);

    const empleados = await Empleado.find({
      peluqueriaId: result,
    });

    res.json(empleados);
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function obtenerEmpleado(req, res) {
  try {
    const { empleadoId } = req.params;
    const empleadoInfo = await Empleado.findOne({ _id: empleadoId }).populate(
      "servicios",
    );
    res.json(empleadoInfo);
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function serviciosEmpleado(req, res) {
  try {
    const { empleadoId } = req.params;
    const empleadoInfo = await Empleado.findOne({ _id: empleadoId });
    res.json(empleadoInfo.servicios);
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function horariosEmpleado(req, res) {
  try {
    const { empleadoId } = req.params;
    const empleadoInfo = await Empleado.findOne({ _id: empleadoId });
    res.json(empleadoInfo.horarios);
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function generarCita(req, res) {
  try {
    const cita = Cita(req.body);
    const data = await cita.save(cita);

    res.json({ err: false, message: "Cita generarda con exito", data: data });
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function pagarCita(req, res) {
  try {
    const pago = Pago(req.body);
    const data = await pago.save(pago);

    res.json({ err: false, message: "Cita generarda con exito", data: data });
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function listarCitasPendientes(req, res) {
  try {
    const { clienteId } = req.params;

    const citasPendientes = await Cita.find({ clienteId, estado: "pendiente" })
      .populate("empleadoId")
      .populate("servicios");

    res.status(200).json(citasPendientes);
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

async function cancelarCita(req, res) {
  try {
    const { citaId } = req.params;

    const cita = await Cita.findByIdAndUpdate(
      citaId,
      { estado: "cancelado" },
      { new: true },
    );

    if (!cita) {
      return res.status(404).json({ err: true, message: "Cita no encontrada" });
    }

    res
      .status(200)
      .json({ err: false, message: "Cita cancelada con éxito", cita });
  } catch (err) {
    res.status(500).json({ err: true, message: err.message });
  }
}

export {
  registrarCliente,
  iniciarSesion,
  listarPeluquerias,
  obtenerPeluqueria,
  listarEmpleados,
  obtenerEmpleado,
  serviciosEmpleado,
  horariosEmpleado,
  generarCita,
  pagarCita,
  listarCitasPendientes,
  cancelarCita,
  registrarPeluqueria,
};
