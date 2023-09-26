import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const port = 8080;

const productManager = new ProductManager('./files/products');

app.use(express.urlencoded({extended: true}));

//Ruta /products tipo get app.get llamar al método getAll de la clase ProductManager para esto hay que instanciar la clase
app.get('/products', async (req, res) => {
    const products = await productManager.getAll();
    const cant = req.query.limit;

    if (!cant) return res.send(products)
    res.send(products);
})

app.get('/product/:id', async (req, res) => {
    const products = await productManager.getById();

});

app.listen(port, () => console.log('Listening on port 8080'));