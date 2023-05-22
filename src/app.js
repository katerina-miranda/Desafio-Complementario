import express from 'express';
import ProductManager from '../desafio'; //Se importa la clase ProductManager desde un archivo local desafio.js. Esta clase es responsable de cargar y administrar los datos de los productos

const server = express();

server.use(express.urlencoded({extended:true})); //Analizar los datos de formulario enviados en una solicitud HTTP
server.use(express.json()); //Analizar los datos JSON enviados en una solicitud HTTP

// server.get('/saludo', (req, res) => { //get (obtener)
//   res.send('Esta es la respuesta de servidor express'); 
// });

server.get('/products', async(req, res) => {
  const productManager = new ProductManager(); //Instancia de la clase ProductManager
  const limite = req.query.limite; //Soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados
  //Obtiene el valor del parámetro de consulta limite de la solicitud
  console.log(limite);
  try {
    let products = await productManager.getProducts();
    if(limite) {
      products = products.slice(0, limite);
    }
    res.json(products);
  } catch (error) {
    return res.status(500).send({error: 'Error interno del servidor'});
  }
});

server.get('/products/:pid', async(req, res) => {
  const productManager = new ProductManager();
  const productId = req.params.pid; //Recupera el valor del parámetro de ruta 'pid' de la solicitud utilizando la propiedad 'params' del objeto 'req'
  //Debe recibir por re.params el pid (product Id)
  try {
    const product = await productManager.getProductId(parseInt(productId));
    if(!product) {
      return res.status(404).send(`No se encontró el producto con el ${productId}`);
    } else {
      return res.status(200).send(product);
    }
  } catch (error) {
    return res.send(error);;
  }
});

server.listen(8080, () => {
  console.log('Servidor inicializado en http://localhost:8080');
});