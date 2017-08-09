const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();


let knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

const app = express();

app.use(bodyParser.json());




// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
  const index = path.resolve(__dirname, '../client/build', 'index.html');
  res.sendFile(index);
});

app.get('/api/users/:id',(req,res)=>{
  let {id} = req.params;
  knex.select().from('users').where('id', id).then(result => {
    res.json(result[0]).end();
  });
});

app.put('/api/users/:id',(req,res)=>{
  knex('users')
    .where('id', req.params.id)
    .update({scores: req.body.scores})
    .returning(['scores'])
    .then(result => {
      res.json(result[0]).end();
    });
});

app.post('/api/users',(req,res)=>{
  knex('users').insert({name: req.body.name}).into('users').returning(['name', 'id', 'scores'])
  .then(e=>{
    res.send(e);
  });
});

let server;
function runServer(port=3001) {
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      resolve();
    }).on('error', reject);
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    server.close(err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer();
}

module.exports = {
  app, runServer, closeServer
};
