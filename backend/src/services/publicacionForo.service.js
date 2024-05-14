"use strict";
// Importa el modelo de datos publicacionForo
const PublicacionForo = require("../models/publicacionForo.model.js");
const { handleError } = require("../utils/errorHandler");

async function getPublicacionesForo() {
    try {
        const publicacionesForo = await PublicacionForo.find()
            .populate("user")
            .exec();
        if (!publicacionesForo) return [null, "No hay publicaciones en el foro"];

        return [publicacionesForo, null];
    } catch (error) {
        handleError(error, "publicacionForo.service -> getPublicacionesForo");
    }
}

async function createPublicacionForo(publicacion) {
    try {
        const { titulo, contenido, imagen, comentarios, autor, fechaCreacion } = publicacion;
        
        const publicacionFound = await PublicacionForo.findOne({ titulo: publicacion.titulo });
        if (publicacionFound) return [null, "La publicacion ya existe"];

        const newPublicacion = new PublicacionForo({
            titulo,
            contenido,
            imagen,
            comentarios,
            autor,
            fechaCreacion,
        
        });
        await newPublicacion.save();
        
        return [newPublicacion, null];
    }catch (error) {
        handleError(error, "publicacionForo.service -> createPublicacionForo");
    }   
}

async function getPublicacionForoById(id) { 
    try {
        const publicacion = await PublicacionForo.findById({ _id: id })
            .populate("user")
            .exec();
        if (!publicacion) return [null, "La publicacion no existe"];

        return [publicacion, null];
    } catch (error) {
        handleError(error, "publicacionForo.service -> getPublicacionForoById");
    }

}

async function updatePublicacionForo(id, publicacion) { 
    try {
        const publicacionFound = await PublicacionForo.findById(id);
        if (!publicacionFound) return [null, "La publicacion no existe"];

        const { titulo, contenido, imagen, comentarios, autor, fechaCreacion } = publicacion;

        const publicacionUpdated = await PublicacionForo.findByIdAndUpdate(
            id,
            {
                titulo,
                contenido,
                imagen,
                comentarios,
                autor,
                fechaCreacion,
            },
            { new: true },
        );

        return [publicacionUpdated, null];
    } catch (error) {
        handleError(error, "publicacionForo.service -> updatePublicacionForo");
    }
}

async function deletePublicacionForo(id) {
    try {
        const publicacionFound = await PublicacionForo.findById(id);
        if (!publicacionFound) return [null, "La publicacion no existe"];

        return await PublicacionForo.findByIdAndDelete(id);
    } catch (error) {
        handleError(error, "publicacionForo.service -> deletePublicacionForo");
    }
}


module.exports = {
    getPublicacionesForo,
    createPublicacionForo,
    getPublicacionForoById,
    updatePublicacionForo,
    deletePublicacionForo
};
