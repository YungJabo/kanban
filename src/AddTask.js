export function addTask(tasks, newTask){
    const updateTasks = [...tasks, newTask];
    return updateTasks;
}