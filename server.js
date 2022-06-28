const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const db = require('./src/config/db.config');
const jwt = require('./src/helpers/jwt');
const errorHandler = require('./src/helpers/errpr-handler');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/image', express.static(__dirname + '/public/images'));
app.use(jwt());

app.use('/api/v1/authen', require('./src/routes/authen.routes'));
app.use('/api/v1/user', require('./src/routes/user.routes'));
app.use('/api/v1/shop', require('./src/routes/shop.routes'));
app.use('/api/v1/table', require('./src/routes/table.routes'));
app.use('/api/v1/partner', require('./src/routes/partner.routes'));
app.use('/api/v1/promotion', require('./src/routes/promotion.routes'));
app.use('/api/v1/protein', require('./src/routes/protein.routes'));
app.use('/api/v1/sale', require('./src/routes/sale.routes'));
app.use('/api/v1/menu', require('./src/routes/menu.routes'));
app.use('/api/v1/categories', require('./src/routes/categories.routes'));
app.use('/api/v1/printer', require('./src/routes/printer.routes'));
app.use('/api/v1/report', require('./src/routes/report.routes'));
app.use('/api/v1/card', require('./src/routes/card.routes'));

db.sequelize.sync({ force: false, alter: true }).then(() => {
  console.log('Drop and Resync with { force : true } ');
});

app.use(errorHandler);

const server = app.listen(process.env.PORT || 3000, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log(`The server is running %s:%s`, host, port);
});
