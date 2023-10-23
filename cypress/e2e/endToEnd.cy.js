const home = 'http://localhost:3000';
describe('Login and adding new blogs and then view', () => {
  it('passes', () => {
    cy.visit(home)
    cy.findByRole('textbox', { name: /email/i }).type("nareshkumar546.nk@gmail.com")
    cy.findByLabelText(/password/i).type("Naresh@123")
    cy.findByRole('button', { name: /login/i }).click()

    cy.findAllByText(/motivation/i).first().click();
    cy.go(-1);
    cy.findByRole('button', { name: /you blogs/i }).its('length').should('be.gte', 1)
    cy.findByRole('button', { name: /other blogs/i }).its('length').should('be.gte', 1)
    cy.findByRole('button', { name: /all blogs/i }).its('length').should('be.gte', 1)
    cy.findByRole('link', { name: /new blog/i }).click()

    cy.findByRole('textbox', { name: /author :/i }).type("Test Author")
    cy.findByRole('textbox', { name: /blog name :/i }).type("Test Blog name with at least 20 character")
    cy.findByRole('textbox', { name: /category :/i }).type("Test Category")

    cy.findByRole('textbox', { name: /article/i }).type("A visit to a historical place is always an exciting experience. It is a fascinating adventure. I had one such experience during the last summer vacations, when I visited Bhopal.With my family, I reached Bhopal by train.After some rest, we undertook a visit to Bhopal.Bhopal is a historical city.We visited the Sanchi Stupa first.The 'Sanchi Stupa' is located about 46 km away from Bhopal in a small place called Sanchi.Sanchi is a small village in Raisen District of the state of Madhya Pradesh, India.It is a religious place with historical and archaeological significance.It is the location of several Buddhist monuments.The place is famous for the Stupas(brick mounds) which were built on the top of a hill.The Great Stupa at Sanchi is the oldest stone structure in India.It was originally commissioned by the emperor Ashoka the Great.It has four profusely carved ornamental gateways and a balustrade encircling the whole structure.By noon, we had completed the tour of Sanchi Stupa and returned back.I enjoyed my trip to the Sanchi Stupa very much.It was really an unforgettable experience which apart from being intellectually rewarding gave us a glimpse of our country's proud history.I enjoyed my trip to the Sanchi Stupa very much.It was really an unforgettable experience which apart from being intellectually rewarding gave us a glimpse of our country's proud history.")

    cy.findByText(/add new blog/i).should('not.be.disabled');
    cy.findByText(/add new blog/i).click();

    // cy.findByRole('combobox', { name: /search/i }).type('Test Category')

    // cy.findByRole('button', { name: /search/i }).click()


    // cy.findByText(/delete/i).should('not.be.disabled');

    // cy.findByText(/delete/i).click()

    // cy.findByText(/logout/i).click()



  })

})