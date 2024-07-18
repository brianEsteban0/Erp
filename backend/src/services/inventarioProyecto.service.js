"use strict";

const InventarioProyecto = require("../models/inventarioProyecto.model.js");
const { handleError } = require("../utils/errorHandler");

async function getInventarioProyecto() {
    try {
        const inventariosProyecto = await InventarioProyecto.find()
            .populate("proyecto")
            .populate("inventarios.inventario")
            .exec();
        if (!inventariosProyecto) return [null, "No existe inventario de proyecto"];

        return [inventariosProyecto, null];
    } catch (error) {
        handleError(error, "inventarioProyecto.service -> getInventarioProyecto");
    }
}

async function createInventarioProyecto(inventario) {
    try {
        const { proyecto , inventarios} = inventario;
        
        const inventarioFound = await InventarioProyecto.findOne({ proyecto: inventario.proyecto });
        if (inventarioFound) return [null, "El inventario de proyecto ya existe"];

        const newInventario = new InventarioProyecto({
            proyecto,
            inventarios,
        });
        await newInventario.save();
        
        return [newInventario, null];
    }catch (error) {
        handleError(error, "inventarioProyecto.service -> createInventarioProyecto");
    }   
}

async function getInventarioProyectoById(id) { 
    try {
        const inventarios = await InventarioProyecto.findById(id)
            .populate("proyecto")
            .populate("inventarios.inventario")
            .exec();
        if (!inventarios) return [null, "El inventarios de proyecto no existe"];

        return [inventarios, null];
    } catch (error) {
        handleError(error, "inventarioProyecto.service -> getInventarioProyectoById");
    }

}

async function updateInventarioProyecto(id, inventario) { 
    try {
        const inventarioFound = await InventarioProyecto.findById(id)
            .exec();
        if (!inventarioFound) return [null, "La publicacion no existe"];

        const { proyecto , inventarios} = inventario;

        const inventarioUpdated = await InventarioProyecto.findByIdAndUpdate(
            id,
            {
                proyecto,
                inventarios,
            },
            { new: true },
        );

        return [inventarioUpdated, null];
    } catch (error) {
        handleError(error, "inventarioProyecto.service -> updatePublicacionForo");
    }
}

async function deleteInventarioProyecto(id) {
    try {
        const inventarioFound = await InventarioProyecto.findById(id);
        if (!inventarioFound) return [null, "La publicacion no existe"];

        return await InventarioProyecto.findByIdAndDelete(id);
    } catch (error) {
        handleError(error, "inventarioProyecto.service -> deleteInventarioProyecto");
    }
}

async function getInventarioProyectoByProyecto(id) {
    try {
        const inventarios = await InventarioProyecto.findOne({ proyecto: id })
            .populate("proyecto")
            .populate({
                path: "inventarios.inventario",
                populate: [
                    { path: "almacen" },
                    { path: "material" }
                ]
            })
            .exec();
        if (!inventarios) return [null, "El inventarios de proyecto no existe"];

        return [inventarios, null];
    }
    catch (error) {
        handleError(error, "inventarioProyecto.service -> getInventarioProyectoByProyecto");
    }
}

async function addCantidadToInventarioProyecto(id, cantidad) {
    try {
        const inventarioFound = await InventarioProyecto.findById(id)
            .exec();
        if (!inventarioFound) return [null, "El inventario no existe"];

        const inventarioUpdated = await InventarioProyecto.findByIdAndUpdate(
            id,
            {
                $push: { inventarios: cantidad }
            },
            { new: true },
        );

        return [inventarioUpdated, null];
    }
    catch (error) {
        handleError(error, "inventarioProyecto.service -> addCantidadToInventarioProyecto");
    }
}


module.exports = {
    getInventarioProyecto,
    createInventarioProyecto,
    getInventarioProyectoById,
    updateInventarioProyecto,
    deleteInventarioProyecto,
    getInventarioProyectoByProyecto,
    addCantidadToInventarioProyecto
};
