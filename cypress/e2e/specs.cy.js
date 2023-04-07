/// <reference types="cypress" />

import Chance from 'chance';
const chance = new Chance();
import "../support/googleAuth.js";
import "../support/index";


describe("Browsing component", () => {
    const email = chance.email();
    const password = chance.string({ length: 8 });

    //redirect user back to homepage after each test
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        //sign in with google
        cy.loginByGoogleApi();
    });

    it("displays the job list", () => {
        cy.get(".job-list")
            .should("have.length.greaterThan", 0)
            .each((job) => {
                cy.wrap(job)
                    .find(".job-title")
                    .should("be.visible")
                    .and("have.text", job.title);
                cy.wrap(job)
                    .find(".job-description")
                    .should("be.visible")
                    .and("have.text", job.description);
                cy.wrap(job)
                    .find(".job-season")
                    .should("be.visible")
                    .and("have.text", job.season);
            });
    });

    it("allows a user to create a new job", () => {
        const jobTitle = "New job title";
        const jobDescription = "New job description";
        const jobSeason = "Fall";
        const jobYearOfStart = "2023";
        cy.get(".j-input").eq(0).type(jobTitle);
        cy.get(".j-input").eq(1).type(jobDescription);
        cy.get("#seasons").select(jobSeason);
        cy.get(".j-input").eq(2).type(jobYearOfStart);
        cy.get(".create-job-btn").click();
        cy.get(".job-list")
            .find(".job-title")
            .last()
            .should("be.visible")
            .and("have.text", jobTitle);
        cy.get(".job-list")
            .find(".job-description")
            .last()
            .should("be.visible")
            .and("have.text", jobDescription);
        cy.get(".job-list")
            .find(".job-season")
            .last()
            .should("be.visible")
            .and("have.text", jobSeason);
    });

    it("allows a user to update a job title", () => {
        const updatedTitle = "Updated job title";
        cy.get(".job-list").find(".job-title").first().click();
        cy.get(".update-job-title-input").type(updatedTitle);
        cy.get(".update-job-title-btn").click();
        cy.get(".job-list")
            .find(".job-title")
            .first()
            .should("be.visible")
            .and("have.text", updatedTitle);
    });

    it("allows a user to update a job season", () => {
        const updatedSeason = "Winter";
        cy.get(".job-list").find(".job-season").first().click();
        cy.get(".update-job-season-select").select(updatedSeason);
        cy.get(".update-job-season-btn").click();
        cy.get(".job-list")
            .find(".job-season")
            .first()
            .should("be.visible")
            .and("have.text", updatedSeason);
    });

    it("allows a user to update a job description", () => {
        const updatedDescription = "Updated job description";
        cy.get(".job-list").find(".job-description").first().click();
        cy.get(".update-job-description-input").type(updatedDescription);
        cy.get(".update-job-description-btn").click();
        cy.get(".job-list")
            .find(".job-description")
            .first()
            .should("be.visible")
            .and("have.text", updatedDescription);
    });

    it("allows a user to delete a job", () => {
        cy.get(".job-list")
            .find(".delete-job-btn")
            .first()
            .click({ force: true });
        cy.get(".delete-job-modal")
            .should("be.visible")
            .find(".confirm-delete-job-btn")
            .click();
        cy.get(".job-list").should("have.length", 2);
    });
});
