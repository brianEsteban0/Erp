"use strict";
// Importa el modelo de datos publicacionForo
const Material = require("../models/material.model.js");
const { handleError } = require("../utils/errorHandler");

async function getMaterial() {
    try {
        const materiales = await Material.find()
            .exec();
        if (!materiales) return [null, "No se encontro materiales"];

        return [materiales, null];
    } catch (error) {
        handleError(error, "Material.service -> getMaterial");
    }
}

async function createMaterial(material) {
    try {
        const { nombre, descripcion, tipo, unidad} = material;
        
        const materialFound = await Material.findOne({ nombre: material.nombre });
        if (materialFound) return [null, "El Material ya existe"];

        const newMaterial = new Material({
            nombre,
            descripcion,
            tipo,
            unidad,
        });
        await newMaterial.save();
        
        return [newMaterial, null];
    }catch (error) {
        handleError(error, "Material.service -> createMaterial");
    }   
}

async function getMaterialById(id) { 
    try {
        const material = await Material.findById(id)
            .exec();
        if (!material) return [null, "El Material no existe"];

        return [material, null];
    } catch (error) {
        handleError(error, "Material.service -> getMaterialById");
    }

}

async function updateMaterial(id, material) { 
    try {
        const materialFound = await Material.findById(id)
            .exec();
        if (!materialFound) return [null, "El Material no existe"];

        const materialFounded = await Material.findOne({ nombre: material.nombre });
        if (materialFounded) {
            if (!(materialFounded.descripcion == materialFound.descripcion)) return [null, "El material ya existe"];
            
        }

        const { nombre,descripcion,tipo,unidad} = material;

        const materialUpdated = await Material.findByIdAndUpdate(
            id,
            {
                nombre,
                descripcion,
                tipo,
                unidad,
            },
            { new: true },
        );

        return [materialUpdated, null];
    } catch (error) {
        handleError(error, "Material.service -> updateMaterial");
    }
}

async function deleteMaterial(id) {
    try {
        const materialFound = await Material.findById(id);
        if (!materialFound) return [null, "El material no existe"];

        return await Material.findByIdAndDelete(id);
    } catch (error) {
        handleError(error, "Material.service -> deleteMaterial");
    }
}

module.exports = {
    getMaterial,
    createMaterial,
    getMaterialById,
    updateMaterial,
    deleteMaterial,
};
