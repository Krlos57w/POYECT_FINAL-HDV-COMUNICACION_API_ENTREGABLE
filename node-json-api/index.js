// Librerías externas
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Módulos internos
const { readFile, writeFile } = require('./src/files');

const app = express();
const FILE_NAME = './db/books.txt';

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

//Rutas DE PRUEBA
app.get('/hola/:name', (req, res) => {
    console.log(req);
    const name = req.params.name;
    const type = req.query.type;
    const formal = req.query.formal;
    res.send(`Hello ${formal ? 'Mr.' : ''} 
    ${name} ${type ? ' ' + type : ''}`);
});

app.get('/read-file', (req, res) => {
    const data = readFile(FILE_NAME);
    res.send(data);
});

// API
// Listar libros
app.get('/books', (req, res)=>{
    const data = readFile(FILE_NAME);
    res.json(data);
})

//Crear libros
app.post('/books', (req, res) => {
    try {
        //Leer el archivo de libros
        const data = readFile(FILE_NAME);
        //Agregar la nuevo libro (Agregar ID)
        const newBook = req.body;
        newBook.id = uuidv4();
        console.log(newBook)
        data.push(newBook);
        // Escribir en el archivo
        writeFile(FILE_NAME, data);
        res.json({ ok: true, message: 'el libro fue creado con éxito' });//servidor responde ok para la condicion
    } catch (error) {
        console.error(error);
        res.json({ message: 'Error al almacenar el libro' });
    }
});

//Obtener una solo libros
app.get('/books/:id', (req, res) => {//request sirve para obtener datos del cliente y response para enviar datos al cliente
    console.log(req.params.id);
    //Guardar el ID
    const id = req.params.id
    //Leer el contenido del archivo
    const books = readFile(FILE_NAME)
    // Buscar la mascota con el ID que recibimos
    const bookFound = books.find(book => book.id === id )
    if(!bookFound){// Si no se encuentra la mascota con ese ID
        res.status(404).json({'ok': true, message:"book not found"})
        return;
    }
    res.json({'ok': true, book: bookFound});
})

//Actualizar un libro
app.put('/books/:id', (req, res) => {
    console.log(req.params.id);
    //Guardar el ID
    const id = req.params.id
    //Leer el contenido del archivo
    const books = readFile(FILE_NAME)
    // Buscar la mascota con el ID que recibimos
    const bookIndex = books.findIndex(book => book.id === id )
    if( bookIndex < 0 ){// Si no se encuentra la mascota con ese ID
        res.status(404).json({'ok': false, message:"book not found"});
        return;
    }
    let book = books[bookIndex]; //Sacar del arreglo
    book = { ...book, ...req.body  };
    books[bookIndex] = book; //Poner la mascota en el mismo lugar
    writeFile(FILE_NAME, books);
    //Si la mascota existe, modificar sus datos y almacenarlo nuevamente
    res.json({'ok': true, book: book});
})

//Eliminar una mascota
app.delete('/books/:id', (req, res) => {
    console.log(req.params.id);
    //Guardar el ID
    const id = req.params.id
    //Leer el contenido del archivo
    const books = readFile(FILE_NAME)
    // Buscar la mascota con el ID que recibimos
    const bookIndex = books.findIndex(book => book.id === id )
    if( bookIndex < 0 ){// Si no se encuentra la mascota con ese ID
        res.status(404).json({'ok': false, message:"book not found"});
        return;
    }
    //Eliminar la mascota que esté en la posición bookIndex
    books.splice(bookIndex, 1);
    writeFile(FILE_NAME, books)
    res.json({'ok': true});
})

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`)
});
