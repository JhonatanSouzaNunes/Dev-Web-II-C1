const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');
const pessoasRoutes = require('./routes/pessoas-router');
const unidadesRoutes = require('./routes/unidades-router');
const agendamentoRoutes = require('./routes/agendamento-router');

const port = 3000;
const hostname = 'localhost';

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());
app.use('/api/pessoas/', pessoasRoutes);
app.use('/api/unidades/', unidadesRoutes);
app.use('/api/agendamento/', agendamentoRoutes);

mongoose.connect('mongodb://root:jhon123@localhost/projeto_c1?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar no Mongo:'));
db.once('open', function () {
    console.log("Banco de dados Mongo conectado")
});

app.get('/', function (req, res) {
    res.json({
        status: "ok",
        message: "Servidor rodando perfeitamente"
    });
});

app.listen(port, hostname, () => {
    console.log(`servidor rodano na porta:: https://${hostname}:${port}`);
});