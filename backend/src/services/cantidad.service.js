"use strict";
// Importa el modelo de datos publicacionForo
const Cantidad = require("../models/cantidad.model.js");
const { handleError } = require("../utils/errorHandler");

async function getCantidad() {
    try {
        const materiales = await Cantidad.find()
            .populate("material")
            .populate("almacen")
            .exec();
        if (!materiales) return [null, "No se encontro materiales"];

        return [materiales, null];
    } catch (error) {
        handleError(error, "Cantidad.service -> getCantidad");
    }
}

async function createCantidad(materiales) {
    try {
        const { material,cantidad,almacen,fechaIngreso,usuarioIngreso} = materiales;
        
        const materialesFound = await Cantidad.findOne({ material: materiales.material , almacen: materiales.almacen});
        if (materialesFound) return [null, "El Material ya existe en el almacen"];

        const newCantidad = new Cantidad({
            material,
            cantidad,
            almacen,
            fechaIngreso,
            usuarioIngreso,
        });
        await newCantidad.save();
        
        return [newCantidad, null];
    }catch (error) {
        handleError(error, "Cantidad.service -> createCantidad");
    }   
}

async function getCantidadById(id) { 
    try {
        const material = await Cantidad.findById(id)
            .populate("material")
            .populate("almacen")
            .exec();
        if (!material) return [null, "El Material no existe"];

        return [material, null];
    } catch (error) {
        handleError(error, "Cantidad.service -> getCantidadById");
    }

}

async function updateCantidad(id, materiales) { 
    try {
        const materialFound = await Cantidad.findById(id)
            .exec();
        if (!materialFound) return [null, "El Material no existe"];

        const { material,cantidad,almacen, fechaIngreso, usuarioIngreso} = materiales;

        const cantidadUpdated = await Cantidad.findByIdAndUpdate(
            id,
            {
                material,
                cantidad,
                almacen,
                fechaIngreso,
                usuarioIngreso,
            },
            { new: true },
        );

        return [cantidadUpdated, null];
    } catch (error) {
        handleError(error, "Cantidad.service -> updateCantidad");
    }
}

async function deleteCantidad(id) {
    try {
        const materialFound = await Cantidad.findById(id);
        if (!materialFound) return [null, "El material no existe"];

        return await Cantidad.findByIdAndDelete(id);
    } catch (error) {
        handleError(error, "Cantidad.service -> deleteCantidad");
    }
}

async function getCantidadByMaterial(id) {
    try {
        const material = await Cantidad.find({ material: id })
            .populate("material")
            .populate("almacen")
            .exec();
        if (!material) return [null, "El Material no existe"];

        return [material, null];
    } catch (error) {
        handleError(error, "Cantidad.service -> getCantidadByMaterial");
    }

}

async function getCantidadByAlmacen(id) {
    try {
        const material = await Cantidad.find({ almacen: id })
            .populate("material")
            .populate("almacen")
            .exec();
        if (!material) return [null, "El Material no existe"];

        return [material, null];
    } catch (error) {
        handleError(error, "Cantidad.service -> getCantidadByAlmacen");
    }

}


async function restarCantidad(id,body) {
    try {
        const {cantidad} = body;
        const materialFound = await Cantidad.findOne({id: id})
            .exec();
        if (!materialFound) return [null, "El Material no existe"];

        const cantidadUpdated = await Cantidad.findOneAndUpdate(
            {id: id},
            {
                cantidad: materialFound.cantidad - cantidad,
            },
            { new: true },
        );

        return [cantidadUpdated, null];
    } catch (error) {
        handleError(error, "Cantidad.service -> restarCantidad");
    }
}

async function sumarCantidad(id,body) {
    try {
        const {cantidad} = body;
        const materialFound = await Cantidad.findOne({id: id})
            .exec();
        if (!materialFound) return [null, "El Material no existe"];

        const cantidadUpdated = await Cantidad.findOneAndUpdate(
            {id: id},
            {
                cantidad: materialFound.cantidad + cantidad,
            },
            { new: true },
        );

        return [cantidadUpdated, null];
    } catch (error) {
        handleError(error, "Cantidad.service -> sumarCantidad");
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