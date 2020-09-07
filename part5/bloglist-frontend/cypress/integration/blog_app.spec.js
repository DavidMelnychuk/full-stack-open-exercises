describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "test user",
      username: "test",
      password: "test",
    };
    cy.request("POST", "http://localhost:3001/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
  });
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("#login-button").click();

      cy.contains("test user logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error").should("contain", "Wrong username or password");
      cy.get("html").should("not.contain", "test user logged in");
    });
  });
  describe.only("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "test", password: "test" });
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();

      cy.get("#title-input").type("my new blog");
      cy.get("#author-input").type("JK Rowling");
      cy.get("#url-input").type("www.google.ca");
      cy.get("#create-button").click();

      cy.contains("my new blog");
    });
  });
});
