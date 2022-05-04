const express = require('express');
const cors = require('cors')
const app = express();


app.use(cors());
app.use(express.json());   // allows json objects to be posted
app.use(express.urlencoded({ extended: true }));// allows json objects with strings and arrays

require('./config/mongoose.config');  // importing mongoose config file so it will fire up the MongoDB server connection
require('./routes/user.routes')(app); // we're importing the routes export


const port = 8000;
app.listen(port, () => console.log(`Listening on port: ${port}`) );
