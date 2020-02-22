const express = require('express')
const Joi = require('joi')  
// joi used for validation
const app = express()
app.use(express.json());

// list of objects of books defined below
const books = [
    {title: "Harry Poter", id: 1},
    {title: "Twilight", id: 2},
    {title: "Loren", id: 3},
]

// Read Request handler
app.get('/', (req, res) =>          // this will show the first page with below msg
    {
        res.send("welcome to our first restApi with node");
    });
app.get('/api/books', (req, res) =>    // this will return all books items 
    {
    res.send(books)
    });
app.get('/api/books/:id', (req, res) =>  // this will show the item based on the given id
    {
        const book = books.find(c => c.id === parseInt(req.params.id));
        if (!book) res.status(404).send("opps can not find");
        res.send(book)
    });

    // Create requst handler

app.post('/api/books', (req, res) =>     // it will save the given item to the lsit and return the given item
    {
        const { error } = validateBook(req.body);
        if (error){
            res.status(400).send(error.details[0].message)
            return
                }
        const book = {
            id: books.length + 1,
            title: req.body.title
            };
            books.push(book);
            res.send(book);
    });

        // Update request handler

app.put('/api/books/:id', (req, res) => 
{
    const book = books.find( c => c.id === parseInt(req.params.id));
    if (!book) res.status(404).send(" Book Not Found");

    const { error } = validateBook(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    book.title = req.body.title;
    res.send(book);

});
        // Delete request handler
app.delete('/api/books/:id', (req, res) =>
    {
        const book = books.find( c=> c.id === parseInt(req.params.id));
        if (!book) res.status(404).send("Book not found ");
            const index = books.indexOf(book);
            books.splice(index, 1);
            res.send(book);
    });

function validateBook(book){
    const schema = {
        title: Joi.string().min(3).required()
    };
    return Joi.validate(book, schema);
}

            // Port environment variable
        const port = process.env.PORT || 8080;
        app.listen(port, () => console.log(`Listining on port ${port}...`));