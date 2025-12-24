let tasks = [
  { id: 1, title: "Learn React", status: "Pending" },
  { id: 2, title: "Build Dashboard", status: "Completed" }
];

export const fetchTasks = () =>
  new Promise(resolve => setTimeout(() => resolve(tasks), 300));

export const addTaskAPI = task =>
  new Promise(resolve => {
    tasks.unshift(task);
    resolve(task);
  });

export const updateTaskAPI = updated =>
  new Promise(resolve => {
    tasks = tasks.map(t => (t.id === updated.id ? updated : t));
    resolve(updated);
  });

export const deleteTaskAPI = id =>
  new Promise(resolve => {
    tasks = tasks.filter(t => t.id !== id);
    resolve(id);
  });