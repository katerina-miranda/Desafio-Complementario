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
    const productoNuevo = {
      id: ++ this.id,
      title: title,
      description: description,
      price: price || 200,
      thumbnail: thumbnail,
      code: code,
      stock: stock || 25
    }
    if(Object.values(productoNuevo).includes(undefined)) {
      console.log('Error: todos los campos son obligatorios');
    } else {
      this.products.push(productoNuevo);
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
      console.log('Error: Not found')
    }
  }
}

// casos de uso
const manager = new ProductManager();
manager.addProduct('Remera', 'remera de algodon', 5500, 'imagen01.jpg', 'REM01', undefined)
manager.addProduct('Pantalon', 'pantalon de jean', 4500, 'imagen02.jpg', 'PAN01', 8)
console.log(manager.getProductById(1).title);
console.log(manager.getProductById(2).description);
console.log(manager.getProducts());