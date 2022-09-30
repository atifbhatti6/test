const express = require('express');
const app = express();
const PORT = 5000;
const connectDB = require('./database/db');
const routes = require('./routes/api/index');
const bodyParser = require('body-parser');
var multer = require('multer');
var forms = multer();
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(forms.array()); 
// parse application/json
app.use(bodyParser.json())

//all routes
app.use(routes);

connectDB().then(() => {
    app.listen(PORT,() => {
        console.log(`Server is listening on http://localhost:${PORT}`);
    })
});