var express = require("express");
var formidable = require("formidable");
var path = require("path");
var fs = require("fs");
var app = express();
app.use(express.static("uploads"));

app.post("/api/upload", (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = "./uploads";

    form.parse(req, (err, fields, files) => {
        console.log(fields);
        var pathForImage = "uploads/" + fields.id + ".jpg";

        fs.rename(files.avatar.path, pathForImage, function (err) {
            if (err) {
                console.log(err);
                return res.json({ error: "Error uploading file" });
            }
            files.avatar.path = __dirname + pathForImage;
            res.json({ fields, files });
        });
    });
});

app.listen(8000, () => {
    console.log("App is up and running");
});
