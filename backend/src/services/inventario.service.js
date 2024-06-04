"use strict";
// Importa el modelo de datos publicacionForo
const Inventario = require("../models/inventario.model.js");
const { handleError } = require("../utils/errorHandler");

async function getInventario() {
    try {
        const inventarios = await Inventario.find()
            .exec();
        if (!inventarios) return [null, "No existe inventario"];

        return [inventarios, null];
    } catch (error) {
        handleError(error, "inventario.service -> getInvenatrio");
    }
}

async function createInventario(inventario) {
    try {
        const { nombre,cantidad, precio, descripcion} = inventario;
        
        const inventarioFound = await Inventario.findOne({ nombre: inventario.nombre });
        if (inventarioFound) return [null, "El articulo ya existe en el inventario"];

        const newInventario = new Inventario({
            nombre,
            cantidad,
            precio,
            descripcion,
        });
        await newInventario.save();
        
        return [newInventario, null];
    }catch (error) {
        handleError(error, "Inventario.service -> createInventario");
    }   
}

async function getInventarioById(id) { 
    try {
        const inventario = await Inventario.findById(id)
            .exec();
        if (!inventario) return [null, "El inventario no existe"];

        return [inventario, null];
    } catch (error) {
        handleError(error, "inventario.service -> getInventarioById");
    }

}

async function updateInventario(id, inventario) { 
    try {
        const inventarionFound = await Inventario.findById(id)
            .exec();
        if (!inventarionFound) return [null, "El articulo no existe"];

        const { nombre,cantidad, precio, descripcion} = inventario;

        const inventarioUpdated = await Inventario.findByIdAndUpdate(
            id,
            {
                nombre,
                cantidad,
                precio,
                descripcion,
            },
            { new: true },
        );

        return [inventarioUpdated, null];
    } catch (error) {
        handleError(error, "inventario.service -> updateInventario");
    }
}

async function deleteInventario(id) {
    try {
        const inventarioFound = await Inventario.findById(id);
        if (!inventarioFound) return [null, "El articulo no existe"];

        return await Inventario.findByIdAndDelete(id);
    } catch (error) {
        handleError(error, "nventirio.service -> deleteInvetario");
    }
}


module.exports = {
    getInventario,
    createInventario,
    getInventarioById,
    updateInventario,
    deleteInventario
};
