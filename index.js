const express = require('express');
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routers
//importar router 
const router = require('./src/routers/index');
app.use(router);

app.listen(3000, () => {
    console.log(`Api corriendo: http://localhost:3000`);
});