
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 3000;
const klima = require('./klima');

app.use(express.json());
app.use(cors());

const db = new sqlite3.Database("klima.db", (err) => {
    if  (err){
        console.log(err.message);
    }
    else{
        console.log("Az adatbázis kapcsolat létrejött");
    }
});

db.run(`CREATE TABLE IF NOT EXISTS klima (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    RWidth INTEGER NOT NULL,
    RLength INTEGER NOT NULL,
    RHeight INTEGER NOT NULL,
    RVolume INTEGER NOT NULL,
    RInsulation TEXT NOT NULL,
    CPower INTEGER NOT NULL,
    HPower INTEGER NOT NULL,
    SPower INTEGER NOT NULL

    )`);

    app.post('/api/klima',(req, res) => {
        const { width, length, height, insulation } = req.body;

        const myKlima = new klima.getDevice(height, width, length, insulation);

        const gVolume = myKlima.getVolume().toFixed(2);
        const gCategory = myKlima.getCategory();
        const gCoolingP = myKlima.getCoolingPower();
        const gHeatingP = myKlima.getHeatingPower();
        const gConditioner = myKlima.getConditioner();
        /*console.log(width);
        console.log(height);
        console.log(length);
        console.log(insulation);
        console.log(gVolume);
        console.log(gCategory);
        console.log(gCoolingP);
        console.log(gHeatingP);
        console.log(gConditioner);*/

        db.run(`INSERT INTO klima (RWidth, RLength, RHeight, RVolume, RInsulation, CPower, HPower, SPower) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
            [width, length, height, gVolume, gCategory, gCoolingP, gHeatingP, gConditioner],
            function(err) {
                if (err) return res.status(500).json({message: err.message});
                res.status(200).json({ message: 'Sikeres adatrögzítés.',
                    id: this.lastID,width,length,height,gVolume,gCategory,gCoolingP,gHeatingP,gConditioner
                })
                
            }
         )

    }) 
app.get('/api/klima', (req, res) => {
    db.all(`SELECT * FROM klima`, [], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Hiba történt az adatok kiolvasása során' });
        } 
        res.status(200).json(data);
    });

});

app.get('/api/klima/last', (req, res) => {
    db.all(`SELECT * FROM klima ORDER BY rowid DESC LIMIT 1`, [], (err, lastrow) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Hiba történt az utolsó rekord kiolvasása során' });
        } 
        res.status(200).json(lastrow);
    });

});



    app.listen(port,() => {
        console.log(`A szerver fut a ${port}-számú porton.`)
    });

    
