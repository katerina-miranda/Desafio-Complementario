const fs = require('fs'); 
const express = require('express'); //Se importa el módulo Express
const PUERTO = 7500; //Se define el número del puerto en el que se ejecutará la aplicación
const app = express(); //Se crea una instancia de la aplicación Express
app.use(express.urlencoded({extended:true})); //Se utiliza el middleware urlencoded proporcionado por Express para analizar los datos de formulario enviados en una solicitud HTTP

class ProductManager {
  constructor() {
    this.products = [];
    this.id = 0;
    this.path = './listadoDeProductos.JSON';
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    //Validar que todos los campos sean obligatorios
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log('Todos los campos son obligatorios');
      return;
    }

    //Validar que no se repita el campo "code"
    const codeRepetido = this.products.some(product => product.code === code); //some() comprueba si al menos un elemento del array cumple con la condición. Devuelve true/false
    if (codeRepetido) {
      console.log(`Existe un producto con el código ${code}`);
    }

    const producto_nuevo = {
      id: ++this.id,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock
    }

    //Agregar un producto al arreglo de productos
    this.products.push(producto_nuevo);
    console.log('Producto agregado correctamente');
    //Guardar el array de productos en el archivo
    fs.writeFile(this.path, JSON.stringify(this.products), (err) => {
      if (err) throw err;
      console.log('Productos almacenados con exito en el archivo');
    });
  }

  async getProducts() {
    //Leer el archivo de productos y devolver todos los productos en formato arreglo
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8'); //Leer el archivo de productos
      const products = JSON.parse(data); //Devolver todos los productos en formato arreglo
      console.log(products);
      return products;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  async getProductId(productId) {
    //Leer el archivo, buscar el producto con el id especificado y devolverlo en formato objeto
    const data = await fs.promises.readFile(this.path, 'utf-8'); //Leer el archivo
    const productsById = JSON.parse(data);
    const product = productsById.find(product => product.id === productId); //find() devuelve el valor del primer elemento del array que cumple con la función de prueba proporcionada
    if (product) { //Devolverlo en formato objeto
      console.log(product);
      return product;
    } else {
      console.log('Producto no existe')
    }
  }

  async updateProduct(productId, field, updateData) {
    const data = await fs.promises.readFile(this.path, 'utf-8');
    const products = JSON.parse(data);
    const index = products.findIndex(product => product.id === productId); //findIndex() devuelve el índice del primer elemento de un array que cumpla la condición. En caso contrario devuelve -1
    if (index === -1) {
      console.log('Producto no encontrado');
      return;
    }
    products[index][field] = updateData;
    //Actualizar el valor del campo en el objeto con el índice en el arreglo products al nuevo valor asignado
    //products es el nombre del arreglo que contiene los objetos
    //index es el índice del objeto en el arreglo que se quiere actualizar
    //field es el nombre del campo específico en el objeto que se quiere actualizar
    //updateData es el nuevo valor que deseas asignar al campo
    fs.writeFile(this.path, JSON.stringify(products), err => {
      if(err) throw err;
      console.log('Producto actualizado correctamente');
    })
  }

  async deleteProduct(productIdToDelete) {
    const data = await fs.promises.readFile(this.path, 'utf-8');
    const products = JSON.parse(data);
    const productoElimminado = products.findIndex(product => product.id === productIdToDelete);
    if (productoElimminado === -1) {
      console.log(`No se encontro producto con el ID: ${productIdToDelete}`);
      return;
    }

    products.splice(productIdToDelete, 1);
    fs.writeFile(this.path, JSON.stringify(products), err => {
      if(err) throw err;
      console.log('Producto eliminado correctamente');
    })
  }
}

module.exports = ProductManager;

//CASOS DE USO
const manager = new ProductManager();
manager.addProduct("Remera", "Remera Negra", 15000, "imagen1.jpg", "REM01", 1);
manager.addProduct("Vestido", "Vestido Rojo", 20000, "imagen2.jpg", "VES01", 1);
manager.addProduct("Buzo", "Buzo Blanco", 18000, "imagen3.jpg", "BUZ01", 1);
console.log(manager.getProducts());
manager.getProductId(3);
console.log(manager.getProductId(2).description);
manager.updateProduct(2, 'description', 'Buzo Rojo');
//manager.deleteProduct(2);