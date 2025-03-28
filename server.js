
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
    Id INTEGER PRIMARY AUTOINCREMENT,
    RWidth INTEGER NOT NULL,
    RLength INTEGER NOT NULL,
    RHeight INTEGER NOT NULL,
    RVolume INTEGER NOT NULL,
    RInsulation TEXT NOT NULL,
    CPower INTEGER NOT NULL,
    HPower INTEGER NOT NULL,
    SPower INTEGER NOT NULL

    )`);

    app.post('api/klima',(req, res) => {
        const { Rwidth, Rlength, RHeight, ICode } = req.body;

        const myKlima = new klima.getDevice(RHeight, Rwidth, Rlength, ICode);

        const gVolume = myKlima.getVolume();
        const gCategory = myKlima.getCategory();
        const gCoolingP = myKlima.getCoolingPower();
        const gHeatingP = myKlima.getHeatingPower();
        const gConditioner = myKlima.getConditioner();

        db.run(`INSERT INTO klima (Rwidth, RELength, RHeight, RVolume, RInsulation, CPower, HPower, SPower) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
            [Rwidth, Rlength, RHeight, gVolume, gCategory, gCoolingP, gHeatingP, gConditioner],
            function(err) {
                if (err) return res.status(500).send(err.message);
                res.status(200).send({ message: 'Sikeres adatrögzítés.', id: this.lastID, })
                
            }
         )

    }) 




    app.listen(port,() => {
        console.log(`A szerver fut a ${port}-számú porton.`)
    });

    