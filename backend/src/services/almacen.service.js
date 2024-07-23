"use strict";
// Importa el modelo de datos publicacionForo
const Almacen = require("../models/almacen.model.js");
const { handleError } = require("../utils/errorHandler");

async function getAlmacen() {
    try {
        const almacenes = await Almacen.find()
            .exec();
        if (!almacenes) return [null, "No se encontro almacenes"];

        return [almacenes, null];
    } catch (error) {
        handleError(error, "Almacen.service -> getAlmacen");
    }
}

async function createAlmacen(almacen) {
    try {
        const { nombre, ubicacion, fono} = almacen;
        
        const almacenFound = await Almacen.findOne({ nombre: almacen.nombre });
        if (almacenFound) return [null, "El almacen ya existe"];

        const newAlmacen = new Almacen({
            nombre,
            ubicacion,
            fono,
        });
        await newAlmacen.save();
        
        return [newAlmacen, null];
    }catch (error) {
        handleError(error, "Almacen.service -> createAlmacen");
    }   
}

async function getAlmacenById(id) { 
    try {
        const almacen = await Almacen.findById(id)
            .exec();
        if (!almacen) return [null, "El almacen no existe"];

        return [almacen, null];
    } catch (error) {
        handleError(error, "Almacen.service -> getAlmacenById");
    }

}

async function updateAlmacen(id, almacen) { 
    try {
        const almacenFound = await Almacen.findById(id)
            .exec();
        if (!almacenFound) return [null, "El almacen no existe"];

                
        const almacenFounded = await Almacen.findOne({ nombre: almacen.nombre });
        if (almacenFounded) {
            if (!(materialFounded.nombre == almacenFound.nombre)) return [null, "El nombre del almacen ya existe"];
            
        }

        const { nombre,ubicacion,fono} = almacen;

        const almacenUpdated = await Almacen.findByIdAndUpdate(
            id,
            {
                nombre,
                ubicacion,
                fono,
            },
            { new: true },
        );

        return [almacenUpdated, null];
    } catch (error) {
        handleError(error, "Almacen.service -> updateAlmacen");
    }
}

async function deleteAlmacen(id) {
    try {
        const almacenFound = await Almacen.findById(id);
        if (!almacenFound) return [null, "El almacen no existe"];

        return await Almacen.findByIdAndDelete(id);
    } catch (error) {
        handleError(error, "Almacen.service -> deleteAlmacen");
    }
}

module.exports = {
    getAlmacen,
    createAlmacen,
    getAlmacenById,
    updateAlmacen,
    deleteAlmacen,
};
