/// <reference types="cypress" />

const faker = require('faker');

describe('logar com um usuário',() => {
    let fakerName = null;
    let fakerEmail = null;
    let userCreated = null;

    beforeEach(async () => {
        fakerName = faker.internet.userName();
        fakerEmail = faker.internet.email();

        await cy.api({
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
            url: `${Cypress.env('api')}auth/authenticate` ,
            body: {
                email: userCreated.email,
                password: 'senhateste123'
            },
        }).then(res => {
            expect(res.status).to.be.equal(200);
            expect(res.body.user[0]).to.not.be.null;
            expect(res.status.user.email).to.be.equal(fakerEmail);
            expect(res.body.token).to.not.be.null;
        })
    })

    it('sem informar email', () => {
        cy.api({
            method: 'POST',
            url: `${Cypress.env('api')}auth/authenticate` ,
            body: {
                email: '',
                password: 'senhateste123'
            },
        }).then(res => {
            expect(res.status).to.be.equal(401);
            expect(res.body.message).to.be.equal('Email e senha são obrigatórios');
        })
    })

    it('sem informar senha', () => {
        cy.api({
            method: 'POST',
            url: `${Cypress.env('api')}auth/authenticate` ,
            body: {
                email: userCreated.email,
                password: ''
            },
        }).then(res => {
            expect(res.status).to.be.equal(401);
            expect(res.body.message).to.be.equal('Email e senha são obrigatórios');
        })
    })

    it('sem informar senha', () => {
        cy.api({
            method: 'POST',
            url: `${Cypress.env('api')}auth/authenticate` ,
            body: {
                name: fakerName,
                email: fakerEmail,
                password: ''
            },
        }).then(res => {
            expect(res.status).to.be.equal(405);
            expect(res.body.message).to.be.equal('Senha obrigatório');
        })
    })
});