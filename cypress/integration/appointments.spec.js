describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should book an interview", () => {
    cy.visit("/");
    cy.contains("Monday")

    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");
  });

  cy.get("[alt='Sylvia Palmer']")
    .click();

  cy.contains("Save").click();

  cy.request("GET", "/api/debug/reset")

  cy.contains(".appointment__card--show", "Lydia Miller-Jones");
  cy.contains(".appointment__card--show", "Sylvia Palmer");

});