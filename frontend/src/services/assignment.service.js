import axios from './root.service';

const API_URL = `${import.meta.env.VITE_BASE_URL}/api/asisgnaciones`;

export const getAvailableParticipants = async () => {
    try {
        const response = await axios.get(`${API_URL}/disponible`);
        return response.data.data;
    } catch (error) {
        console.error("Error en getAvailableParticipants:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const createAssignment = async (data) => {
    try {
        const response = await axios.post(`${API_URL}`, data);
        return response.data;
    } catch (error) {
        console.error("Error en createAssignment:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getAssignments = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data.data;
    } catch (error) {
        console.error("Error en getAssignments:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const removeUserFromProyect = async (assignmentId, userId) => {
    try {
        const response = await axios.delete(`${API_URL}/${assignmentId}/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error en removeUserFromProyect:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const getParticipantsByProyect = async (assignmentId) => {
    try {
        const response = await axios.get(`${API_URL}/${assignmentId}`);
        return response.data.data;
    } catch (error) {
        console.error("Error en getParticipantsByProyect:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const updateParticipantsInProyect = async (assignmentId, data) => {
    try {
        const response = await axios.put(`${API_URL}/${assignmentId}`, data);
        return response.data;
    } catch (error) {
        console.error("Error en updateParticipantsInProyect:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const deleteAssignment = async (assignmentId) => {
    try {
        const response = await axios.delete(`${API_URL}/${assignmentId}`);
        return response.data;
    } catch (error) {
        console.error("Error en deleteAssignment:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const updateAssignmentStatus = async (assignmentId, status) => {
    try {
        const response = await axios.patch(`${API_URL}/${assignmentId}/status`, { status });
        return response.data;
    } catch (error) {
        console.error("Error en updateAssignmentStatus:", error.response ? error.response.data : error.message);
        throw error;
    }
};
