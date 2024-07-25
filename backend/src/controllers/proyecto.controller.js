/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable eol-last */
/* eslint-disable require-jsdoc */
"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const ProyectoService = require("../services/proyecto.service");
const { handleError } = require("../utils/errorHandler");
const Proyecto = require('../models/proyecto.model');
const { respondInternalError } = require("../utils/resHandler");

// Importa una librería para manejar fechas en formato 'dd/mm/aa'
const { parse } = require('date-fns');
/**
 * Crea un nuevo usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */

// Función para mostrar la fecha en dd/mm/año
function formatDateToDDMMYYYY(date) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString('es-ES', options);
}

function validateFechas(fechaInicio, fechaTermino) {
  const fechaInicioParsed = new Date(fechaInicio);
  const fechaTerminoParsed = new Date(fechaTermino);
  return fechaInicioParsed <= fechaTerminoParsed;
}

// funcion para obtener publicaciones
async function getProyectos(req, res) {
  try {
    const proyectos = await Proyecto.find()
      .sort({ fecha_termino: 1 }) // lista las fechas mas cercanas a terminar segun la rubrica
      .exec();

    if (proyectos.length === 0) {
      respondSuccess(req, res, 204); // No Content
    } else {
      // sigue las fechas de dd/mm/año
      const proyectosFormateados = proyectos.map((proyecto) => {
        const fechaInicioFormateada = formatDateToDDMMYYYY(proyecto.fecha_inicio);
        const fechaTerminoFormateada = formatDateToDDMMYYYY(proyecto.fecha_termino);

        return {
          ...proyecto.toObject(),
          fecha_inicio: fechaInicioFormateada,
          fecha_termino: fechaTerminoFormateada,
        };
      });

      respondSuccess(req, res, 200, proyectosFormateados);
    }
  } catch (error) {
    handleError(error, "proyectos.controller -> getProyecto");
  }
}

// Función para crear la publicación
async function createProyecto(req, res) {
  try {
    const { body } = req;

    // Aquí continúa con la creación de la publicación sin formatear las fechas
    const {
      titulo,
      descripcion,
      empresa_licitante,
      fecha_inicio,
      fecha_termino,
      presupuesto,
      actividades // Asegurarse de incluir actividades
    } = body;

    // Validaciones título
    if (typeof titulo !== "string" || titulo.length < 2 || titulo.length > 70) {
      return respondError(req, res, 400, "Verificar largo del título (min 10 max 70 caracteres).");
    }

    const regexTitulo = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!@#-]+$/;
    if (!regexTitulo.test(titulo)) {
      return respondError(req, res, 400, "El título debe tener al menos una letra y puede incluir los siguientes símbolos: ! @ # -");
    }

    // Validaciones descripción
    if (typeof descripcion !== "string" || descripcion.length < 2 || descripcion.length > 600) {
      return respondError(req, res, 400, "Verificar largo de la descripción (min 2 max 600 caracteres).");
    }

    const regexDescripcion = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!@#$%^&*.,?]+$/;
    if (!regexDescripcion.test(descripcion)) {
      return respondError(req, res, 400, "La descripción debe contener al menos una letra.");
    }

    // Validaciones empresa licitante
    if (typeof empresa_licitante !== "string" || empresa_licitante.length < 2 || empresa_licitante.length > 600) {
      return respondError(req, res, 400, "Verificar largo de la empresa licitante (min 2 max 600 caracteres).");
    }

    const regexEmpresaLicitante = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!@#$%^&*.,?]+$/;
    if (!regexEmpresaLicitante.test(empresa_licitante)) {
      return respondError(req, res, 400, "La empresa licitante debe contener al menos una letra.");
    }

    // Validaciones fecha_inicio y fecha_termino
    const currentDate = new Date(); // Fecha actual
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 150); // 150 años desde la fecha actual

    const parsedFechaInicio = new Date(fecha_inicio);
    const parsedFechaTermino = new Date(fecha_termino);

    if (
      parsedFechaInicio < currentDate || // La fecha de inicio no puede ser menor que la fecha actual
      parsedFechaInicio > parsedFechaTermino || // La fecha de inicio no puede ser mayor que la fecha de término
      parsedFechaInicio > maxDate // El año no puede ser mayor a la fecha actual + 150 años
    ) {
      if (parsedFechaInicio < currentDate) {
        return respondError(req, res, 400, "La fecha de inicio no puede ser menor que la fecha actual");
      } else if (parsedFechaInicio > parsedFechaTermino) {
        return respondError(req, res, 400, "La fecha de inicio no puede ser mayor que la fecha de término");
      } else {
        return respondError(req, res, 400, "El año ingresado no puede ser mayor a 150 años desde la fecha actual");
      }
    }
    if (
      parsedFechaTermino <= parsedFechaInicio || // La fecha de término no puede ser menor o igual que la fecha de inicio
      parsedFechaTermino > maxDate // No puede exceder 250 años desde la fecha actual
    ) {
      if (parsedFechaTermino <= parsedFechaInicio) {
        return respondError(req, res, 400, "La fecha de término debe ser posterior a la fecha de inicio");
      } else {
        return respondError(req, res, 400, "La fecha de término no puede exceder los 250 años desde la fecha actual");
      }
    }

    // Validaciones presupuesto
    const parsedPresupuesto = parseInt(presupuesto, 10);
    if (
      isNaN(parsedPresupuesto) || // Verificar si no es un número
      parsedPresupuesto <= 0 || // No puede ser negativo o igual a 0
      parsedPresupuesto !== parseFloat(presupuesto) ||
      parsedPresupuesto > 999999999 // No puede exceder los 999.999.999
    ) {
      if (isNaN(parsedPresupuesto)) {
        return respondError(req, res, 400, "El presupuesto debe ser un número válido");
      } else if (parsedPresupuesto <= 0) {
        return respondError(req, res, 400, "El presupuesto no puede ser negativo o igual a 0");
      } else if (isNaN(parsedPresupuesto) || parsedPresupuesto !== parseFloat(presupuesto)) {
        return respondError(req, res, 400, "El presupuesto debe ser un número entero válido");
      } else {
        return respondError(req, res, 400, "El presupuesto no puede exceder los 999.999.999");
      }
    }
 

    const proyecto = {
      titulo,
      descripcion,
      empresa_licitante,
      fecha_inicio,
      fecha_termino,
      presupuesto,
      actividades // Añadir las actividades al objeto proyecto
    };

    const [proyectos, errorProyectos] = await ProyectoService.createProyecto(proyecto);

    if (errorProyectos) {
      return respondInternalError(req, res, 404, errorProyectos);
    }

    if (!proyectos) {
      return respondError(req, res, 400, "No se creó la publicación");
    }

    respondSuccess(req, res, 201, proyectos);
  } catch (error) {
    handleError(error, "proyecto.controller -> createProyecto");
    respondError(req, res, 500, "No se creó la publicación");
  }
}

module.exports = { createProyecto };

// Función para editar la publicación
async function updateProyecto(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body; // Nuevos datos de la publicación

    // Busca la publicación por ID
    const proyecto = await Proyecto.findById(id);

    if (!proyecto) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    // Valida y actualiza los campos de la publicación
    const {
      titulo,
      descripcion,
      empresa_licitante,
      fecha_inicio,
      fecha_termino,
      presupuesto,
      actividades // Añadir las actividades
    } = updateData;

    // Validaciones título
    if (titulo && (typeof titulo !== "string" || titulo.length < 10 || titulo.length > 70)) {
      return respondError(req, res, 400, "Verificar largo del título (min 10 max 70 caracteres).");
    }

    const regexTitulo = /^[a-zA-Z\d\s-!@]+$/;
    if (titulo && !regexTitulo.test(titulo)) {
      return respondError(req, res, 400, "Revisar que el título no contenga símbolos no permitidos.");
    }

    // Validaciones descripción
    if (descripcion && (typeof descripcion !== "string" || descripcion.length < 2 || descripcion.length > 600)) {
      return respondError(req, res, 400, "Verificar largo de la descripción (min 2 max 600 caracteres).");
    }

    const regexDescripcion = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!@#$%^&*.,?]+$/;
    if (descripcion && !regexDescripcion.test(descripcion)) {
      return respondError(req, res, 400, "La descripción debe contener al menos una letra.");
    }

    // Validaciones empresa licitante
    if (empresa_licitante && (typeof empresa_licitante !== "string" || empresa_licitante.length < 2 || empresa_licitante.length > 600)) {
      return respondError(req, res, 400, "Verificar largo de la empresa licitante (min 2 max 600 caracteres).");
    }

    const regexEmpresaLicitante = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!@#$%^&*.,?]+$/;
    if (empresa_licitante && !regexEmpresaLicitante.test(empresa_licitante)) {
      return respondError(req, res, 400, "La empresa licitante debe contener al menos una letra.");
    }

    // Validaciones fecha_inicio y fecha_termino
    const currentDate = new Date(); // Fecha actual
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 150); // 150 años desde la fecha actual

    if (fecha_inicio) {
      const parsedFechaInicio = new Date(fecha_inicio);
      if (
        parsedFechaInicio < currentDate || // La fecha de inicio no puede ser menor que la fecha actual
        parsedFechaInicio > maxDate // El año no puede ser mayor a la fecha actual + 150 años
      ) {
        return respondError(req, res, 400, "La fecha de inicio no puede ser menor que la fecha actual o mayor a 150 años desde la fecha actual.");
      }
    }

    if (fecha_termino) {
      const parsedFechaTermino = new Date(fecha_termino);
      if (
        parsedFechaTermino <= (fecha_inicio ? new Date(fecha_inicio) : currentDate) || // La fecha de término no puede ser menor o igual que la fecha de inicio
        parsedFechaTermino > maxDate // No puede exceder 150 años desde la fecha actual
      ) {
        return respondError(req, res, 400, "La fecha de término debe ser posterior a la fecha de inicio y no exceder 150 años desde la fecha actual.");
      }
    }
    // Validaciones presupuesto
    const parsedPresupuesto = parseInt(presupuesto, 10);
    if (
      isNaN(parsedPresupuesto) || // Verificar si no es un número
      parsedPresupuesto <= 0 || // No puede ser negativo o igual a 0
      parsedPresupuesto !== parseFloat(presupuesto) ||
      parsedPresupuesto > 999999999 // No puede exceder los 999.999.999
    ) {
      if (isNaN(parsedPresupuesto)) {
        return respondError(req, res, 400, "El presupuesto debe ser un número válido");
      } else if (parsedPresupuesto <= 0) {
        return respondError(req, res, 400, "El presupuesto no puede ser negativo o igual a 0");
      } else if (isNaN(parsedPresupuesto) || parsedPresupuesto !== parseFloat(presupuesto)) {
        return respondError(req, res, 400, "El presupuesto debe ser un número entero válido");
      } else {
        return respondError(req, res, 400, "El presupuesto no puede exceder los 999.999.999");
      }
    }
 

    // Actualiza la publicación solo con los campos proporcionados
    if (titulo) proyecto.titulo = titulo;
    if (descripcion) proyecto.descripcion = descripcion;
    if (empresa_licitante) proyecto.empresa_licitante = empresa_licitante;
    if (fecha_inicio) proyecto.fecha_inicio = fecha_inicio;
    if (fecha_termino) proyecto.fecha_termino = fecha_termino;
    if (presupuesto) proyecto.presupuesto = presupuesto;

    // Actualiza las actividades solo si se proporciona la información
    if (actividades) {
      actividades.forEach((actividad, index) => {
        if (actividad.estado !== undefined) {
          // Convertir a booleano y validar
          const estado = actividad.estado === true || actividad.estado === 'true';
          proyecto.actividades[index].estado = estado;
        }
        // También podrías querer actualizar otros campos de las actividades si es necesario
      });
    }

    // Guarda el proyecto actualizado
    const updatedProyecto = await proyecto.save();

    return res.status(200).json(updatedProyecto);
  } catch (error) {
    handleError(error, "proyecto.controller -> updateProyecto");
    return res.status(500).json({ message: 'Error al actualizar la publicación' });
  }
}



// Función para eliminar publicación
async function deleteProyecto(req, res) {
  try {
    const { id } = req.params; // Obtén el ID de la URL

    // Busca la publicación por ID y elimínala
    const proyecto = await Proyecto.findByIdAndRemove(id);

    if (!proyecto) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    return res.status(204).send(); // Respuesta exitosa con estado 204 (No Content)
  } catch (error) {
    handleError(error, "proyecto.controller -> deleteProyecto");
    return res.status(500).json({ message: 'Error al eliminar la publicación' });
  }
}

// Función para obtener una publicación por ID
async function getProyectoById(req, res) {
  try {
    const { id } = req.params; // Obtén el ID de la URL

    // Busca la publicación por ID
    const proyecto = await Proyecto.findById(id);

    if (!proyecto) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    return res.status(200).json(proyecto);
  } catch (error) {
    handleError(error, "proyecto.controller -> getProyectoById");
    return res.status(500).json({ message: 'Error al obtener la publicación' });
  }
}
// controllers/proyecto.controller.js

// Función para actualizar el estado de una actividad
async function updateActividadEstado(req, res) {
  try {
    const { proyectoId, actividadIndex } = req.params;
    const { estado } = req.body; // Debe ser un booleano

    // Encuentra el proyecto por ID
    const proyecto = await Proyecto.findById(proyectoId);

    if (!proyecto) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }

    // Actualiza el estado de la actividad
    proyecto.actividades[actividadIndex].estado = estado;
    const updatedProyecto = await proyecto.save();

    return res.status(200).json(updatedProyecto);
  } catch (error) {
    handleError(error, "proyecto.controller -> updateActividadEstado");
    return res.status(500).json({ message: 'Error al actualizar el estado de la actividad' });
  }
}



// controllers/proyecto.controller.js

module.exports = {
  getProyectos,
  createProyecto,
  updateProyecto,
  deleteProyecto,
  getProyectoById,
  updateActividadEstado, // Añade esta línea
};

