class Product{
  constructor(product){
    this.title = product.title;
    this.description = product.description;
    this.price = product.price;
    this.thumbnail = product.thumbnail;
    this.code = product.code;
    this.stock = product.stock;
    this.id = product.id;
  }
}
class ProductManager{
  constructor(){
    this.products = [];
  }
  addProduct(product){
    if(this.checkProduct(product)){
      this.products.push(new Product({
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock,
        id: this.generateId()
      }));
      console.log('Producto Agregado:', product);
    } else {
      console.error('Error al agregar el producto', product);
    }
  }
  deleteProduct(){
    const deleteProduct = [productManager];
  }
  checkProduct(product){
    return !this.getCode(product.code) && product.title && product.description && product.price && product.thumbnail && product.stock
  }
  getCode(code){
    return this.products.find(product => product.code == code)
  }
  getProducts(){
    return this.products;
  }
  getProductsById(id){
    return this.products.find((product) => {
      if(product.id === id){
        return product
      } else {
        console.error('not found id:', id);
      }
    })
  }
  generateId(){
    return this.products.length + 1;
  }
}

const productManager = new ProductManager();
console.log(productManager.getProducts());
productManager.addProduct({
  title: 'producto prueba',
  description:'Este es un producto prueba',
  price:'200',
  thumbnail:'Sin imagen',
  code:'abc123',
  stock:25
})
console.log(productManager.getProducts());
productManager.addProduct({
  title: 'producto prueba',
  description:'Este es un producto prueba',
  price:'200',
  thumbnail:'Sin imagen',
  code:'abc123',
  stock:25
})
console.log(productManager.getProductsById(1))
productManager.getProductsById(4)