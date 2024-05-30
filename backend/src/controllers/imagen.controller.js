const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const Imagen = require("../models/imagen.model");
const { get } = require("mongoose");

async function createImagen(req, res) {
  try {
    const { file } = req;


    const newFile = new Imagen({
        name: file.filename,
        imageUrl: file.path,
        user: req.params.user,
        publicacion: req.params.publicacionNombre,
    }); 

    respondSuccess(req, res, 201, newFile);
  } catch (error) {
    handleError(error, "imagen.controller -> createImagen");
    respondError(req, res, 500, "No se creo la Publicacion");
  }
}
async function getImagen(req, res) {
  try {
    const { id } = req.params;
    const imagen = await Imagen.findById(id);
    if (!imagen) {
      return respondError(req, res, 404, "Imagen no encontrada");
      }
      respondSuccess(req, res, 200, imagen);
  } catch (error) {
    handleError(error, "imagen.controller -> getImagen");
    respondError(req, res, 500, "No se pudo obtener la imagen");
    }
}

async function deleteImagen(req, res) {
  try {
    const { id } = req.params;
    const imagen = await Imagen.findByIdAndDelete(id);
    if (!imagen) {
      return respondError(req, res, 404, "Imagen no encontrada");
    }
    respondSuccess(req, res, 200, imagen);
  } catch (error) {
    handleError(error, "imagen.controller -> deleteImagen");
    respondError(req, res, 500, "No se pudo eliminar la imagen");
  }
}

async function updateImagen(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;
    const imagen = await Imagen.findByIdAndUpdate(id, body);
        if (!imagen) {
            return respondError(req, res, 404, "Imagen no encontrada");
      }
      respondSuccess(req, res, 200, imagen);
    }
    catch (error) {
      handleError(error, "imagen.controller -> updateImagen");
      respondError(req, res, 500, "No se pudo actualizar la imagen");
    }
}

module.exports = {
    createImagen,
    getImagen,
    deleteImagen,
    updateImagen
};