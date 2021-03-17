const express = require('express');
const app = express();

var bodyParser = require('body-parser');
 
global.__basedir = __dirname;
 
const db = require('./lib/db.config.js');

const Vehicules = db.Vehicules;
const Reparateurs = db.Reparateurs;

let router = require('./lib/router.js');

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.static('resources'));
app.use('/', router);

// Create a Server
const server = app.listen(8081, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port); 
})

/*db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  Vehicules.sync().then(() => {
    const customers = [
      { owner: 'Charles ONDOUA', marque: 'Mercedes', 
                modele: 'E class 320 CDI', immat: 'LT 075 DV', trans: 'Manuelle', year: 2003, carb: 'ESS'},
      { owner: 'Daladji DOUCOURE', marque: 'Nissan', 
      modele: 'Primera', immat: 'LT 112 NA', trans: 'Manuelle', year: 2000, carb: 'GAS'},
      { owner: 'Eric MBAKOP', marque: 'Toyota', 
      modele: 'Yaris', immat: 'LT 912 AK', trans: 'Automatique', year: 2007, carb: 'GAS'},
      { owner: 'Franck NJAMO', marque: 'Chevrolet', 
      modele: 'Suburan', immat: 'LT 004 DZ', trans: 'Manuelle', year: 2003, carb: 'ESS'},
      { owner: 'Ingrid PATIMEN', marque: 'Toyota', 
      modele: 'Camry', immat: 'SW 302 MA', trans: 'Manuelle', year: 2004, carb: 'ESS'}
    ]
    
    for(let i=0; i<customers.length; i++){
      Vehicules.create(customers[i]);
    }
  })
}); */