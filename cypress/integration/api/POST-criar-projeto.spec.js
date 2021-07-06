/// <reference types="cypress" />

const faker = require('faker');

describe('criar um novo projeto',() => {
    let fakerName = null;
    let fakerEmail = null;
    let userCreated = null;

    beforeEach(() => {
        fakerName = faker.internet.userName();
        fakerEmail = faker.internet.email();

        cy.api({
            method: 'POST',
            url: `${Cypress.env('api')}auth/register` ,
            body: {
                name: fakerName,
                email: fakerEmail,
                password: 'senhateste123'
            },
        }).then( ({ body }) => {
            userCreated = body;
        })
    })

    it('com sucesso', () => {
        cy.api({
            method: 'POST',
            url: `${Cypress.env('api')}auth/projects` ,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + userCreated.token
            },
            body: {
                title: "Projeto teste",
                description: "Descrição do projeto teste para validar que está funcionando a api", 
                tasks: [
                  {
                    name: "Tarefa teste do projeto teste",
                    assignedTo: userCreated.user._id
                  }
                ]
              },
        }).then(res => {
            expect(res.status).to.be.equal(200);
            expect(res.body.project.tasks.name).to.be.equal('Tarefa teste do projeto teste');
            expect(res.body.project.title).to.be.equal('Projeto teste');
            expect(res.body.token).to.not.be.null;
        })
    })
});