describe("Test cases for search results", () => {
	let baseUrl = Cypress.env("prodUrl") + Cypress.env("searchURLPath");

	before(() => {
		cy.log("Visit the base URL under test");
		cy.visit(baseUrl)
		.then(() => {
			//Load the fixtures first
			cy.fixture("production/components/searchBar/userSearchQueries.js", (cons) => {
				cy.log("Verify the search text box exists");
				cy.get(cons["selectors"]["textBoxes"]["search"]["main"]);
				cy.log("Verify the search button exists");
				cy.get(cons["selectors"]["buttons"]["search"]["main"]);
			})	
		})
	})

	beforeEach(() => {
		cy.log("Make sure you are always on the search domain");
		cy.url()
		.should("contain", baseUrl);

		//load the fixtures
		cy.fixture("production/components/searchBar/userSearchQueries.js")
		.as("fixture")
		.then(() => {
			//Clear the text field before running the test case
			//Ideally to be put in afterEach
			//In case of case of failing test cases, after each was behaving funny
			//Textbox.clear() was not getting completed
			cy.get("@fixture")
			.then((fixture) => {
				cy.get(fixture["selectors"]["textBoxes"]["search"]["main"])
				.clear();
			})
		})
	})
	
	it("Verify search component returns result for correct keyword", () => {
		cy.get("@fixture").then((fixture) => {
			cy.get(fixture["selectors"]["textBoxes"]["search"]["main"])
			.type(fixture["keywords"]["correct"])
			.then(() => {
				cy.get(fixture["selectors"]["buttons"]["search"]["main"])
				.click()
				.then(() => {
					//Test query text appears in GET request 
					cy.url()
					.should("contain", fixture["queryString"]);
					//Div with id #result_summary_top only appears in DOM if search results are obtained
					cy.get(fixture["selectors"]["divs"]["search"]["summary"])
					.contains(fixture["partialSummaryTxt"]);
				})
			})
		})
	})

	it("Verify search component returns consistent result for same keyword", () => {
		cy.get("@fixture").then((fixture) => {
			cy.get(fixture["selectors"]["textBoxes"]["search"]["main"])
			.type(fixture["keywords"]["correct"])
			.then(() => {
				cy.get(fixture["selectors"]["buttons"]["search"]["main"])
				.click()
				.then(() => {
					cy.get(fixture["selectors"]["divs"]["search"]["summary"]).invoke("text")
					.then(($searchResult1) => {
						//click search button again to query the database
						cy.get(fixture["selectors"]["buttons"]["search"]["main"])
						.click()
						.then(() => {
							cy.get(fixture["selectors"]["divs"]["search"]["summary"]).invoke("text")
							.then(($searchResult2) => {
								expect($searchResult1).to.equal($searchResult2);
							})
						})
					})
				})
			})
		})
	})

	it("Verify search component returns result for partial keyword", () => {
		cy.get("@fixture").then((fixture) => {
			cy.get(fixture["selectors"]["textBoxes"]["search"]["main"])
			.type(fixture["keywords"]["partial"])
			.then(() => {
				cy.get(fixture["selectors"]["buttons"]["search"]["main"])
				.click()
				.then(() => {
					cy.get(fixture["selectors"]["divs"]["search"]["summary"])
					.contains(fixture["partialSummaryTxt"]);
				})
			})
		})
	})

	it("Verify search component returns no result for empty search query and warns the user", () => {
		cy.get("@fixture").then((fixture) => {
			cy.get(fixture["selectors"]["buttons"]["search"]["main"])
			.click()
			.then(() => {
				cy.get(fixture["selectors"]["divs"]["search"]["container"])
				.contains(fixture["errorMsg"]["emptyStringSearch"]);
			})
		})
	})

	it("Verify number of search hits is case insensitive", () => {
		cy.get("@fixture").then((fixture) => {
			cy.get(fixture["selectors"]["textBoxes"]["search"]["main"])
			.type(fixture["keywords"]["camelCase"])
			.then(() => {
				cy.get(fixture["selectors"]["buttons"]["search"]["main"])
				.click()
				.then(() => {
					cy.get(fixture["selectors"]["divs"]["search"]["summary"]).invoke("text")
					.then(($searchResult1) => {
						cy.get(fixture["selectors"]["textBoxes"]["search"]["main"])
						.clear()
						.then(() => {
							cy.get(fixture["selectors"]["textBoxes"]["search"]["main"])
							.type(fixture["keywords"]["randomCase"])
							.then(() => {
								cy.get(fixture["selectors"]["buttons"]["search"]["main"])
								.click()
								.then(() => {
									cy.get(fixture["selectors"]["divs"]["search"]["summary"]).invoke("text")
									.then(($searchResult2) => {
										expect($searchResult1).to.equal($searchResult2);
									})
								})
							})
						}) 
					})	
				})
			})
		})
	})

	it("Verify search component returns result for slightly misspelled query", () => {
		cy.get("@fixture").then((fixture) => {
			cy.get(fixture["selectors"]["textBoxes"]["search"]["main"])
			.type(fixture["keywords"]["misspelled"])
			.then(() => {
				cy.get(fixture["selectors"]["buttons"]["search"]["main"])
				.click()
				.then(() => {
					cy.get(fixture["selectors"]["divs"]["search"]["summary"]);
				})
			})
		})
	})
	
})