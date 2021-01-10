const fs = require('fs');
const uniqid = require('uniqid');

module.exports = (app) => {
   const dataNote = require(__dirname + '/../Develop/db/db.json');

    app.get('api/notes', (req, res) =>{
        res.json(dataNote);
    }); 

    app.post ('api/notes', (req, res) => {
        const newNote = req.body;
        newNote.id = uniqid();

        dataNote.push(newNote);

        const rawNote = JSON.stringify(dataNote);

        fs.writeFile(__dirname + '/../Develop/db/db.json', rawNote, (err) => {
            if (err) throw err;
        });
        res.end();
    });

    app.delete('/api/notes/:id', (req, res) => {
        const idNote = req.params.id;

        const filterNotes = dataNote.filter(function (note){
            return note.id != idNote;
        });

        newDataNote = JSON.stringify(filterNotes);
        dataNote = filterNotes;

        fs.writeFileSync(__dirname + '../Develop/db/db.json', newDataNote, (err) => {
            if (err) throw err;
        });
        res.end();
    });
};