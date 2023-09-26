import fs from "fs";

export default class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getAll() {
        try {
            if (fs.existsSync(this.path)) {
                const products = await promises.readFile(this.path);
                return JSON.parse(products);
            } else return []

        } catch (error) {
            console.log(error);
        }
    }

    async save(product) {
        const products = this.getAll();

        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            return console.log('Faltan campos del product por completar');
        }

        if (products.length === 0) product.id = 1;
        else product.id = products[products.length - 1].id + 1;

        products.push(product);

        await promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
        return products
    }

    async getById(id) {
        try {
            const products = await this.getAll();
            const productById = products.find(p => p.id === id);
            if (!productById) return console.log("Error: Producto no encontrado");
            return productById
        } catch (error) {
            console.log(error);
        }
    }
}