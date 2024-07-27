const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const { respondInternalError } = require("../utils/resHandler");
const CantidadService = require("../services/cantidad.service"); 
const { cantidadBodySchema, cantidadIdSchema } = require("../schema/cantidad.schema");

async function getCantidad(req, res) {
  try {
    const [Cantidad, errorCantidad] = await CantidadService.getCantidad();
    if (errorCantidad) return respondError(req, res, 404, errorCantidad);

    Cantidad.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, Cantidad);
  } catch (error) {
    handleError(error, "Cantidad.controller -> getCantidad");
    respondError(req, res, 400, error.message);
  }
}

async function createCantidad(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = cantidadBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [newCantidad, cantidadError] = await CantidadService.createCantidad(body);

    if (cantidadError) return respondError(req, res, 400, cantidadError);
    if (!newCantidad) {
      return respondError(req, res, 400, "No se ingreso el inventario correctamente");
    }

    respondSuccess(req, res, 201, newCantidad);
  } catch (error) {
    handleError(error, "Cantidad.controller -> createCantidad");
    respondError(req, res, 500, "No se ingreso el inventario correctamente");
  }
}

async function getCantidadById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = cantidadIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { id } = params;
    const [cantidad, errorCantidad] = await CantidadService.getCantidadById(id);
    if (errorCantidad) return respondError(req, res, 404, errorCantidad);

    respondSuccess(req, res, 200, cantidad);
  } catch (error) {
    handleError(error, "Cantidad.controller -> getCantidadById");
    respondInternalError(req, res);
  }
}

async function updateCantidad(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = cantidadIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { id } = params;
    const { error: bodyError } = cantidadBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [cantidad, errorCantidad] = await CantidadService.updateCantidad(id, body);
    if (errorCantidad) return respondError(req, res, 404, errorCantidad);

    respondSuccess(req, res, 200, cantidad);
  } catch (error) {
    handleError(error, "Cantidad.controller -> updateCantidad");
    respondInternalError(req, res);
  }
}

async function deleteCantidad(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = cantidadIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { id } = params;
    const [cantidad, errorCantidad] = await CantidadService.deleteCantidad(id);
    if (errorCantidad) return respondError(req, res, 404, errorCantidad);

    respondSuccess(req, res, 200, cantidad);
  } catch (error) {
    handleError(error, "Cantidad.controller -> deleteCantidad");
    respondInternalError(req, res);
  }
}

async function restarCantidad(req, res) {
  try {
    const { body } = req;

    const [cantidad, errorCantidad] = await CantidadService.restarCantidad(body);
    if (errorCantidad) return respondError(req, res, 404, errorCantidad);

    respondSuccess(req, res, 200, cantidad);
  } catch (error) {
    handleError(error, "Cantidad.controller -> restarCantidad");
    respondInternalError(req, res);
  }
}

async function getCantidadByMaterial(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = cantidadIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { id } = params;
    const [cantidad, errorCantidad] = await CantidadService.getCantidadByMaterial(id);
    if (errorCantidad) return respondError(req, res, 404, errorCantidad);

    respondSuccess(req, res, 200, cantidad);
  } catch (error) {
    handleError(error, "Cantidad.controller -> getCantidadByMaterial");
    respondInternalError(req, res);
  }
}

async function getCantidadByAlmacen(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = cantidadIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { id } = params;
    const [cantidad, errorCantidad] = await CantidadService.getCantidadByAlmacen(id);
    if (errorCantidad) return respondError(req, res, 404, errorCantidad);

    respondSuccess(req, res, 200, cantidad);
  } catch (error) {
    handleError(error, "Cantidad.controller -> getCantidadByAlmacen");
    respondInternalError(req, res);
  }
}

async function sumarCantidad(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = cantidadIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { id } = params;

    const [cantidad, errorCantidad] = await CantidadService.sumarCantidad(id, body);
    if (errorCantidad) return respondError(req, res, 404, errorCantidad);

    respondSuccess(req, res, 200, cantidad);
  } catch (error) {
    handleError(error, "Cantidad.controller -> sumarCantidad");
    respondInternalError(req, res);
  }
}

module.exports = {
    getCantidad,
    createCantidad,
    getCantidadById,
    updateCantidad,
    deleteCantidad,
    getCantidadByMaterial,
    getCantidadByAlmacen,
    restarCantidad,
    sumarCantidad,
};