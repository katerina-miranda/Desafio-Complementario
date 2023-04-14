const fs = require('fs')
class ProductManager {
  constructor() {
    this.products = [];
    this.id = 0;
    this.path = './listadoDeProductos.JSON'
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    // Validar que todos los campos sean obligatorios 
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Todos los campos son obligatorios");
      return;
    }
    // Validar que no se repita el campo "code"
    const codeRepetido = this.products.some(product => product.code === code) // some() comprueba si al menos un elemento del array cumple con la condición.Este método devuelve true/false.
    if (codeRepetido) {
      console.log(`Existe un producto con el codigo ${code}`);
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
    // Agregar un producto al arreglo de productos
    this.products.push(producto_nuevo);
    console.log("Producto agregado correctamente");
    // Guardar el array de productos en el archivo
    fs.watchFile(this.path, JSON.stringify(this.products), (err) => {
      if (err) throw err;
      console.log("Productos almacenados con exito en el archivo");
    });
  }
  
  async getProducts() {
    // Leer el archivo de productos y devolver todos los productos en formato arreglo
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8'); // Leer el archivos de productos
      const products = JSON.parse(data); // Devolver todos los productos en formato arreglo      
      console.log(products);
      return products;
    } catch (error) {
      console.log(error);
      return;
    }
  }
  
  async getProductId(productId) {
    // Leer el archivo, buscar el producto con el id especificado y devolverlo en formato objeto
    const data = await fs.promises.readFile(this.path, 'utf-8'); // Leer el archivo
    const productsById = JSON.parse(data);
    const product = productsById.find(product => product.id === productId) // find() devuelve el valor del primer elemento del array que cumple la función de prueba proporcionada.
    if (product) { // Devolverlo en formato objeto
      console.log(product);
      return product;
    } else {
      console.log("Producto no existe")
    }
  }
  
  // async updateProduct(productId) {
  //     const data = await fs.promises.readFile(this.path, 'utf-8');
  //     const products = JSON.parse(data)
  //     const indiceObj = products.findIndex (product => product.id === productId); // findIndex() devuelve el índice del primer elemento de un array que cumpla la condicion. En caso contrario devuelve -1.
  //     if (indiceObj === -1  ){
  //         console.log("Producto no encontrado");
  //         return;
  //     } 
  //     products[indiceObj][field] = updateData; // Actualizar el valor del campo en el objeto con el índice en el arreglo products al nuevo valor asignado".
  //     // products es el nombre del arreglo que contiene los objetos.
  //     // index es el índice del objeto en el arreglo que quieres actualizar.
  //     // field es el nombre del campo específico en el objeto que quieres actualizar.
  //     // updateData es el nuevo valor que deseas asignar al campo.
        
  //     fs.writeFile(this.products, JSON.stringify(products), err => {
  //         if(err) throw err;
  //         console.log("Producto actualizado correctamente")
  //     });
  // }

  // async deleteProduct(productIdToDelete) {
  //     const data = await fs.promises.readFile(this.path, 'utf-8');
  //     const products = JSON.parse(data);

  //     const productoEliminado = products.findIndex( product => product.id === productIdToDelete)
  //     if(productoEliminado === -1) {
  //         console.log(`No se encontró producto con ID ${productIdToDelete}`);
  //         return;
  //     }

  //     products.splice(productIdToDelete, 1);
  //     fs.writeFile(this.path, JSON.stringify(products), err => {
  //         if(err) throw err;
  //         console.log("Producto eliminado correctamente")
  //     })
  // }
}

//Casos de uso
const manager = new ProductManager();
manager.addProduct("Computadora", "Computadora Dell", 1500, "imagen1.jpg", "COMP01", 1);
manager.addProduct("Celular", "Celular Samsung", 12000, "imagen2.jpg", "CEL01", 1);
manager.addProduct("Tablet", "Tablet Lenovo", 75000, "imagen3.jpg", "TAB01", 1);
console.log(manager.getProducts());
manager.getProductById(4);
//console.log(manager.getProductById(2).description);
//console.log(manager.getProducts);
//manager.updateProduct(2,'description', 'Tablet Samsung');
//manager.deleteProduct(2);