// server/index.js
const express = require("express");
const mongoClient = require('./MongoConnection/mongodb')
const PORT = process.env.PORT || 3001;

const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ limit: '900mb', extended: true }));

// Parse JSON bodies (as sent by API clients with a file limit of 900 MB)
app.use(express.json({ limit: '900mb' }));

// import file Function
app.get("/platforms", (req, res) => {
    mongoClient.fetchAllPlatforms().then((result) => {
        res.json({ data: result, status: 200 });
    }).catch(e => {
        console.log(e);
        res.json({ data: [], status: 400 });
    })

});

app.post("/updatePlatformField", (req, res) => {
    mongoClient.updatePlatforms(req.body.data.filter, req.body.data.updateDocument).then((result) => {
        res.json({ data: result, status: 200 });
    }).catch(e => {
        console.log(e);
        res.json({ data: [], status: 400 });
    })

});

app.post("/importFile", (req, res) => {
    mongoClient.insertRecord(req.body.data).then((result) => {
        res.json({ data: result, status: 200 });
    }).catch(e => {
        console.log(e);
        res.json({ data: [], status: 400 });
    })

});

// Listening Server
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});