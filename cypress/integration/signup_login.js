/// <reference types="cypress"/>

describe('Sign Up', () => {

    randomString =(Math.random() + 1).toString(36).substring(7)
    let username = randomString;
    let email = randomString+'@gmail.com'
    let password = 'Admin123'

    it('Test validation sign up', () => {

        cy.server()
        cy.route('POST', '**/users').as('newUsers')

        cy.visit('http://localhost:4200/')
        cy.get('.nav-link').contains('Sign up').click()
        cy.get("[placeholder='Username']").type(username)
        cy.get("[placeholder='Email']").type(email)
        cy.get("[placeholder='Password']").type(password)
        cy.get('.btn-lg').click()

        cy.wait('@newUsers').then((xhr) => {
            expect(xhr.status).to.eq(200)
            expect(xhr.requestBody.user.email).to.eq(email)
        })
    })

    it('Mocking tags', () => {
        cy.server()
        cy.route('GET', '**/tags', 'fixture:popularTags.json')

        cy.visit('http://localhost:4200/')
        cy.get('.nav-link').contains('Sign in').click()
        cy.get("[placeholder='Email']").type(email)
        cy.get("[placeholder='Password']").type(password)
        cy.get('.btn-lg').click()

        cy.get('.tag-list').should('contain','cypress').and('contain','json')
    })

    it('Mocking Your Feed', () => {
        cy.server()
        cy.route('GET', '**/articles/feed*', 'fixture:yourFeed.json')
        cy.route('GET', '**/tags', 'fixture:popularTags.json')


        cy.visit('http://localhost:4200/')
        cy.get('.nav-link').contains('Sign in').click()
        cy.get("[placeholder='Email']").type(email)
        cy.get("[placeholder='Password']").type(password)
        cy.get('.btn-lg').click()

    })
})