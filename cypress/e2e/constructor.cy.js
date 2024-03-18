describe('drag ingredients', () => {
    beforeEach(() => {
        cy.intercept('GET', 'ingredients', {fixture: 'ingredients'})
        cy.visit('http://localhost:3000');
    });

    it('should bun drag to constructor correctly', () => {
        cy.get('[data-cy="bun-top-constructor-block"] [data-cy="constructor-placeholder"]').should('exist');
        cy.get('[data-cy="bun-top-constructor-block"] .constructor-element').should('not.exist');

        const dataTransfer = new DataTransfer();
        cy.get('[data-cy="buns-block"] ul li')
            .first()
            .trigger('dragstart', {
                dataTransfer
            });
        cy.get('[data-cy="drop-container"]').trigger('drop', {
            dataTransfer
        });

        cy.get('[data-cy="bun-top-constructor-block"] [data-cy="constructor-placeholder"]').should('not.exist');
        cy.get('[data-cy="bun-top-constructor-block"] .constructor-element').should('exist');
    })

    it('should not-bun-ingredient drag to constructor correctly', () => {
        cy.get('[data-cy="ingredient-constructor-placeholder"]').should('exist');
        cy.get('[data-cy="ingredient-constructor-list"]').should('not.exist');

        const dataTransferIngredient = new DataTransfer();
        cy.get('[data-cy="sauces-block"] ul li')
            .first()
            .trigger('dragstart', {
                dataTransferIngredient
            });
        cy.get('[data-cy="drop-container"]').trigger('drop', {
            dataTransferIngredient
        });

        cy.get('[data-cy="ingredient-constructor-placeholder"]').should('not.exist');
        cy.get('[data-cy="ingredient-constructor-list"]').should('exist');
    })
})

describe('ingredients info modal', () => {
    beforeEach(() => {
        cy.intercept('GET', 'ingredients', {fixture: 'ingredients'})
        cy.visit('http://localhost:3000');
        cy.get('[data-cy="buns-block"] ul li').first().click();
    });

    it('modal should open correctly', () => {
        cy.get('[data-cy="modal"] h3').contains('Детали ингредиента').should('exist');
    })

    it('modal should display ingredients info correctly', () => {
        cy.get('[data-cy="ingredient-details"]').should('exist');

        cy.get('[data-cy="ingredient-name"]').contains('Краторная булка N-200i').should('exist');
        cy.get('[data-cy="ingredient-calories"]').contains('420').should('exist');
        cy.get('[data-cy="ingredient-proteins"]').contains('80').should('exist');
        cy.get('[data-cy="ingredient-fat"]').contains('24').should('exist');
        cy.get('[data-cy="ingredient-carbohydrates"]').contains('53').should('exist');
    })

    it('modal should close correctly by clicking close button', () => {
        cy.get('[data-cy="modal"]').should('exist');

        cy.get('[data-cy="modal-close-button" ]').click();

        cy.get('[data-cy="modal"]').should('not.exist');

    })

    it('modal should close correctly by press esc key', () => {
        cy.get('[data-cy="modal"]').should('exist');

        cy.get('body').type('{esc}');

        cy.get('[data-cy="modal"]').should('not.exist');
    })

    it('modal should close correctly by click on modal overlay out of modal container', () => {
        cy.get('[data-cy="modal"]').should('exist');

        cy.get('[data-cy="modal-overlay"]').click('center');
        cy.get('[data-cy="modal"]').should('exist');

        cy.get('[data-cy="modal-container"]').click();
        cy.get('[data-cy="modal"]').should('exist');

        cy.get('[data-cy="modal-overlay"]').click('left');
        cy.get('[data-cy="modal"]').should('not.exist');
    })
})
