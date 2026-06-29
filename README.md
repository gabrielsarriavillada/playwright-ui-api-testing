# Airalo QA Assignment

## Overview

This project contains automated UI and API tests implemented with Playwright and TypeScript.

The solution covers the main workflows requested in the assignment.

## UI Automation

1. Navigate to the Airalo website.
2. Search for Japan eSIM package.
3. Select the "unlimited 7 days" package.
4. Capture the selected package price.
5. Verify that the selected package price matches the price displayed in the "buy now" section.

## API Automation

1. Obtain an OAuth access token using the client credentials flow.
2. Submit an order for the 6 eSIMs using the `moshi-moshi-7days-1gb` package.
3. Validate the order response.
4. Get the details of each generated eSIM.
5. Validate consistency between the order response and the individual eSIM responses.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- dotenv

## Setup: install dependencies

```
npm install
```

Environment variables need to be available in a `.env` file in the mainroot. You can use `.env.example` as a reference.

## Running Tests

### Running all tests

```
npx playwright test
```

### Open HTML report

```
npx playwright show-report
```

## Design Decisions

- Playwright was used for both UI and API automation to keep the solution consistent.
- API interactions were encapsulated in a dedicated AiraloApi client.
- UI page interactions are encapsulated using Page Object Model classes to keep tests readable and reduce selector duplication.
- Environment variables are used for credentials and configuration.
- Test execution is separated into UI and API Playwright projects.
- Explicit response validation is performed for status codes, messages, order details, and eSIM properties.
- Sequential eSIM validation is performed to ensure stable interaction with the Partner API.

## Future Improvements

- Add TS reponse models for stronger type safety.
- Add schema validation for API responses.
- Integrate execution into a CI/CD pipeline.
- Implement retry and backoff handling for API rate limiting scenarios.
- Include the missing `/v2` ending in the API base URL globally, so it doesn't need to be added for every request individually.
