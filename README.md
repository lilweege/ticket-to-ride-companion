# ticket-to-ride-webapp
easily keep track of the score of your Ticket to Ride game


## how to set up
### 1. run a server
clone the project and host it anywhere you'd like
alternatively, run locally using `node index.js`

### 2. set up google cloud
visit console.cloud.google.com, create a project and set up a service worker for google sheets\
download the client secret from gcp and create a .env file containing your private key and service account address\
here's a template version of the google spreadsheet I use: https://docs.google.com/spreadsheets/d/1qImZ22ZUYkjGnLSu2ip9WCQYUmqXMTEWcyzQw7vyd0A/edit?usp=sharing
