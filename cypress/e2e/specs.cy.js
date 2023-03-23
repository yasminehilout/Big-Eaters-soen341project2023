import Chance from 'chance';
const chance = new Chance();

describe('JobBrowsing', () => {
    const email = chance.email();
    const password = chance.string({ length: 8 });

    //redirect user back to homepage after each test
    beforeEach(()=> {
        cy.visit('http://localhost:3000');
    })

    it('has a title', () => {
        cy.contains('include', 'JobBrowsing');
    });

});
