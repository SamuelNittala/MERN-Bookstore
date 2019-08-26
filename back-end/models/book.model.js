const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title : {type: String, required: true, trim: true},
    author : {type: String, required: true, trim: true},
    price : {type: Number, required: true},
},{timestamps: true});

bookSchema.index({ title: "text" , author: "text"});
const Book = mongoose.model('Book',bookSchema);

module.exports = Book;