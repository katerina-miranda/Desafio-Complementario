class ProductManager {
  constructor() {
    this.products = [];
    this.id = 0;
  }
  addProduct (title, description, price, thumbnail, code, stock) {
    const foundCode = this.products.some (producto => producto.code === code);
    if (foundCode) {
      console.log(`Error: Ya existe un prducto con el codigo ${code}`);
      return;
    }
    const producto_nuevo = {
      id: ++ this.id,
      title: title,
      description: description,
      price: price || 200,
      thumbnail: thumbnail,
      code: code,
      stock: stock || 25
    }
    if(Object.values(producto_nuevo).includes(undefined)) {
      console.log('Error: todos los campos son obligatorios');
    } else {
      this.products.push(producto_nuevo);
    }
  }
  getProducts () {
    console.log(this.products);
  }
  getProductById (productoId) {
    const idProduct = this.products.find(producto => producto.id === productoId); 
    if (idProduct) {
      return idProduct;
    } else {
      console.log('Error: Not Found')
    }
  }
}

// casos de uso
const manager = new ProductManager();
manager.addProduct('Camiseta', 'camiseta de algodon', 1500, 'imagen01.jpg', 'CAM01', undefined)
manager.addProduct('Pantalon', 'pantalon de lino', 3500, 'imagen02.jpg', 'PAN01', 8)
console.log(manager.getProductById(1).title);
console.log(manager.getProductById(2).description);
console.log(manager.getProducts());