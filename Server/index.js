const express = require('express');
const bodyParser =  require ('body-parser');
const cors =  require('cors');

const user = require('./Controller/userController');

var app = express();
app.use(bodyParser.json());
app.use(cors({origin:'*'}));

app.listen(3000,console.log('Server running at port 3000'));
app.use('/api/users',user);