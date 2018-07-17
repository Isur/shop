const Camera = require('../models/camera');
const TV = require('../models/tv');
const Phone = require('../models/phone');
const Computer = require('../models/computer');

const fillDatabase = (howMuch) => {
    Promise.all([Camera.find(), TV.find(), Computer.find(), Phone.find()]).then(
        val => { 
            const products = val[0].concat(val[1], val[2], val[3]);
            if(products.length === 0){
                for(let i=1;i<=howMuch;i++){
                    const newTV = new TV({
                        name: `NazwaTV ${i}`,
                        diagonal: i,
                        description: `Opis ${i}`,
                        value: i,
                        producer: `Producent ${i}`,
                        type: 'TV'
                    });
                    newTV.save();
                    const newPC = new Computer({
                        name: `NazwaPC ${i}`,
                        ram: i,
                        description: `Opis ${i}`,
                        value: i,
                        producer: `Producent ${i}`,
                        type: 'PC'
                    });
                    newPC.save();
                    const newCamera = new Camera({
                        name: `Nazwa Kamery ${i}`,
                        resolution: i,
                        description: `Opis ${i}`,
                        value: i,
                        producer: `Producent ${i}`,
                        type: 'Camera'
                    });
                    newCamera.save();
                    const newPhone = new Phone({
                        name: `Nazwa Telefonu ${i}`,
                        rom: i,
                        description: `Opis ${i}`,
                        value: i,
                        producer: `Producent ${i}`,
                        type: 'Phone'
                    });
                    newPhone.save();
               }


               console.log('fill database done');
            }
        })
   
    
}
module.exports = fillDatabase;
