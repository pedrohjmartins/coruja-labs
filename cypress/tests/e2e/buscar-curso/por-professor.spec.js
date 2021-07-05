/* global Given, Then, When */
/// <reference types="cypress" />

Given("acesso a pagina de  busca por Professores", () => {
    cy.visit('cursos/professor/');
});

When("visitar os cursos da professora {string}", (teacher) => {
    cy.contains(teacher).click();
});

When("selecionar o curso {string}", (course) => {
    cy.contains(course).click();
});

Then("o valor total deve ser R$ {string} reais", (valueTotalExpected) => {
    cy.get('.cur-details-shopping-price').should("contain", valueTotalExpected);
});

Then("o valor parcelado de {string}", (valueFinancedExpected) => {
    cy.get('.cur-details-shopping-installments').should("contain", valueFinancedExpected);
});

When('pesquisar pelo o curso {string}', (course) => {
    cy.get('input[placeholder="Filtrar"]')
    .type(course)
    .type('{enter}');
});

Then('deve exibir {string}', (expectedMessage) => {
    cy.get('#holmes-placeholder').should('contain', expectedMessage);
});

Then('deve exibir o nome da professora {string} no material escrito em PDF e no fórum', (teacher) => {
    cy.get('.cur-links .cur-links-buttons').first().should("contain", teacher);
    cy.get('.cur-links .cur-links-buttons').last().should("contain", teacher);
});
