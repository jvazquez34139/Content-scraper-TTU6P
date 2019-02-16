//guildlinesvvvvvvvvvvvvvvvvvvvvvvvvvvv
//http://shirts4mike.com/shirts.php
//Title, Price, ImageURL, URL, and Time
const request = require('request');
const cheerio = require('cheerio');
const checkedOn = require('./yyyymmdd');


const installScraper = (url, save, errorCB) => {
  const errorMsg = `There was an unexpected error connecting to the url ${url}, Error: 404`;
  let data = [];
  let date = checkedOn.date();
  request(url, (error, response, html) => {
    if(!error){
      console.log(response && response.statusCode);
      const $ = cheerio.load(html);
      const $products = $('.products li a');
      for(let i = 0; i < $products.length; i++){
        let item = {
          itemNum: i,
          url: "http://shirts4mike.com/" + $products[i].attribs.href,
          title: $products[i].children[0].attribs.alt.toString(),
          imageURL: $products[i].children[0].attribs.src.toString(),
          time: date
        };
        itemPrice(item.url, item, data, save, errorCB);
      }

    }else{
      errorCB(errorMsg);
    }
  });
}

const itemPrice = (url, item, data, save, errorCB) => {
  const errorMsg = `There was an unexpected error connecting to the url ${url}, Error: 404`;
  request(url,(error, response, html) => {
    if(!error){
      console.log(response && response.statusCode);
      const $ = cheerio.load(html);
      item.price = $('.price').text();
      data.push(item);
      if(data.length == 8){
        save(data);
      }
    }else{
      errorCB(errorMsg);
    }
  });
}

module.exports.install = installScraper;
