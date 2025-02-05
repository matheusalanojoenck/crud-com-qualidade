const BASE_URL = "http://localhost:3000";

describe("/ - Todos Feed", () => {
    it("when load, renders the page", () => {
        cy.visit(BASE_URL);
    });

    it("when create a new todo, it must appears in the screen", () => {
        // 0 - Interceptações/Interceptação
        cy.intercept("POST", `${BASE_URL}/api/todos`, (request) => {
            request.reply({
                statusCode: 201,
                body: {
                    todo: {
                        id: "70905d7e-c969-45b1-99f0-1aa155477204",
                        date: "2023-04-15T19:46:51.109Z",
                        content: "Test todo",
                        done: false,
                    },
                },
            });
        }).as("createTodo");

        // 1 - Abrir a página
        cy.visit(BASE_URL);
        // 2 - Selecionar o input de criar nova todo
        // 3 - Digitar no input de criar nova todo
        cy.get("input[name='add-todo']").type("Test todo");
        // 4 - Clicar no botão
        cy.get("[aria-label='Adicionar novo item']").click();
        // 5 - Checar se na página surgiu um novo elemento
        cy.get("tbody").contains("Test todo");
    });
});
