<reference types="Cypress" />
import selector from "./commands"

describe('Home Assignment', () => {
  beforeEach(() => {
    cy.visit('https://todomvc.com/examples/react/dist/#/')
  })

  it('Adding a new todo item.', () => {
    cy.createTodos(['I want to eat'])
    cy.get(selector.itemLabel).should('have.length', 1)
  })

  it('Completing a todo item.', () => {
    cy.createTodos(['I want to eat'])
    cy.completeTodos()
    cy.get('.completed').should('have.length', 1)
  })

  it('Editing a todo item', () => {
    cy.createTodos(['I want to eat'])
    cy.get(selector.itemLabel).dblclick()
    cy.get(selector.todoInput).eq(1).clear().type('niv').type('{enter}')
    cy.contains('niv').should('exist');    
  })

  it('Deleting a todo item.', () => {
    cy.createTodos(['I want to eat'])
    cy.get(selector.cancelButton).click({ force: true })
    cy.contains(selector.todoItem, 'I want to eat').should('not.exist');
  })

  it('Marking all todo items as completed', () => {
    cy.createTodos(['I want to eat', 'I want to run', 'I want to go to sleep'])
    cy.get(selector.selectAll).click()
    cy.contains('0 items left!').should('exist');
  })

  it('Clearing all completed todo items', () => {
    cy.createTodos(['I want to eat', 'I want to run', 'I want to go to sleep'])
    cy.get(selector.selectAll).click()
    cy.get(selector.clearCompleted).click();
    cy.get(selector.todoItem).should('have.length' , 0);
  })


  it('Filtering todo items by status', () => {
    const todoList = ['I want to eat', 'I want to run', 'I want to go to sleep', 'i want to be happy', 'i want to be rich']
    cy.createTodos(todoList)

    cy.get(selector.todoItem).should('have.length', todoList.length)

    cy.get(selector.checkbox).eq(1).click()
    cy.get(selector.checkbox).eq(3).click()
    cy.get('.completed').should('have.length', 2)

    cy.get('[href="#/active"]').click({ force: true });
    cy.get('.toggle').should('not.be.checked');

    cy.get('[href="#/completed"]').click({ force: true });
    cy.get('.toggle').should('be.checked');
  })

  it('Marking all todo items as completed', () => {
    cy.createTodos(['I want to eat', 'I want to run', 'I want to go to sleep'])
    cy.get(selector.selectAll).click()
    cy.contains('0 items left!').should('exist')
  })

  it('Deleting a todo item using the keyboard', () => {
    cy.createTodos(['I want to eat', 'I want to run', 'I want to go to sleep', 'i want to be happy', 'i want to be rich'])
    cy.deleteTodoByKeyboard(3)
    cy.get(selector.todoItem).should('have.length', 4)
  })

  it('Toggling the completion status of a todo item using the keyboard', () => {
    cy.createTodos(['I want to eat', 'I want to run', 'I want to go to sleep', 'i want to be happy', 'i want to be rich'])
    cy.get(selector.checkbox).each((checkbox, index) => {
      if (index === 1 || index === 3) {
        cy.get(checkbox).type('{space}', { parseSpecialCharSequences: false });
      }
    })
  })
})
