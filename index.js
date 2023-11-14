const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors')

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use('/static', express.static('uploads/products'));
app.use('/static', express.static('uploads/deals'));
// app.use(express.urlencoded({extended: false}));

//routers
//importar router 
const router = require('./src/routers/index.router');
const ConfigService = require("./src/services/ConfigService");
const config = new ConfigService();

app.use(router);
const PORT = config.get('port')
app.listen(PORT, () => {
  console.log(`Api corriendo: http://localhost:${PORT}`);
});