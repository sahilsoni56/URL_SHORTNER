const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    url: { type: String, required: true },
    id: { type: String },
    clicks: { type: Number, default: 0 }
});
const UrlModel = mongoose.model("urlmodel", urlSchema);
module.exports = UrlModel;
