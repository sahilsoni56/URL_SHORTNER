const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/URL_Shortner09", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });


module.exports = mongoose;