const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://System:1234@cluster0.mqpfc.mongodb.net/Program?retryWrites=true&w=majority',
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
})
.then(ok => console.log('Conntected to MongoDB'))
.catch(err => console.log('mongodb connection error',err))

module.exports = mongoose