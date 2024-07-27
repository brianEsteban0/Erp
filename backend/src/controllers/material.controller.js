const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const { respondInternalError } = require("../utils/resHandler");
const materialService = require("../services/material.service"); 
const { materialBodySchema, materialId } = require("../schema/material.schema");

async function getMaterial(req, res) {
  try {
    const [Material, errorMaterial] = await materialService.getMaterial();
    if (errorMaterial) return respondError(req, res, 404, errorMaterial);

    Material.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, Material);
  } catch (error) {
    handleError(error, "Material.controller -> getMaterial");
    respondError(req, res, 400, error.message);
  }
}

async function createMaterial(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = materialBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [newMaterial, MaterialError] = await materialService.createMaterial(body);

    if (MaterialError) return respondError(req, res, 400, MaterialError);
    if (!newMaterial) {
      return respondError(req, res, 400, "No se ingreso el inventario correctamente");
    }

    respondSuccess(req, res, 201, newMaterial);
  } catch (error) {
    handleError(error, "Material.controller -> createMaterial");
    respondError(req, res, 500, "No se ingreso el Material correctamente");
  }
}

async function getMaterialById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = materialId.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { id } = params;
    const [Material, errorMaterial] = await materialService.getMaterialById(id);
    if (errorMaterial) return respondError(req, res, 404, errorMaterial);

    respondSuccess(req, res, 200, Material);
  } catch (error) {
    handleError(error, "Material.controller -> getMaterialById");
    respondInternalError(req, res);
  }
}

async function updateMaterial(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = materialId.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { id } = params;
    const { error: bodyError } = materialBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [Material, errorMaterial] = await materialService.updateMaterial(id, body);
    if (errorMaterial) return respondError(req, res, 404, errorMaterial);

    respondSuccess(req, res, 200, Material);
  } catch (error) {
    handleError(error, "Material.controller -> updateMaterial");
    respondInternalError(req, res);
  }
}

async function deleteMaterial(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = materialId.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { id } = params;
    const [Material, errorMaterial] = await materialService.deleteMaterial(id);
    if (errorMaterial) return respondError(req, res, 404, errorMaterial);

    respondSuccess(req, res, 200, Material);
  } catch (error) {
    handleError(error, "Material.controller -> deleteMaterial");
    respondInternalError(req, res);
  }
}

module.exports = {
    getMaterial,
    createMaterial,
    getMaterialById,
    updateMaterial,
    deleteMaterial,
};