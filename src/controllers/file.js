const fs = require('fs');
const path = require('path')

exports.upload = async (req, res) => {
    try {
        let fstream;
        let defaultDir = 'public/'
        let dir = 'static/';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            fstream = fs.createWriteStream(defaultDir+dir+filename);
            file.pipe(fstream);
            fstream.on('close', function () {
                res.status(200).send(JSON.stringify({path:dir+filename}));           //where to go next
            });
        });
    } catch (e) {
        res.status(400).send(e);
    }
};
