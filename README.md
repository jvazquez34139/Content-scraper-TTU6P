# Content-scraper-TTU6P
Web scraping project

To start the app

$ npm install

$ npm start


This app extracts the Title, Price, ImageURL, URL, and Time from
the website http://shirts4mike.com/shirts.php. It stores the values
in a JSON object and uses a csv module to convert the JSON 
to csv data and logs it to a file named with the date it was 
scraped.

The app also logs any errors with a timestamp included on 
a file called "scraper-error.log"

Checks for folder "data" before writing anything
