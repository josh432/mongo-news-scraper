const express = require('express');
 const router = express.Router();
const request = require('request'); // to easily make HTTP request
const cheerio = require("cheerio"); // Scraping tool
 
// GET '/' Display main page
 router.get('/', (req, res) => {
     res.render('index');
 });
 
// GET '/scrape' Scrape news websites
router.get('/scrape', (req, res) => {
    console.log('We are scraping my friend');
    // Making the request to get the HTML
    const wiredURL = "https://www.wired.com/most-recent/";
    request(wiredURL, (err, response, html) => {
        if (err) { console.log(error) };    // Check for errors
        
        const $ = cheerio.load(html);  // Load the HTML into Cheerio 
       
       let wiredResult = [];   // To store all the results to then save them in DB
        let wiredParentSelector = "li.archive-item-component";  // The parent selector element to use

        $(wiredParentSelector).each( (i, element) => {
            wiredResult.push({
                title: $(element).find('h2.archive-item-component__title').text(),
                body: $(element).find('p.archive-item-component__desc').text(),
                url: $(element).find('a').attr('href')
           });
        });

        
        res.send(wiredResult);
       
    });
    
});

 module.exports = router; 