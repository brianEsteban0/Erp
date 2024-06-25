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
    const currentDate = new Date(); // obtiene fecha actual

    const proyectos = await Proyecto.find()
      .sort({ fecha_termino: 1 }) // lista las fechas mas cercanas a terminar segun la rubrica
      .exec();

    if (proyectos.length === 0) {
      respondSuccess(req, res, 204); // No Content
    } else {
      // sigue las fechas de dd/mm/año
      const proyectosFormateados = proyectos.map((proyecto) => {
        const fechaInicioFormateada = formatDateToDDMMYYYY(proyecto.fecha_inicio);
        const fechaTermino = proyecto.fecha_termino;
        const fechaTerminoFormateada = formatDateToDDMMYYYY(fechaTermino);

        if (fechaTermino < currentDate) {
          // muestra plazo vencido si la fecha de termino es menor a la fecha actual
          return {
            ...proyecto.toObject(),
            fecha_inicio: fechaInicioFormateada,
            fecha_termino: "Plazo vencido",
          };
        } else {
          return {
            ...proyecto.toObject(),
            fecha_inicio: fechaInicioFormateada,
            fecha_termino: fechaTerminoFormateada,
          };
        }
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
      fecha_termino
    } = body;
    
    //validaciones titulo
    if (typeof titulo !== "string" || titulo.length < 10 || titulo.length > 70) {
      return respondError(req, res, 400, "Verificar largo del titulo (min 10 max 70 caracteres).");
    }

    const regexTitulo = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!@#-]+$/;
    
    if (!regexTitulo.test(titulo)) {
      return respondError(req, res, 400, "El titulo debe al menos una letra y los siguientes simbolos: ! @ # -");
    }
    //validaciones descripcion
    if (typeof descripcion !== "string" || descripcion.length < 2 || descripcion.length > 600) {
      return respondError(req, res, 400, "Verificar largo de la descripcion (min 1 max 600 caracteres).");
    }
    const regexDescripcion = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!@#$%^&*.,?]+$/;
    if (!regexDescripcion.test(descripcion)) {
      return respondError(req, res, 400, "La descripción debe contener al menos una letra.");
    }
    //validaciones empresa licitante
    if (typeof empresa_licitante !== "string" || empresa_licitante.length < 2 || empresa_licitante.length > 600) {
      return respondError(req, res, 400, "Verificar largo de la empresa licitante (min 1 max 600 caracteres).");
    }
    const regexEmpresaLicitante = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!@#$%^&*.,?]+$/;
    if (!regexEmpresaLicitante.test(empresa_licitante)) {
      return respondError(req, res, 400, "La empresa licitante debe contener al menos una letra.");
    }
    //validaciones fecha_inicio
    const currentDate = new Date(); // Fecha actual
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 150); // 150 años desde la fecha actual

    const parsedFechaInicio = new Date(fecha_inicio);
    const parsedFechaTermino = new Date(fecha_termino);

    // Validar la fecha de inicio
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

    const proyecto = {
      titulo,
      descripcion,
      empresa_licitante,
      fecha_inicio,
      fecha_termino
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


  // funcion para editar publicacion
  async function updateProyecto(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body; // nuevos datos de la pub
  
      // busca publicaciobn por id
      const proyecto = await Proyecto.findById(id);
  
      if (!proyecto) {
        return res.status(404).json({ message: 'Publicación no encontrada' });
      }
      const {
        titulo,
        descripcion,
        empresa_licitante,
        fecha_inicio,
        fecha_termino,
      } = updateData;

      //validaciones titulo
    if (typeof titulo !== "string" || titulo.length < 10 || titulo.length > 70) {
      return respondError(req, res, 400, "Verificar largo del titulo (min 10 max 70 caracteres).");
    }

    const regexTitulo = /^[a-zA-Z\d\s-!@]+$/;
    
    if (!regexTitulo.test(titulo)) {
      return respondError(req, res, 400, "Revisar que el titulo no contenga simbolos.");
    }
    //validaciones descripcion
    if (typeof descripcion !== "string" || descripcion.length < 2 || descripcion.length > 600) {
      return respondError(req, res, 400, "Verificar largo de la descripcion (min 1 max 600 caracteres).");
    }
    const regexDescripcion = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!@#$%^&*.,?]+$/;
    if (!regexDescripcion.test(descripcion)) {
      return respondError(req, res, 400, "La descripción debe contener al menos una letra.");
    }
    //validaciones empresa licitante
    if (typeof empresa_licitante !== "string" || empresa_licitante.length < 2 || empresa_licitante.length > 600) {
      return respondError(req, res, 400, "Verificar largo de la empresa licitante (min 1 max 600 caracteres).");
    }
    const regexEmpresaLicitante = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!@#$%^&*.,?]+$/;
    if (!regexEmpresaLicitante.test(empresa_licitante)) {
      return respondError(req, res, 400, "La empresa licitante debe contener al menos una letra.");
    }
    //validaciones fecha_inicio
    const currentDate = new Date(); // Fecha actual
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 150); // 150 años desde la fecha actual

    const parsedFechaInicio = new Date(fecha_inicio);
    const parsedFechaTermino = new Date(fecha_termino);

    // Validar la fecha de inicio
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
      // se actualiza la publicacion
      proyecto.set(updateData);
      const updatedProyecto = await proyecto.save();
  
      return res.status(200).json(updatedProyecto);
    } catch (error) {
      handleError(error, "proyecto.controller -> updateProyecto");
      return res.status(500).json({ message: 'Error al actualizar la publicación' });
    }
  }

  //funcion para eliminar publicacion
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

module.exports = {
    getProyectos,
    createProyecto,
    updateProyecto: updateProyecto,
    deleteProyecto,
    getProyectoById,
  };