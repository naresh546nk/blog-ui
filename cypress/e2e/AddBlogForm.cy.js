const home = 'http://localhost:3000';
const article = "A visit to a historical place is always an exciting experience.It is a fascinating adventure.I had one such experience during the last summer vacations, when I visited Bhopal.With my family, I reached Bhopal by train.After some rest, we undertook a visit to Bhopal.Bhopal is a historical city.We visited the Sanchi Stupa first.The 'Sanchi Stupa' is located about 46 km away from Bhopal in a small place called Sanchi.Sanchi is a small village in Raisen District of the state of Madhya Pradesh, India.It is a religious place with historical and archaeological significance.It is the location of several Buddhist monuments.The place is famous for the Stupas(brick mounds) which were built on the top of a hill.The Great Stupa at Sanchi is the oldest stone structure in India.It was originally commissioned by the emperor Ashoka the Great.It has four profusely carved ornamental gateways and a balustrade encircling the whole structure.By noon, we had completed the tour of Sanchi Stupa and returned back.I enjoyed my trip to the Sanchi Stupa very much.It was really an unforgettable experience which apart from being intellectually rewarding gave us a glimpse of our country's proud history.I enjoyed my trip to the Sanchi Stupa very much.It was really an unforgettable experience which apart from being intellectually rewarding gave us a glimpse of our country's proud history."
const authorName = "Naresh Kumar";
const blogName = "Blog name with 20 character";
const category = "Test Category with 20 character"
describe("Adding Blogs ", () => {
    it("blog will be added valited and deleted", () => {
        cy.visit(home)
        cy.findByRole('textbox', { name: /email/i }).type("nareshkumar546.nk@gmail.com")
        cy.findByLabelText(/password/i).type("Naresh@123")
        cy.findByRole('button', { name: /login/i }).click()
        cy.wait(10000)


        cy.get('.d-flex > :nth-child(3) > span').click();
        cy.wait(2000)
        //validating count 
        cy.get('.d-flex > :nth-child(1) > span').invoke('text').then((beforUpdate) => {
            //--Start Add Blogs-----
            cy.get('[href="/new-post"]').click();
            cy.get('#authorName').type(authorName)
            cy.get('#blogName').type(blogName)
            cy.get('#category').type(category)
            cy.get('#article').type(article)
            cy.get('.justify-article-end > .d-flex').should('not.be.disabled');
            cy.get('.justify-article-end > .d-flex').should('be.visible');
            //-- Wait 1s to to enable button ----
            cy.wait(1000)
            cy.get('.justify-article-end > .d-flex').click(); //saving blogs

            //--- wait 5s to sync all the system.
            cy.wait(5000)
            //---End Add Blogs----

            cy.get('.d-flex > :nth-child(3) > span').click();
            cy.wait(2000)
            cy.get('.d-flex > :nth-child(1) > span').invoke('text').then((afterUpdate) => {
                cy.log(afterUpdate)
                expect(Number(afterUpdate)).to.equal(Number(beforUpdate) + 1)
            })

        })
        //vlidating count end 
        cy.get('.d-flex > :nth-child(1) > span').invoke('text').then(parseFloat).should('be.gte', 1)
        cy.get('.d-flex > :nth-child(2) > span').invoke('text').then(parseFloat).should('be.gte', 1)
        cy.get('.d-flex > :nth-child(3) > span').invoke('text').then(parseFloat).should('be.gte', 1)
        cy.findByRole('button', { name: /all blogs/i }).click();
        cy.get('.d-flex > :nth-child(1) > span').click();

        cy.get(':nth-child(1) > .text-decoration-none > .boxShadow > .card-body > .card-text').click();

        //Deleting blog
        cy.wait(2000)
        cy.get('.button > .ms-1').click();

        //Logout
        cy.wait(1000)
        cy.findByRole('link', { name: /logout/i }).click()

    })
})