import axios from 'axios';
const fillDatabase = (howMuch) => {
   for(let i=1;i<=howMuch;i++){
        axios.post('/api/addTV',{
            name: `NazwaTV ${i}`,
            diagonal: i,
            description: `Opis ${i}`,
            value: i,
            producer: `Producent ${i}`,
            type: 'TV'
        });
        axios.post('/api/addComputer',{
            name: `NazwaPC ${i}`,
            ram: i,
            description: `Opis ${i}`,
            value: i,
            producer: `Producent ${i}`,
            type: 'PC'
        });
        axios.post('/api/addCamera',{
            name: `Nazwa Kamery ${i}`,
            resolution: i,
            description: `Opis ${i}`,
            value: i,
            producer: `Producent ${i}`,
            type: 'Camera'
        });
        axios.post('/api/addPhone',{
            name: `Nazwa Telefonu ${i}`,
            rom: i,
            description: `Opis ${i}`,
            value: i,
            producer: `Producent ${i}`,
            type: 'Phone'
        })
   }
}

export default fillDatabase;
