const path = require('path');
const express = require('express');

let knex = require('knex')({
  client: 'pg',
  connection: 'postgres://ryutqlmo:veCNdcwIHiGuFX9XjqdeebVGBkjV3UHb@stampy.db.elephantsql.com:5432/ryutqlmo'
});

const app = express();

// API endpoints go here!


// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

app.get('/api/users/:userId',(req,res,next)=>{
    knex.insert({name:'name'}).into('users').then(e=>{
      knex.select().from('users').then(function(e){
        console.log(e);
      });
    })
    res.send('Working!').end();
})

app.put('/api/users',(req,res,next)=>{
    res.send('Working!').end();
})

app.post('/api/users',(req,res,next)=>{
  //knex('users').insert({}).returning('*').toString();
  knex('users').insert({name: "Anonymous"}).into('users').then(e=>{
    console.log("done!");
  })

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
