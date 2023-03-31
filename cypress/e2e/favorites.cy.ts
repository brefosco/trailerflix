export {};

it("should log in, select media, mark it as favorite and check if it is in the correct row", () => {
  cy.visit(Cypress.env("base_url"));

  // Go to login
  cy.get("[data-cy='header-login']").click();

  // Check if it's in Login screen
  cy.url().should("include", "/login");

  // Fill login form
  cy.get("input[name='username']").type(Cypress.env("username"));
  cy.get("input[name='password']").type(Cypress.env("password"));

  cy.get("form").get("[data-cy='login-submit']").click();

  cy.get("[data-cy='media-row']")
    .children("img")
    // Select second result from first loaded media row
    .eq(2)
    .then((img) => {
      img.trigger("click");
    });

  cy.get("[data-cy='media-title']")
    .invoke("text")
    .then((mediaTitle) => {
      cy.contains("favorit").click();

      // Navigate back to Watch screen
      cy.get("[data-cy='header-home']").click();

      // Check if movie is in favorites row
      cy.get("[data-cy='Películas Favoritas']")
        .children("div")
        .children("img")
        .should("have.attr", "alt", mediaTitle);
    });
});
