const express = require('express');
 const router = express.Router();
const request = require('request'); // to easily make HTTP request
const cheerio = require("cheerio"); // Scraping tool
const db = require('../models');
var mongoose = require("mongoose");
var Article = require('../models/Article');
const Comments = require('../models/Comment');

 
// GET '/' Display main page
 router.get('/', (req, res) => {
     res.render('index', { mainPage: true} );

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
		                

		                
		        })
		    });

		            for (var i = 0; i < wiredResult.length; i++) {
		            	

		            	 db.Article.create({"title": wiredResult[i].title, "body": wiredResult[i].body, "url": wiredResult[i].url}, function(err, docs) {
		        			
		        		});
		            }
		            console.log('saved DB')

           

       
        
        
        //res.json(wiredResult);
        Article.create(wiredResult)
            .then( dbArticle => {
                res.render('scrape', {articles: dbArticle, title: "Check the results"});
            })
            .catch( err => {
                console.error(err);
                res.redirect('/');
            })



        
       
    });
   
});


// GET '/save/:id' Saves article for later viewing


// GET '/save' Show all saved articles

// POST '/save/comments/:postCommentID' Create comments for a specific article

// GET '/save/comments/:getCommentID' Display comments for a specific article

 module.exports = router; 