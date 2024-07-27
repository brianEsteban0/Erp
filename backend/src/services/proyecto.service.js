"use strict";

const Proyectos = require("../models/proyecto.model");

const {handleError} = require("../utils/errorHandler");

/**
 * 
 *@returns 
 */

async function getProyectos(){
    try{
        const proyectos = await Proyectos.find().exec();
        if(!proyectos) return [null, "No hay publicaciones"];

        return [proyectos, null];

    } catch (error){
        handleError(error, "proyecto.service -> getProyectos");
    }
}

/**
 * 
 * 
 * 
 */

async function createProyecto(proyectos) {
    try {//
        const {titulo, descripcion, empresa_licitante, fecha_inicio, fecha_termino, presupuesto, actividades} = proyectos;
        const proyectoFound = await Proyectos.findOne({titulo: proyectos.titulo})
        if (proyectoFound) return [null, "La publicacion ya existe"];

        const newProyecto = new Proyectos({
            titulo,
            descripcion,
            empresa_licitante,
            fecha_inicio,
            fecha_termino,
            presupuesto,
            actividades,
        });

        const myProyecto = await newProyecto.save();
        return [myProyecto, null];
    } catch (error) {
        handleError(error, "proyecto.service -> createPublicacion");
    }
}


module.exports = {
    getProyectos,
    createProyecto,
};