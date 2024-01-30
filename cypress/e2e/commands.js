
const selector = {
    textInput: '[data-testid="text-input"]',
    checkbox: '[data-testid="todo-item-toggle"]',
    selectAll: '[data-testid="toggle-all"]',
    todoItem: '[data-testid="todo-item"]',
    cancelButton: '[data-testid="todo-item-button"]',
    itemLabel: '[data-testid="todo-item-label"]',
    clearCompleted: '.clear-completed',
    todoInput: '[id="todo-input"]',
    todoList: '[data-testid="todo-list"]',
  };
  
  Cypress.Commands.add('createTodos', (todoList) => {
    todoList.forEach((val) => {
      cy.get(selector.textInput).type(val + '{enter}');
    });
  });
  
  Cypress.Commands.add('completeTodos', () => {
    cy.get(selector.checkbox).each((checkbox) => {
      cy.get(checkbox).click();
    });
  });
  
  Cypress.Commands.add('deleteTodoByKeyboard', (index) => {
    cy.get(selector.cancelButton).eq(index).type('{enter}', { force: true });
  });
    
  export default selector;
  