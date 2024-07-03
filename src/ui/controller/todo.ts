async function get() {
    return fetch("/api/todos").then(async (todosResponse) => {
        const todosServerString = await todosResponse.text();
        const todosServer = JSON.parse(todosServerString).todos;
        return todosServer;
    });
}

export const todoController = {
    get,
};
