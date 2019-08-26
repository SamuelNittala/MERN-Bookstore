const router = require('express').Router();
const Book = require('../models/book.model');

router.route('/').get((req,res)=>{
    Book.find()
        .then(books => res.json(books))
        .catch(err => res.status(400).json('Error' + err ));
});

router.route('/add').post((req,res)=>{
    const title = req.body.title;
    const author = req.body.author;
    const price = Number(req.body.price);
    const newBook = new Book({title,author,price});

    newBook.save().
        then(()=> res.json('Book added!'))
        .catch(err => res.status(400).json('Error '+ err));
})

router.route('/sellbook').post((req,res)=>{
    const search_string = req.body.sstring;
    Book.find({$text:{$search: new RegExp(search_string,"i")}})
        .then(books => {
            if(books.length >= 1) res.json(books)
            else res.json('No Books found!')
        })
        .catch(err => res.json(err));
})

module.exports = router;

