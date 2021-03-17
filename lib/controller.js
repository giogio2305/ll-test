const { Vehicules } = require("./db.config");
const { Reparateurs } = require("./db.config");

exports.createCustomer = (req, res) => {
    let customer = {};

    try{
        // Building Customer object from upoading request's body
        customer.owner = req.body.owner;
        customer.marque = req.body.marque;
        customer.modele = req.body.modele;
        customer.year = req.body.year;
        customer.immat = req.body.immat;
        customer.trans = req.body.trans;
        customer.carb = req.body.carb;
    
        // Save to MySQL database
        Vehicules.create(customer, 
                          {attributes: ['id', 'owner', 'marque', 'modele', 'immat', 'trans', 'year', 'carb']})
                    .then(result => {    
                      res.status(200).json(result);
                    });
    }catch(error){
        res.status(500).json({
            message: "Erreur Interne!",
            error: error.message
        });
    }
}
exports.getCustomer = (req, res) => {
    Vehicules.findByPk(req.params.id, 
                        {attributes: ['id', 'owner', 'marque', 'modele', 'immat', 'trans', 'year', 'carb']})
        .then(customer => {
          res.status(200).json(customer);
        }).catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Erreur Interne!",
              error: error
          });
        })
}

exports.customers = (req, res) => {
    // find all Customer information from 
    try{
        Vehicules.findAll({attributes: ['id', 'owner', 'marque', 'modele', 'immat', 'trans', 'year', 'carb']})
        .then(customers => {
            res.status(200).json(customers);
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });

    }
}

exports.deleteCustomer = async (req, res) => {
    try{
        let customerId = req.params.id;
        let customer = await Vehicules.findByPk(customerId);

        if(!customer){
            res.status(404).json({
                message: "Does Not exist a Customer with id = " + customerId,
                error: "404",
            });
        } else {
            await customer.destroy();
            res.status(200);
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a customer with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.updateCustomer = async (req, res, next) => {
    try{
        let customer = await Vehicules.findByPk(req.body.id);
    
        if(!customer){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a customer with id = " + customerId,
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                owner: req.body.owner,
                marque: req.body.marque,
                modele: req.body.modele,
                year: req.body.year,
                immat: req.body.immat,
                trans: req.body.trans,
                carb: req.body.carb
            }
            let result = await Vehicules.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['id', 'owner', 'marque', 'modele', 'immat', 'trans', 'year', 'carb']
                              }
                            );

            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a customer with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json(result);
        }
    } catch(error){
        next(err);
    }
}


//Reparateurs




exports.reparateurs = (req, res) => {
    // find all Customer information from 
    try{
        Reparateurs.findAll({attributes: ['id', 'repa', 'cat', 'respo', 'add', 'tel', 'capa', 'portail']})
        .then(reparateurs => {
            res.status(200).json(reparateurs);
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });

    }
}