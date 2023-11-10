const express = require('express');
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routers
app.use(require('./src/routers/index'));

app.listen(3000, () => {
    console.log(`Api corriendo: http://localhost:3000`);
})