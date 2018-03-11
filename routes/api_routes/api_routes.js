
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const scrape = require('../../scripts/scrape');

const Article = require('../../models/Article');
const Comment = require('../../models/Comment');





//BEGIN ARTICLE API ROUTES
/* GET API listing all articles. */
router.get('/api/articles', function(req, res, next) {
    Article.find()
        .then(docs => {
            res.status(200).json(docs);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                err: err
            });
        });
});

router.get('/api/articles/:articleID', function(req, res, next) {
    Article.find({ _id: req.params.articleID })
        .then(docs => {
            res.status(200).json(docs);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                err: err
            });
        });
});

router.post('/api/articles/scrape', function(req, res, next) {
    scrape(res);
});
//END ARTICLE API ROUTES

//BEGIN COMMENT API ROUTES
/* GET home API listing all comments */
router.get('/api/comments', function(req, res, next) {
    Comment.find()
        .then(docs => {
            res.status(200).json(docs);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                err: err
            });
        })
});

/* POST comments */
router.post('/api/comments', function(req, res, next) {
    const comment = new Comment({
        _id: new mongoose.Types.ObjectId,
        Username: req.body.Username,
        Posted: req.body.Posted,
        Body: req.body.Body,
        ArticleID: req.body.ArticleID
    });
    comment.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to /api/comments",
                result: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

/* DELETE comments */
router.delete("/api/comments/:commentID", (req, res, next) => {
    const id = req.params.commentID;
    Comment.remove({ _id: id })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
//END COMMENT API ROUTES

module.exports = router;