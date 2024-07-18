const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const { respondInternalError } = require("../utils/resHandler");
const PublicacionForoService = require("../services/publicacionForo.service"); 
const { publicacionForoBodySchema, publicacionForoIdSchema } = require("../schema/publicacionForo.schema");

async function getPublicacionesForo(req, res) {
  try {
    const [publicacionesForo, errorPublicacionesForo] = await PublicacionForoService.getPublicacionesForo();
    if (errorPublicacionesForo) return respondError(req, res, 404, errorPublicacionesForo);

    publicacionesForo.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, publicacionesForo);
  } catch (error) {
    handleError(error, "publicacionForo.controller -> getPublicacionesForo");
    respondError(req, res, 400, error.message);
  }
}
  // Función para crear la publicación
async function createPublicacionForo(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = publicacionForoBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [newPublicacion, publicacionError] = await PublicacionForoService.createPublicacionForo(body);

    if (publicacionError) return respondError(req, res, 400, publicacionError);
    if (!newPublicacion) {
      return respondError(req, res, 400, "No se creo la publicación");
    }

    respondSuccess(req, res, 201, newPublicacion);
  } catch (error) {
    handleError(error, "publicacionForo.controller -> createPublicacionForo");
    respondError(req, res, 500, "No se creo la Publicacion");
  }
}

async function getPublicacionForoById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = publicacionForoIdSchema.validate(params._id);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { id } = params;
    const [publicacion, errorPublicacion] = await PublicacionForoService.getPublicacionForoById(id);
    if (errorPublicacion) return respondError(req, res, 404, errorPublicacion);

    respondSuccess(req, res, 200, publicacion);
  } catch (error) {
    handleError(error, "publicacionForo.controller -> getPublicacionForoById");
    respondInternalError(req, res);
  }
}

async function updatePublicacionForo(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = publicacionForoIdSchema.validate(params.id);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { id } = params;
    const { error: bodyError } = publicacionForoBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [publicacion, errorPublicacion] = await PublicacionForoService.updatePublicacionForo(id, body);
    if (errorPublicacion) return respondError(req, res, 404, errorPublicacion);

    respondSuccess(req, res, 200, publicacion);
  } catch (error) {
    handleError(error, "publicacionForo.controller -> updatePublicacionForo");
    respondInternalError(req, res);
  }
}

async function deletePublicacionForo(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = publicacionForoIdSchema.validate(params.id);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { id } = params;
    const [publicacion, errorPublicacion] = await PublicacionForoService.deletePublicacionForo(id);
    if (errorPublicacion) return respondError(req, res, 404, errorPublicacion);

    respondSuccess(req, res, 200, publicacion);
  } catch (error) {
    handleError(error, "publicacionForo.controller -> deletePublicacionForo");
    respondInternalError(req, res);
  }
}

async function comentar(req, res) {
  try {
    const { params, body } = req;
    console.log(body);
    const { id } = params;

    const [publicacion, errorPublicacion] = await PublicacionForoService.comentar(id, body);
    if (errorPublicacion) return respondError(req, res, 404, errorPublicacion);

    respondSuccess(req, res, 200, publicacion);
  } catch (error) {
    handleError(error, "publicacionForo.controller -> comentar");
    respondInternalError(req, res);
  }
}

module.exports = {
  getPublicacionesForo,
  getPublicacionForoById,
  createPublicacionForo,
  updatePublicacionForo,
  deletePublicacionForo,
  comentar,
};