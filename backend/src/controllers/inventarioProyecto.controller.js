const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const { respondInternalError } = require("../utils/resHandler");
const InventarioProyectoService = require("../services/inventarioProyecto.service"); 
const { inventarioProyectoBodySchema, inventarioProyectoId } = require("../schema/inventarioProyecto.schema");

async function getInventarioProyecto(req, res) {
  try {
    const [InventarioProyecto, errorInventarioProyecto] = await InventarioProyectoService.getInventarioProyecto();
    if (errorInventarioProyecto) return respondError(req, res, 404, errorInventarioProyecto);

    InventarioProyecto.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, Inventario);
  } catch (error) {
    handleError(error, "inventarioProyecto.controller -> getInventarioProyecto");
    respondError(req, res, 400, error.message);
  }
}

async function createInventarioProyecto(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = inventarioProyectoBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [newInventarioProyecto, inventarioProyectoError] = await InventarioProyectoService.createInventarioProyecto(body);

    if (inventarioProyectoError) return respondError(req, res, 400, inventarioProyectoError);
    if (!newInventarioProyecto) {
      return respondError(req, res, 400, "No se ingreso el inventario correctamente");
    }

    respondSuccess(req, res, 201, newInventarioProyecto);
  } catch (error) {
    handleError(error, "inventarioProyecto.controller -> createInventarioProyecto");
    respondError(req, res, 500, "No se ingreso el inventario correctamente");
  }
}

async function getInventarioProyectoById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = inventarioProyectoId.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { id } = params;
    const [inventarioProyecto, errorInventarioProyecto] = await InventarioProyectoService.getInventarioProyectoById(id);
    if (errorInventarioProyecto) return respondError(req, res, 404, errorInventarioProyecto);

    respondSuccess(req, res, 200, inventarioProyecto);
  } catch (error) {
    handleError(error, "inventarioProyecto.controller -> getInventarioProyectoById");
    respondInternalError(req, res);
  }
}

async function updateInventarioProyecto(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = inventarioProyectoId.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { id } = params;
    const { error: bodyError } = inventarioProyectoBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [inventarioProyecto, errorInventarioProyecto] = await InventarioProyectoService.updateInventarioProyecto(id, body);
    if (errorInventarioProyecto) return respondError(req, res, 404, errorInventarioProyecto);

    respondSuccess(req, res, 200, inventarioProyecto);
  } catch (error) {
    handleError(error, "inventarioProyecto.controller -> updateInventarioProyecto");
    respondInternalError(req, res);
  }
}

async function deleteInventarioProyecto(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = inventarioProyectoId.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { id } = params;
    const [inventarioProyecto, errorInventarioProyecto] = await InventarioProyectoService.deleteInventarioProyecto(id);
    if (errorInventarioProyecto) return respondError(req, res, 404, errorInventarioProyecto);

    respondSuccess(req, res, 200, inventarioProyecto);
  } catch (error) {
    handleError(error, "inventarioProyecto.controller -> deleteInventarioProyecto");
    respondInternalError(req, res);
  }
}

module.exports = {
    getInventarioProyecto,
    createInventarioProyecto,
    getInventarioProyectoById,
    updateInventarioProyecto,
    deleteInventarioProyecto,
};