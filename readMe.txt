Objective: 
>> This demo project has been developed to share a code sample with the interviewer for the position of Automation developer. 
>> This demo project uses Cypress as the automation framework.
>> Cypress is a JS end - to - end testing framework. Its built on top of Mocha (a JS unit test library).
>> Main objective is to show case how the developer designs and automates test cases.
>> The topic under test is the "type of search query user can enter in search query field at mathworks.com".
>> Developer came up with following test scenarios (objective of this test suite is not to be comprehensive, it has been designed to cover most important test cases, design and develop a small framework for UI testing):
	User can enter following keywords
		1. Empty keyword.
		2. Correct keyword (with respect to context).
		3. Slightly misspelled keyword.
		4. Partial keyword.
		5. Multiple queries for repeated keyword.
		6. Number of search hits should be case insensitive.
>> For someone unaware of Cypress, test cases are defined under integration folder. In our case all the test cases are listed in cypress > integration > components > searchBar > userSearchQueries.spec.js.

Results:

>> While many test case passes, queries with even slightly misspelled words fails (for instance MATLAB spelled as MAALAB produces no result) which developer feels is an important feature of any search engine.
>> Queries are not case insensitive (developer feels number of search results should de consistent if we hit server with mATLAB or MaTlaB, relevance may vary but number of hits should be consistent) and thus the test case fails.

Instructions to run:

1. Unzip the attached folder.
2. Navigate to sampleProject > and run npm install.
3. Run "npm run cypress".
4. Once Cypress window opens, click userSearchQueries.spec.js.


Dependencies:

1. At the time of developing this test suite, developer machine have node version 10.15.1 and npm version 6.4.1 installed.
