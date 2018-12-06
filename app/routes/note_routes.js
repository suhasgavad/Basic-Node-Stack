var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    
    app.get('/customers/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) }
        db.collection('customerDetails').findOne(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send(item);
          }
        });
      });

    app.post('/customers', (req, res) => {
        const details = { custName: req.body.custName, foodItem: req.body.foodItem };
        db.collection('customerDetails').insert(details, (err, result) => {
          if (err) { 
            res.send({ 'error': 'An error has occurred' }); 
          } else {
            res.send(result.ops[0]);
          }
        });
    });

    app.delete('/customers/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('customerDetails').remove(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send('Customer ' + id + ' deleted!');
          } 
        });
      });

      app.put('/customers/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const custdetails = { custName: req.body.custName, foodItem: req.body.foodItem };
        db.collection('customerDetails').update(details, custdetails, (err, result) => {
          if (err) {
              res.send({'error':'An error has occurred'});
          } else {
              res.send(custdetails);
          } 
        });
      });
  };