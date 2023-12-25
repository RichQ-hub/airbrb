import dayjs from 'dayjs';

const user1 = {
  email: 'test@gmail.com',
  name: 'test',
  password: '123'
}

const user2 = {
  email: 'test2@gmail.com',
  name: 'test2',
  password: '123'
}

const today = dayjs();
const tomorrow = today.add(1, 'day');

context('path of a user responding to a booking request', () => {
  before('registers a new account beforehand for testing booking request', () => {
    cy.visit('localhost:3000/')
    cy.get('button[name=login]')
      .click()
    cy.get('a[id=register-link]')
      .click()
    cy.url().should('include', 'localhost:3000/auth/register')
    cy.get('input[id=email]')
      .focus()
      .type(user1.email)
    cy.get('input[id=name]')
      .focus()
      .type(user1.name)
    cy.get('input[id=password]')
      .focus()
      .type(user1.password)
    cy.get('input[id=confirmPassword]')
      .focus()
      .type(user1.password)
    cy.get('button[type=submit]')
      .click()
    cy.get('button[name=logout]')
      .click()
  })

  it('registers a new account', () => {
    cy.visit('localhost:3000/')
    cy.get('button[name=login]')
      .click()
    cy.get('a[id=register-link]')
      .click()
    cy.url().should('include', 'localhost:3000/auth/register')
    cy.get('input[id=email]')
      .focus()
      .type(user2.email)
    cy.get('input[id=name]')
      .focus()
      .type(user2.name)
    cy.get('input[id=password]')
      .focus()
      .type(user2.password)
    cy.get('input[id=confirmPassword]')
      .focus()
      .type(user2.password)
    cy.get('button[type=submit]')
      .click()
  })

  it('clicks create new listing on hosted listing page', () => {
    cy.get('nav > ul > li:nth-child(2) > a')
      .should('have.attr', 'href', '/listings/hosted')
      .click();
    cy.get('section > div > a')
      .should('have.attr', 'href', '/listings/hosted/create')
      .click()
    cy.get('input[placeholder="Wayne Manor"]')
      .focus()
      .type('new listing')
    cy.get('input[id="thumbnail-input"]')
      .selectFile('src/assets/images/house1.png', { force: true });
    cy.get('input[placeholder="Apartment"]')
      .focus()
      .type('apartment')
    cy.get('input[placeholder="299.99"]')
      .focus()
      .type('200')
    cy.get('input[placeholder="Street"]')
      .focus()
      .type('9 Willis Street')
    cy.get('input[placeholder="City"]')
      .focus()
      .type('Kingsford')
    cy.get('input[placeholder="Postcode"]')
      .focus()
      .type('2023')
    cy.get('input[placeholder="Country"]')
      .focus()
      .type('Australia')
    cy.get('input[placeholder="1"]')
      .focus()
      .type('1')
    cy.get('button')
      .contains('Create New Listing')
      .click()
    cy.wait(3000)
    // checks if the new created listing appears in the hosted listing page
    cy.get('h2').then((title) => {
      expect(title.text()).to.contain('1 Listings Found', 'new listing');
    })
  })

  it('edits thumbnail and title', () => {
    cy.get('.hosted-listing-card__edit-btn')
      .click()
    cy.get('input[value="new listing"]')
      .clear()
      .focus()
      .type('edited title')
    cy.get('input[id="thumbnail-input"]')
      .selectFile('src/assets/images/house2.jpg', { force: true })
    cy.get('button')
      .contains('Update Listing')
      .click()
    cy.wait(3000)
    // checks if the title of the listing is updated
    cy.get('h2').then((title) => {
      expect(title.text()).to.contain('1 Listings Found', 'edited title');
    })
  })

  it('publish a listing successfully', () => {
    cy.get('button')
      .contains('Go Live')
      .click()
    cy.get('button')
      .contains('Add Date Range')
      .click()
    cy.get('button')
      .contains('Publish Listing')
      .click()
    // visits public listing page and checks if the published listing is shown
    cy.visit('localhost:3000/')
    cy.wait(3000)
    cy.get('h2').then((title) => {
      expect(title.text()).to.contain('edited title');
    })
  })

  it('unpublish a listing successfully', () => {
    cy.get('nav > ul > li:nth-child(2) > a')
      .should('have.attr', 'href', '/listings/hosted')
      .click();
    cy.wait(3000)
    cy.get('button')
      .contains('End Live')
      .click()
    cy.wait(1000)
    // visits public listing page and checks if the published listing is shown
    cy.visit('localhost:3000/')
    cy.wait(3000)
    cy.get('h3').then((title) => {
      expect(title.text()).to.contain('No Listings Found');
    })
  })

  it('make a booking successfully', () => {
    // publish the listing again so that other user can send in a booking request
    cy.get('nav > ul > li:nth-child(2) > a')
      .should('have.attr', 'href', '/listings/hosted')
      .click();
    cy.wait(3000)
    cy.get('button')
      .contains('Go Live')
      .click()
    cy.get('button')
      .contains('Add Date Range')
      .click()
    cy.get('button')
      .contains('Publish Listing')
      .click()
    // log out of the current user (user 2) account and make a booking with user 1's account
    cy.get('button[name=logout]')
      .click()
    cy.get('button[name=login]')
      .click()
    cy.get('input[id=email]')
      .focus()
      .type(user1.email)
    cy.get('input[id=password]')
      .focus()
      .type(user1.password)
    cy.get('button[type=submit]')
      .click()
    cy.url().should('include', 'localhost:3000/')

    // clicks on the listing card
    cy.get('.published-listing-card')
      .click()
    cy.get('button')
      .contains('Reserve')
  })

  it('logs out successfully', () => {
    cy.get('button[name=logout]')
      .click()
    cy.url().should('include', 'localhost:3000/')
  })

  it('logs in successfully', () => {
    cy.get('button[name=login]')
      .click()
    cy.get('input[id=email]')
      .focus()
      .type(user1.email)
    cy.get('input[id=password]')
      .focus()
      .type(user1.password)
    cy.get('button[type=submit]')
      .click()
    cy.url().should('include', 'localhost:3000/')
  })
})
