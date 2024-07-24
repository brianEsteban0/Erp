const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const { respondInternalError } = require("../utils/resHandler");
const AlmacenService = require("../services/almacen.service"); 
const { almacenBodySchema, almacenIdSchema } = require("../schema/almacen.schema");

async function getAlmacen(req, res) {
  try {
    const [Almacen, errorAlmacen] = await AlmacenService.getAlmacen();
    if (errorAlmacen) return respondError(req, res, 404, errorAlmacen);

    Almacen.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, Almacen);
  } catch (error) {
    handleError(error, "Almacen.controller -> getAlmacen");
    respondError(req, res, 400, error.message);
  }
}

async function createAlmacen(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = almacenBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [newAlmacen, AlmacenError] = await AlmacenService.createAlmacen(body);

    if (AlmacenError) return respondError(req, res, 400, AlmacenError);
    if (!newAlmacen) {
      return respondError(req, res, 400, "No se ingreso el Almacen correctamente");
    }

    respondSuccess(req, res, 201, newAlmacen);
  } catch (error) {
    handleError(error, "Almacen.controller -> createAlmacen");
    respondError(req, res, 500, "No se ingreso el Almacen correctamente");
  }
}

async function getAlmacenById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = almacenIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { id } = params;
    const [Almacen, errorAlmacen] = await AlmacenService.getAlmacenById(id);
    if (errorAlmacen) return respondError(req, res, 404, errorAlmacen);

    respondSuccess(req, res, 200, Almacen);
  } catch (error) {
    handleError(error, "Almacen.controller -> getAlmacenById");
    respondInternalError(req, res);
  }
}

async function updateAlmacen(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = almacenIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { id } = params;
    const { error: bodyError } = almacenBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [Almacen, errorAlmacen] = await AlmacenService.updateAlmacen(id, body);
    if (errorAlmacen) return respondError(req, res, 404, errorAlmacen);

    respondSuccess(req, res, 200, Almacen);
  } catch (error) {
    handleError(error, "Almacen.controller -> updateAlmacen");
    respondInternalError(req, res);
  }
}

async function deleteAlmacen(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = almacenIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { id } = params;
    const [Almacen, errorAlmacen] = await AlmacenService.deleteAlmacen(id);
    if (errorAlmacen) return respondError(req, res, 404, errorAlmacen);

    respondSuccess(req, res, 200, Almacen);
  } catch (error) {
    handleError(error, "Almacen.controller -> deleteAlmacen");
    respondInternalError(req, res);
  }
}

module.exports = {
    getAlmacen,
    createAlmacen,
    getAlmacenById,
    updateAlmacen,
    deleteAlmacen,
};