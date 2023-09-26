import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const port = 8080;

const productManager = new ProductManager('./src/products.json');

app.use(express.urlencoded({extended: true}));

//Ruta /products tipo get app.get llamar al método getAll de la clase ProductManager para esto hay que instanciar la clase
app.get('/products', async (req, res) => {
    const products = await productManager.getAll();
    const cant = req.query.limit;

    if (!cant) return res.send(products)

    if (isNaN(cant)) return res.send({error: 'El valor ingresado no es un numero'})

    const productosLimitados = products.slice(0, cant)
    
    res.send(productosLimitados);
})

app.get('/products/:pid', async (req, res) => {
    const id = Number(req.params.pid)
    const product = await productManager.getById(id);

    if (!product) return res.send({error: 'Producto no encontrado'})

    res.send(product)
});

const product = {
    title: 'Remera con estampa',
    description: 'Remera con dibujos',
    price: 3500,
    thumbnail: 'Sin imagen',
    stock: 12,
}

await productManager.save(product)


app.listen(port, () => console.log('Listening on port 8080'));