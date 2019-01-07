const serverDomain = 'http://localhost';
const serverPort = 5000;

const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);

app.use(express.json());
mongoose.connect('mongodb://admin:admin123@ds149914.mlab.com:49914/zpw-project', { useNewUrlParser: true });

const modelProduct = new mongoose.Schema({
  id: String,
  name: String,
  quantity: Number,
  price: Number,
  desc: String,
  imageSource: String,
  categoryId: Number
});

const modelOrder = new mongoose.Schema({
  id: String,
    name: String,
    surname: String,
    zipCode: String,
    city: String,
    phone: String,
    mail: String,
    products: [modelProduct],
    status: String,
})

const modelDiscount = new mongoose.Schema({
  id: String,
  productId: String,
  discountValue: Number,
  discountTimeout: String,
})

const products = mongoose.model('products', modelProduct);
const discounts = mongoose.model('discounts', modelDiscount);
const orders = mongoose.model('orders', modelOrder);

app.options('/products', cors());
app.options('/new-product', cors());
app.options('/product/:id', cors());
app.options('/discount/:id', cors());
app.options('/discounts', cors());
app.options('/orders', cors());

app.options('/product', cors());
app.options('/discount', cors());
app.options('/order', cors());
app.options('/order/:id', cors());

app.get('/products', cors(), (req, res) => {
  return products.find({}, (err, resp) => {
    const toEmit = err ? '[]' : resp;
    io.sockets.emit('products', toEmit);
    return res.send(toEmit);
  });
});

app.get('/product/:id', cors(), (req, res) => {
  return products.find({_id: req.params.id}, (err, resp) => {
    const toEmit = err ? '[]' : resp[0];
    io.sockets.emit('product', toEmit);
    return res.send(toEmit);
  });
});

app.get('/discount/:id', cors(), (req, res) => {
  return discounts.find({productId: req.params.id}, (err, resp) => {
    const toEmit = err ? '[]' : resp[0];
    io.sockets.emit('discount', toEmit);
    return res.send(toEmit);
  });
});

app.get('/order/:id', cors(), (req, res) => {
  return products.find({_id: req.params.id}, (err, resp) => {
    const toEmit = err ? '[]' : resp[0];
    io.sockets.emit('order', toEmit);
    return res.send(toEmit);
  });
});


app.get('/discounts', cors(), (req, res) => {
  return discounts.find({}, (err, resp) => {
    const toEmit = err ? '[]' : resp;
    io.sockets.emit('discounts', toEmit);
    return res.send(toEmit);
  });
});

app.get('/orders', cors(), (req, res) => {
  return orders.find({}, (err, resp) => {
    const toEmit = err ? '[]' : resp;
    io.sockets.emit('orders', toEmit);
    return res.send(toEmit);
  });
});

app.post('/new-product', cors(), (req, res) => products.create(req.body, () => {
  http.get(serverDomain + ':' + serverPort + '/products');
  return res.send('');
}));

app.post('/discount', cors(), (req, res) => discounts.create(req.body, () => {
  http.get(serverDomain + ':' + serverPort + '/discounts');
  return res.send('');
}));

app.post('/order', cors(), (req, res) => orders.create(req.body, () => {
  http.get(serverDomain + ':' + serverPort + '/orders');
  return res.send('');
}));

app.delete('/product/:id', cors(), (req, res) => {
  console.log(req.params.id)
  products.findById(req.params.id, (err, product) => product.remove(() => {
    http.get(serverDomain + ':' + serverPort + '/products');
    return res.send('');
  }));
});

app.delete('/discount/:id', cors(), (req, res) => {
  console.log(req.params.id)
  discounts.findById(req.params.id, (err, discount) => discount.remove(() => {
    http.get(serverDomain + ':' + serverPort + '/products');
    return res.send('');
  }));
});

app.patch('/product/:id', cors(), (req, res) => {
  products.findById(req.params.id, (err, product) => {
    product.set(req.body);
    product.save(() => {
      http.get(serverDomain + ':' + serverPort + '/products');
      return res.send('');
    });
  });
});

app.patch('/order/:id', cors(), (req, res) => {
  orders.findById(req.params.id, (err, order) => {
    order.set(req.body);
    order.save(() => {
      http.get(serverDomain + ':' + serverPort + '/orders');
      return res.send('');
    });
  });
});

server.listen(serverPort, () => {
  console.log("REST SERVICE - %s:%s", serverDomain, serverPort);
});
