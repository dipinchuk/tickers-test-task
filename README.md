
## Description

Test project for the Front-End Developer position at Incode Group.

**App and tests screenshots are provided below.**

## Requirements

To implement a solution to display price tickers data on the UI in realtime. Some ideas how the application may look like can be seen on the [Google Finance](https://www.google.com/finance/) page.

Price data is available from a locally running service (see information below). Any additional visualisations to indicate how prices have changed would be a plus. Testing is also an important part to this exercise.

Requirements:
- [x] application should connect to the locally running service
- [x] application should render price changes for some tickers in real time

As a bonus some additional functionality can be implemented (please describe implemented bonus functionality in this file):
- [x] any additional visual effects to highlight positive or negative changes in the prices
- [ ] the possibility to switch on/off tickers by user
- [x] the possibility to specify interval time by user
- [x] the possibility to add/remove ticker from watching group
- [x] any additional functionality that might be useful

  The following has been added:
   - [x] sorting by ticker and price
   - [x] modal to read info about the ticker
   - [x] search by ticker and description

Technologies for use:
- [x] React (preferable with hooks)
- [x] Redux (with Redux-Thunk or any other Redux middleware you are familiar) or any other state-manager library you want (* Redux middleware will be added soon)
- [x] Socket.io - to connect to the service
- [x] any UI library you want, or you can use just pure CSS (* Bulma and SCSS were used)
- [x] Testing Library (*@testing-library/react)

  The following has been added:
   - [x] Typescript
   - [x] ESLint, Prettier
   - [x] ```@uiball/loaders```

- [x] The app is responsive.

The next parts will be assessed:
- workability: how your application works
- projects structure: how you structure your files
- code quality: how you write clean, readable code (feel free to install and use ESLint and Prettier)
- knowledge React and its ecosystem: how you compose and use libraries together
- testing: how you can test your code

## Installation

1. Clone this repository.
```
git clone https://github.com/dipinchuk/tickers-test-task.git
```
2. Enter the folder. 
```
cd tickers-test-task/
```
3. Install all necessary dependencies and run localhost.
 - Server:
```
npm run start-app:server
```
- Client:
```
npm run start-app:client
```

## Run the tests
1. When the application is running enter the following command:
```
npm run test:client
```
# App screenshots
### Home
![home](https://github.com/dipinchuk/tickers-test-task/blob/main/client/public/screenshots/home.png)
### All tickers
![all tickers](https://github.com/dipinchuk/tickers-test-task/blob/main/client/public/screenshots/all-tickers.png)
### One ticker
![one ticker](https://github.com/dipinchuk/tickers-test-task/blob/main/client/public/screenshots/one-ticker.png)
### Zero tickers
![zero tickers](https://github.com/dipinchuk/tickers-test-task/blob/main/client/public/screenshots/zero-tickers.png)
### Sorted tickers (by price descending)
![sorted tickers](https://github.com/dipinchuk/tickers-test-task/blob/main/client/public/screenshots/sorted-tickers.png)
### Modal
![modal](https://github.com/dipinchuk/tickers-test-task/blob/main/client/public/screenshots/modal.png)
### All search results
![](https://github.com/dipinchuk/tickers-test-task/blob/main/client/public/screenshots/all-search-results.png)
### Ticker search result
![ticker search result](https://github.com/dipinchuk/tickers-test-task/blob/main/client/public/screenshots/ticker-search-results.png)
### Zero search results
![zero search results](https://github.com/dipinchuk/tickers-test-task/blob/main/client/public/screenshots/zero-search-results.png)
### Not found
![not found](https://github.com/dipinchuk/tickers-test-task/blob/main/client/public/screenshots/not-found.png)
### Loader
![loader](https://github.com/dipinchuk/tickers-test-task/blob/main/client/public/screenshots/loader.png)

# Test screenshot
![test](https://github.com/dipinchuk/tickers-test-task/blob/main/client/public/screenshots/test.png)

# Price Service Usage

URL:
```http://localhost:4000```

Price tickers are real-time via web-sockets.

## Example JSON Response from the Price Ticker service
```json
[
  {
    "ticker": "AAPL",
    "exchange": "NASDAQ",
    "price": 279.29,
    "change": 64.52,
    "change_percent": 0.84,
    "dividend": 0.56,
    "yield": 1.34,
    "last_trade_time": "2021-04-30T11:53:21.000Z"
  },
  {"ticker":"GOOGL","exchange":"NASDAQ","price":237.08,"change":154.38,"change_percent":0.10,"dividend":0.46,"yield":1.18,"last_trade_time":"2021-04-30T11:53:21.000Z"},
  {"ticker":"MSFT","exchange":"NASDAQ","price":261.46,"change":161.45,"change_percent":0.41,"dividend":0.18,"yield":0.98,"last_trade_time":"2021-04-30T11:53:21.000Z"},
  {"ticker":"AMZN","exchange":"NASDAQ","price":260.34,"change":128.71,"change_percent":0.60,"dividend":0.07,"yield":0.42,"last_trade_time":"2021-04-30T11:53:21.000Z"},
  {"ticker":"FB","exchange":"NASDAQ","price":266.77,"change":171.92,"change_percent":0.75,"dividend":0.52,"yield":1.31,"last_trade_time":"2021-04-30T11:53:21.000Z"},
  {"ticker":"TSLA","exchange":"NASDAQ","price":272.13,"change":158.76,"change_percent":0.10,"dividend":0.96,"yield":1.00,"last_trade_time":"2021-04-30T11:53:21.000Z"}
]
```

Used tickers:
- **AAPL** - Apple
- **GOOGL** - Alphabet
- **MSFT** - Microsoft
- **AMZN** - Amazon
- **FB** - Facebook
- **TSLA** - Tesla

