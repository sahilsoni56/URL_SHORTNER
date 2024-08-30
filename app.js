const express = require('express');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const mongodb = require('./mongo-connection/mongo');
const urlmodel = require('./model/url_model'); 
const cors = require('cors');
const path = require('path');
const app = express();
app.use(express.json()); // Use JSON parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname,"public"))); 
app.set("view engine", "ejs");
app.get('/', (req, res) => {
    res.render('index', { shortUrl: "" });
});

app.post('/URL_ENCODE', async (req, res) => {
    const { OriginalUrl } = req.body;
    if (!OriginalUrl) {
        return res.status(400).render('index', { error: "Please provide an original URL." });
    }

    try {
        const id = uuidv4().slice(0, 8);
        const shortenedUrl = `localhost:3000/${id}`;
        const newUrl = new urlmodel({
            originalUrl: OriginalUrl,
            url: shortenedUrl,
            id: id
        });

        await newUrl.save();
        console.log(shortenedUrl);
        
        // Pass shortUrl to the EJS template
        res.render('index', { shortUrl: shortenedUrl });
    } catch (err) {
        console.error(err);
        res.status(500).render('index', { error: "An error occurred while shortening the URL." });
    }
});

app.get("/:shortUrl", async (req, res) => {
    try {
        const url = await urlmodel.findOne({ id: req.params.shortUrl });
        if (url) {
            res.redirect(url.originalUrl);
        } else {
            res.status(404).send("URL not found.");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while redirecting to the URL.");
    }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
