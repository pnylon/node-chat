// Built in module to fix paths - console.log(__dirname + '/../public');
const path = require('path');
const express = require('express')

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
let app = express();

app.use(express.static(publicPath));

// app.get('/', (req, req) => {
//     res.render('home')
// });

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});