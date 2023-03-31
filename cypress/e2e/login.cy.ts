export const user = {
  username: "brefosco",
  password: "UB!khhr@rU6gPW9",
};

describe("Test log in", () => {
  it("Should login, navigate and log out", () => {
    cy.visit(Cypress.env("base_url"));
    // Go to login
    cy.get("[data-cy='header-login']").click();
    // Check if it's in Login screen
    cy.url().should("include", "/login");
    // Fill login form
    cy.get("input[name='username']").type(Cypress.env("username"));
    cy.get("input[name='password']").type(Cypress.env("password"));
    cy.get("form").get("[data-cy='login-submit']").click();
    // cy.wait(1000);
    cy.get("[data-cy='media-row']")
      .children("img")
      // Select first result from first loaded media row
      .first()
      .then((img) => {
        img.trigger("click");
      });
    cy.url().should("include", "/trailer");
    // Log out
    cy.contains("Cerrar sesión").click();

    // Check if back in Welcome screen
    cy.url().should("include", "/welcome");
  });
});
