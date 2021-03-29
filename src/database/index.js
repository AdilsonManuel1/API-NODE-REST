const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/noderest',{useNewUrlParser: true});
//mongoose.connect('mongodb://localhost/noderest', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect('mongodb://localhost:27017/noderest', 
    { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true});
//mongoose.createConnection('mongodb://localhost/noderest', { useNewUrlParser: true });

mongoose.Promise = global.Promise;
module.exports = mongoose;

