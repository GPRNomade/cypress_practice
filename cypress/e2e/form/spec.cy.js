describe("template spec", { testIsolation: false }, () => {
  it("passes", () => {
    cy.visit("https://demoqa.com");
  });
  it("got to other page", () => {
    cy.get("h5").contains("Elements").click();
  });
});
