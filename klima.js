class Cooler {
    constructor(m, sz, h, k) {
        this.magassag = m;
        this.szelesseg = sz;
        this.hosszusag = h;
        this.kategoria = k;
    }
    coolingPower = [25, 30, 40];
    heatingPower = [40, 60, 80];
    category = [
        { cat: 1, szig: 'szigetelt', power: 0 },
        { cat: 2, szig: 'részben szigetelt', power: 0 },
        { cat: 3, szig: 'szigeteletlen', power: 0 }
        
    ]
    getVolume = () => this.magassag * this.szelesseg * this.hosszusag;

    getCoolingPower = () => {
        let vol = this.getVolume();
        let cpow = 0;
        let i = 0;
        for(i = 0; i<this.coolingPower.length; i++){
            this.category[i].power = this.coolingPower[i];
        }
        switch (this.kategoria) {
            case 1:
                cpow = vol * this.category[0].power;
                break;
            case 2:
                cpow = vol * this.category[1].power;
                break;
            case 3:
                cpow = vol * this.category[2].power;
                break;
        }
        return Math.round(cpow);

    }

    getHeatingPower = () => {
        let vol = this.getVolume();
        let hpow = 0;
        let i = 0;
        for(i = 0; i<this.heatingPower.length; i++){
            this.category[i].power = this.heatingPower[i];
        }
        switch (this.kategoria) {
            case 1:
                
                hpow = vol * this.category[0].power;
                break;
            case 2:
                hpow = vol * this.category[1].power;
                break;
            case 3:
                hpow = vol * this.category[2].power;
                break;
        }
        return Math.round(hpow);
    }

getCategory = () => {

    let kat = "";
    switch (this.kategoria) {
        case 1:
            kat = "szigetelt";
            break;
        case 2:
            kat = "részben szigetelt"
            break;
        case 3:
            kat = "szigeteletlen"
            break;
    } 
    return kat;
}

}

/*
const myCooler = new Cooler(2.5, 3, 4, 3);
console.log("Hűtési teljesítmény: " + myCooler.getCoolingPower());
console.log("Fűtési teljesítmény: " + myCooler.getHeatingPower());
console.log("Szigetelési kategória: " + myCooler.getCategory());
*/

class getDevice extends Cooler{
    constructor(m, sz, h, k){
        super(m, sz, h, k);
    }
    
    standards = [2500, 3500, 5200, 7100, 10500, 14100];

    getConditioner(){
        let calculated = this.getHeatingPower();
        let accepted = 0;
        for(let i = 0; i < this.standards.length; i++) {
            if (this.standards[i] >= calculated){
                accepted = this.standards[i];
                break;
            }
        }
        return accepted;
    }  
}
/*const MyDevice = new getDevice(2.8, 3, 4, 1);
console.log("Helység térfogata: " + MyDevice.getVolume().toFixed(2));
console.log("Hűtési teljesítmény: " + MyDevice.getCoolingPower().toFixed(2));
console.log("Fűtési teljesítmény: " + MyDevice.getHeatingPower().toFixed(2));
console.log("Szigetelési kategória: " + MyDevice.getCategory());
console.log("Ajánlott teljesítmény kategória: " + MyDevice.getConditioner());
*/
module.exports = { getDevice };


