const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const { respondInternalError } = require("../utils/resHandler");
const InventarioService = require("../services/inventario.service"); 
const { inventarioBodySchema, inventarioId } = require("../schema/inventario.schema");

async function getInventario(req, res) {
  try {
    const [Inventario, errorInventario] = await InventarioService.getInventario();
    if (errorInventario) return respondError(req, res, 404, errorInventario);

    Inventario.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, Inventario);
  } catch (error) {
    handleError(error, "inventario.controller -> getInventario");
    respondError(req, res, 400, error.message);
  }
}

async function createInventario(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = inventarioBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [newInventario, inventarioError] = await InventarioService.createInventario(body);

    if (inventarioError) return respondError(req, res, 400, inventarioError);
    if (!newInventario) {
      return respondError(req, res, 400, "No se ingreso el inventario correctamente");
    }

    respondSuccess(req, res, 201, newInventario);
  } catch (error) {
    handleError(error, "inventario.controller -> createInventario");
    respondError(req, res, 500, "No se ingreso el inventario correctamente");
  }
}

async function getInventarioById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = inventarioId.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { id } = params;
    const [inventario, errorInventario] = await InventarioService.getInventarioById(id);
    if (errorInventario) return respondError(req, res, 404, errorInventario);

    respondSuccess(req, res, 200, inventario);
  } catch (error) {
    handleError(error, "inventario.controller -> getInventarioById");
    respondInternalError(req, res);
  }
}

async function updateInventario(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = inventarioId.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { id } = params;
    const { error: bodyError } = inventarioBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [inventario, errorInventario] = await InventarioService.updateInventario(id, body);
    if (errorInventario) return respondError(req, res, 404, errorInventario);

    respondSuccess(req, res, 200, inventario);
  } catch (error) {
    handleError(error, "inventario.controller -> updateInventario");
    respondInternalError(req, res);
  }
}

async function deleteInventario(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = inventarioId.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { id } = params;
    const [inventario, errorInventario] = await InventarioService.deleteInventario(id);
    if (errorInventario) return respondError(req, res, 404, errorInventario);

    respondSuccess(req, res, 200, inventario);
  } catch (error) {
    handleError(error, "inventario.controller -> deleteInventario");
    respondInternalError(req, res);
  }
}

async function restarCantidad(inventarios) {
  try {
    const [producto, errorProducto] = await InventarioService.restarCantidad(inventarios);
    if (errorProducto) return respondError(req, res, 404, errorProducto);
    return producto;
  } catch (error) {
    handleError(error, "Inventario.controller -> restarCantidad");
    respondInternalError(req, res);
  }
}

module.exports = {
    getInventario,
    createInventario,
    getInventarioById,
    updateInventario,
    deleteInventario,
    restarCantidad,
};