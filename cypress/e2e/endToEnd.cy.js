const home = 'http://localhost:3000';
const article = "A visit to a historical place is always an exciting experience.It is a fascinating adventure.I had one such experience during the last summer vacations, when I visited Bhopal.With my family, I reached Bhopal by train.After some rest, we undertook a visit to Bhopal.Bhopal is a historical city.We visited the Sanchi Stupa first.The 'Sanchi Stupa' is located about 46 km away from Bhopal in a small place called Sanchi.Sanchi is a small village in Raisen District of the state of Madhya Pradesh, India.It is a religious place with historical and archaeological significance.It is the location of several Buddhist monuments.The place is famous for the Stupas(brick mounds) which were built on the top of a hill.The Great Stupa at Sanchi is the oldest stone structure in India.It was originally commissioned by the emperor Ashoka the Great.It has four profusely carved ornamental gateways and a balustrade encircling the whole structure.By noon, we had completed the tour of Sanchi Stupa and returned back.I enjoyed my trip to the Sanchi Stupa very much.It was really an unforgettable experience which apart from being intellectually rewarding gave us a glimpse of our country's proud history.I enjoyed my trip to the Sanchi Stupa very much.It was really an unforgettable experience which apart from being intellectually rewarding gave us a glimpse of our country's proud history."


describe('Login and adding new blogs and then view', () => {
  it('passes', () => {
    cy.visit(home)

    //Header element checking 
    cy.get('.navbarBrand').should("have.text", "BLOG SITE")
    cy.get('[href="/login"]').should("have.text", "Login")
    cy.get('[href="/register"]').should("have.text", "Register")

    cy.findByRole('textbox', { name: /email/i }).type("nareshkumar546.nk@gmail.com")
    cy.findByLabelText(/password/i).type("Naresh@123")
    cy.findByRole('button', { name: /login/i }).click()
    cy.wait(5000)
    // Once user Logged in 
    cy.get('.d-flex > :nth-child(1) > b').contains("Logged")


    cy.findByRole('button', { name: /you blogs/i }).its('length').should('be.gte', 0)
    cy.findByRole('button', { name: /other blogs/i }).its('length').should('be.gte', 1)
    cy.findByRole('button', { name: /all blogs/i }).its('length').should('be.gte', 1)


    //All Blogs 
    cy.get('.fixed-top > .d-flex > :nth-child(3)').click();
    cy.wait(1000)


    //Validation number of blogs in 
    cy.get('.d-flex > :nth-child(3) > span').invoke('text').then((text1) => {

      cy.get('.d-flex > :nth-child(1) > span').invoke('text').then((text2) => {

        cy.get('.d-flex > :nth-child(2) > span').invoke('text').then((text3) => {
          expect(Number(text1)).to.equal(Number(text2) + Number(text3))
        })
      })
    })

    //search field

    cy.wait(2000)
    cy.get('.me-2').type('Motivation')
    cy.get('[placeholder="From"]').type("2023-05-11")
    cy.get('[placeholder="To"]').type("2023-11-11")
    cy.wait(500)
    cy.get('div.m-2 > .btn').should("not.be.disabled").click();

    //Footer is visible
    cy.get('.col > .text-center').should('have.text', "© Created by Naresh Kumar")

    //Logout
    cy.wait(1000)
    cy.findByRole('link', { name: /logout/i }).click()


  })


})