const axios = require('axios');
const authData = require('../authData.json');

// Obtener información del usuario
const getUserInfo = async () => {
    try {
        const response = await axios.get('https://www.vanadatahero.com/api/player', {
            headers: {
                'x-telegram-web-app-init-data': authData[0]
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 403 && error.response.data.error === 'Telegram data has expired') {
            console.log('⚠️  Your Telegram data has expired, please change it to continue using the Bot.'.yellow);
        } else {
            console.error('Failed to fetch user info.'.red);
        }
        return null;
    }
};

// Minar puntos
const minePoints = async (points) => {
    try {
        const response = await axios.post('https://www.vanadatahero.com/api/tasks/1', {
            status: 'completed',
            points: points
        }, {
            headers: {
                'x-telegram-web-app-init-data': authData[0],
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 403 && error.response.data.error === 'Telegram data has expired') {
            console.log('⚠️  Your Telegram data has expired, please change it to continue using the Bot.'.yellow);
        } else {
            console.error('Error mining points.'.red);
        }
        return null;
    }
};

// Obtener todas las tareas
const getTasks = async () => {
    try {
        const response = await axios.get('https://www.vanadatahero.com/api/tasks', {
            headers: {
                'x-telegram-web-app-init-data': authData[0]
            }
        });
        return response.data.tasks;
    } catch (error) {
        if (error.response && error.response.status === 403 && error.response.data.error === 'Telegram data has expired') {
            console.log('⚠️  Your Telegram data has expired, please change it to continue using the Bot.'.yellow);
        } else {
            console.error('Error fetching tasks.'.red);
        }
        return [];
    }
};

// Obtener el estado de una tarea específica
const getTaskStatus = async (taskId) => {
    try {
        const response = await axios.get(`https://www.vanadatahero.com/api/tasks/${taskId}`, {
            headers: {
                'x-telegram-web-app-init-data': authData[0]
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 403 && error.response.data.error === 'Telegram data has expired') {
            console.log('⚠️  Your Telegram data has expired, please change it to continue using the Bot.'.yellow);
        } else {
            console.error(`Error fetching task status for Task ${taskId}.`.red);
        }
        return null;
    }
};

// Completar tarea específica
const completeTask = async (taskId, points) => {
    try {
        const response = await axios.post(`https://www.vanadatahero.com/api/tasks/${taskId}`, {
            status: 'completed',
            points: points
        }, {
            headers: {
                'x-telegram-web-app-init-data': authData[0],
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return null;  // Manejar específicamente error 400
        } else if (error.response && error.response.status === 403 && error.response.data.error === 'Telegram data has expired') {
            console.log('⚠️  Your Telegram data has expired, please change it to continue using the Bot.'.yellow);
        } else {
            console.error(`Error completing task ${taskId}.`.red);
        }
        return null;
    }
};

module.exports = {
    getUserInfo,
    minePoints,
    getTasks,
    getTaskStatus,
    completeTask
};

