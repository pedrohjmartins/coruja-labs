/// <reference types="cypress" />

const faker = require('faker');

describe('registrar novo usuário',() => {
    let fakerName = null;
    let fakerEmail = null;
    let fakerPassword = null;

    it('com sucesso', () => {
        fakerName = faker.internet.userName();
        fakerEmail = faker.internet.email();
        fakerPassword = faker.internet.password();
        cy.api({
            method: 'POST',
            url: `${Cypress.env('api')}auth/register` ,
            body: {
                name: fakerName,
                email: fakerEmail,
                password: fakerPassword
            },
        }).then(res => {
            expect(res.status).to.be.equal(200);
            expect(res.body.user[0]).to.not.be.null;
            expect(res.status.user.name).to.be.equal(fakerName);
            expect(res.status.user.email).to.be.equal(fakerEmail);
            expect(res.body.token).to.not.be.null;
        })
    })

    it('sem informar email', () => {
        fakerName = faker.internet.userName();
        fakerPassword = faker.internet.password();
        cy.api({
            method: 'POST',
            url: `${Cypress.env('api')}auth/register` ,
            body: {
                name: fakerName,
                email: '',
                password: fakerPassword
            },
        }).then(res => {
            expect(res.status).to.be.equal(405);
            expect(res.body.message).to.be.equal('Email obrigatório');
        })
    })

    it('sem informar nome', () => {
        fakerEmail = faker.internet.email();
        fakerPassword = faker.internet.password();
        cy.api({
            method: 'POST',
            url: `${Cypress.env('api')}auth/register` ,
            body: {
                name: '',
                email: fakerEmail,
                password: fakerPassword
            },
        }).then(res => {
            expect(res.status).to.be.equal(405);
            expect(res.body.message).to.be.equal('Nome obrigatório');
        })
    })

    it('sem informar senha', () => {
        fakerName = faker.internet.userName();
        fakerEmail = faker.internet.email();
        cy.api({
            method: 'POST',
            url: `${Cypress.env('api')}auth/register` ,
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