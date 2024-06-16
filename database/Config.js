const mongoose = require('mongoose');
const URI= 'mongodb+srv://celiamacas24:imCiO4Saf2oHqGF6@cluster0.f07igpn.mongodb.net/MinigCompany?retryWrites=true&w=majority&appName=Cluster0';
//const URI = 'mongodb://localhost:27017/MinigCompany';
const connection = mongoose.connect(
    URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB', err));

module.exports = connection;