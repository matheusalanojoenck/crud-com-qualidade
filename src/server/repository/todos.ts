import { read } from "@bd-crud-todo";

interface TodoRepositoryGetParams {
    page?: number;
    limit?: number;
}

interface TodoRepositoryGetOutput {
    todos: Todo[];
    total: number;
    pages: number;
}

function get({
    page,
    limit,
}: TodoRepositoryGetParams = {}): TodoRepositoryGetOutput {
    const currentPage = page || 1;
    const curretLimit = limit || 2;
    const ALL_TODOS = read();

    const startIndex = (currentPage - 1) * curretLimit;
    const endIndex = currentPage * curretLimit;
    const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex);
    const totalPages = Math.ceil(ALL_TODOS.length / curretLimit);

    return {
        total: ALL_TODOS.length,
        todos: paginatedTodos,
        pages: totalPages,
    };
}
export const todoRepository = {
    get,
};

interface Todo {
    id: string;
    content: string;
    date: string;
    done: boolean;
}
