it("should work", () => {
	cy.visit('/')
	cy.get('#name')
		.should('be.focused')
		.type('Dan')
	cy.get('.onwards').click()

	cy.url().should('include', '/you')
	cy.contains('Alright Dan, when can you do?')
	cy.get('.onwards').click()

	cy.url().should('include', '/everyone')
	cy.contains("Here's everyone's availability, choose a date!")
	cy.get('.pisshead').should('have.text', 'Dan')
	cy.get('.streaming-status').should('have.text', "Started live-streaming")
	cy.task('updatePissup', {
		pissheads: {
			'fakeId': {
				name: 'Max'
			}
		}
	})
	cy.get('.pisshead').should('have.text', 'Max')
	cy.get('.onwards').click()

	cy.url().should('include', '/decision')
	cy.contains("You're getting pissed on")
})
