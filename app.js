// Envelope Budget Codeacademy Independent Portfolio Project
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const cors = require('cors');

const db = require('./config/db')

const app = express();

module.exports = app;

const PORT = process.env.port || 3000;

app.use(morgan('dev'));
app.use(errorhandler());

app.use(cors());
app.use(bodyParser.json());

app.use('/', express.static('./Public'));

app.get('/budget', (req, res, next) => {
    let budget = String(db.budget);
    res.status(200).send(budget);
})

app.get('/envelopes', (req, res, next) => {
    db.setValues(db.budget);
    res.send(db.envelopes);
})

app.get('/envelopes/:id', (req, res, next) => {
    const id = Number(req.params.id);
    console.log(id);
    const index = db.searchById(id);
    const envelope = db.envelopes[index];
    if (!envelope) {
        res.sendStatus(404)
    }
    res.send(envelope);
})

app.put('/budget', (req, res, next) => {
    if (!req.body) {
        res.status(400).send();
    }
    const budget = req.body.budget;
    db.budget = Number(budget);
    db.setValues(db.budget);
    res.status(201).send(db.envelopes)
})

app.put('/envelopes/:id', (req, res, next) => {
    if (!req.body) {
        res.sendStatus(400);
    }
    const body = req.body;
    const id = body.id;

    let index = db.searchById(id);
    if (!index && index !== 0) {
        console.log('Invalid index caught in server put request.')
        res.sendStatus(400)
    }
    envelope = {
        id: Number(id),
        name: String(body.name),
        weight: Number(body.weight)/100
    }

    db.setValues(db.budget);
    let updatedItem = db.updateDbIndex(envelope);
    console.log(updatedItem);
    res.status(201).send(updatedItem);
});

app.delete('/envelopes/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const deletedDbItem = db.deleteDbIndex(id);
    if (deletedDbItem) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
})

app.delete('/envelopes', (req, res) => {
    db.deleteAll();
    res.sendStatus(204);
})

app.listen(PORT, () => {
    console.log(`Server is now listening at PORT ${PORT}`)
});
