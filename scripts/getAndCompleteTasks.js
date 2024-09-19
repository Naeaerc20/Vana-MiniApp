const colors = require('colors');
const { getTasks, completeTask, getTaskStatus, getUserInfo } = require('./apis');

// Función para imprimir el mensaje cuando la tarea no puede completarse automáticamente
const printManualCompletionMessage = async (id, name, points) => {
    console.log(`⚙️  Auto-Completing Task ${id} - ${name} - for ${points} points`.yellow);
    console.log(`⚠️  This task can't be completed automatically. Please do it manually.`.yellow);
    await new Promise(resolve => setTimeout(resolve, 500));  // Pausa de 500 ms
};

const getAndCompleteTasks = async () => {
    console.log('🔍 Verifying Tasks Status...'.magenta);

    // IDs de las tareas que no deben completarse automáticamente
    const ignoredTaskIds = [2, 5, 17];

    // Obtener todas las tareas
    const tasks = await getTasks();

    // Procesar cada tarea
    for (const task of tasks) {
        const { id, name, points, completed } = task;

        // Verificar si la tarea ya está completada
        const isCompleted = completed.some(item => item.status === 'completed');

        // Verificar si la tarea está en la lista de tareas ignoradas
        if (ignoredTaskIds.includes(id)) {
            if (isCompleted) {
                console.log(`🟢 Task ${id} - ${name} is already completed. Skipping.`.cyan);
            } else {
                await printManualCompletionMessage(id, name, points);
            }
            continue;  // Saltar a la siguiente tarea
        }

        // Si la tarea ya está completada, saltar
        if (isCompleted) {
            console.log(`🟢 Task ${id} - ${name} is already completed. Skipping.`.cyan);
            continue;
        }

        // Imprimir el mensaje de intento de completar la tarea solo una vez
        console.log(`⚙️  Auto-Completing Task ${id} - ${name} - for ${points} points`.yellow);

        const result = await completeTask(id, points);

        if (result) {
            // Esperar 500 ms después de la solicitud POST
            await new Promise(resolve => setTimeout(resolve, 500));

            // Verificar el estado actual de la tarea con una solicitud GET
            const updatedTask = await getTaskStatus(id);

            if (updatedTask && updatedTask.completed.some(item => item.status === 'completed')) {
                console.log(`✅ Task ${id} completed & Reward Claimed`.green);
            } else {
                await printManualCompletionMessage(id, name, points);
            }
        } else {
            // Si ocurre un error o la tarea no puede completarse
            await printManualCompletionMessage(id, name, points);
        }
    }

    // Obtener la información del usuario después de completar las tareas
    const userInfo = await getUserInfo();
    if (userInfo) {
        console.log(`🎉 Your points are now ${userInfo.points}`.cyan);
    } else {
        console.log('Failed to fetch user info.'.red);
    }
};

module.exports = getAndCompleteTasks;

