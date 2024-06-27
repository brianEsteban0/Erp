import axios from './root.service';

export const getAvailableParticipants = async () => {

    try {
        const response = await axios.get('/asignaciones/dispo');
        const { status, data } = response;
        if (status === 200) {
            return data.data;
        }
    }catch (error) {
        console.log(message, "Error en getAvailableParticipants");
    }

};

//No probada en backend, no tiene ruta aun.
export const getProyectos = async () => {

    try {
        const response = await axios.get('/proyectos');
        const { status, data } = response;
        if (status === 200) {
            return data.data;
        }

    }catch (error) {
    console.log(message,"Error en getProyectos");
    }
};

export const createAssignment = async (data) => {

    try {
        const response = await axios.post('/asignaciones', data);
        const { status, data } = response;
        if (status === 201) {
            return data.data;
        }
    }catch (error) {
        console.log(message, "Error en createAssignment");
    }

};
//Revisar funcionamiento
export const removeUserFromProyect = async (id) => {
    
    try {
        const response = await axios.delete('/asignaciones/${id}/${id}', data);
        const { status, data } = response;
        if (status === 200) {
            return data.data;
        }
    }catch (error) {
        console.log(message, "Error en removeUserFromProyect");
    }
    
};

export const getParticipantsByProyect = async (id) => {

    try {
        const response = await axios.get('/asignaciones/${id}');
        const { status, data } = response;
        if (status === 200) {
            return data.data;
        }

    }catch (error) {
        console.log(message, "Error en getParticipantsByProyect");
    }
};

export const updateParticipantsInProyect = async (id, data) => {
    try {
        const response = await axios.put('/asignaciones/${id}', data);
        const { status, data } = response;
        if (status === 200) {
            return data.data;
        }
    }catch (error) {
        console.log(message, "Error en updateParticipantsInProyect");
    }
}

export const getAssignments = async () => {
    try {
        const response = await axios.get('/asignaciones');
        const { status, data } = response;
        if (status === 200) {
            return data.data;
        }
    }catch (error) {
        console.log(message, "Error en getAssignments");
    }
}

export const deleteAssignment = async (id) => {
    try {
        const response = await axios.delete('/asignaciones/${id}');
        const { status, data } = response;
        if (status === 200) {
            return data.data;
        }
    }catch (error) {
        console.log(message, "Error en deleteAssignment");
    }
}