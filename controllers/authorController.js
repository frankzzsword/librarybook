var Author =  require('../models/author');
var async = require('async');
var Book = require('../models/book');

//Display the list of all Authors.
exports.author_list = function(req, res, next) {
    Author.find()
    .sort([['family_name', 'ascending']])
    .exec(function(err, list_authors) {
        if(err) {return next(err); }
        //Successful, so render
        res.render('author_list', {title:'Author List', author_list: list_authors})
    })
};

//Display details page of a specifc Author
exports.author_detail = function(req, res, next) {
    async.parallel({
        author: function(callback) {
            Author.findById(req.params.id)
            .exec(callback)
        },
        authors_books: function(callback) {
            Book.find({'author': req.params.id },'title summary')
            .exec(callback)
        },
    }, function(err, results) {
        if (err) {return next(err);} //Error in API Usage
        if (results.author == null) { // No results
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        //Successful, so render:
        res.render('author_detail', {title: 'Author Details', author: results.author, author_books: results.authors_books})
    }
    )
};

//Handle Author create on GET
exports.author_create_get = function (req, res) {
    res.send('Not Implemented: Author create GET');
};

//Handle Author create on POST
exports.author_create_post = function (req, res) {
    res.send('Not Implemented: Author create POST');
};

//Display Author Delete from GET
exports.author_delete_get = function(req, res) {
    res.send('Not Implemented: Author Delete GET');
};


//Handle Author Delete on POST
exports.author_delete_post = function(req, res) {
    res.send('Not Implemented: Author Delete POST');
};


// Display Author update form on GET.
exports.author_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.author_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};
