const Camera = require('../models/camera');
const TV = require('../models/tv');
const Phone = require('../models/phone');
const Computer = require('../models/computer');
const faker = require('faker');
//const desc = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, placeat adipisci. Minus rem dignissimos cum sunt saepe porro veritatis velit obcaecati dolor voluptatibus fugiat, nisi iure quasi impedit esse sapiente!";


console.log(faker.fake("{{commerce.productName}}"));

var product = faker.fake("{{commerce.productName}}");   
var money = faker.fake("{{commerce.price}}");           
var producer = faker.fake("{{company.companyName}}");
var desc = faker.fake("{{lorem.paragraph}}");           
var number = faker.fake("{{random.number}}");          
var image = `https://picsum.photos/200/300?image=1`;
const fillDatabase = (howMuch) => {
    Promise.all([Camera.find(), TV.find(), Computer.find(), Phone.find()]).then(
        val => { 
            const products = val[0].concat(val[1], val[2], val[3]);
            if(products.length === 0){
                for(let i=1;i<=howMuch;i++){
                    product = faker.fake("{{commerce.productName}}");
                    money = faker.fake("{{commerce.price}}");        
                    producer = faker.fake("{{company.companyName}}");
                    desc = faker.fake("{{lorem.paragraph}}");        
                    number = faker.fake("{{random.number}}"); 
                    image = `https://picsum.photos/200/300?image=1${i}`;       
                    const newTV = new TV({
                        name: product,
                        diagonal: number,
                        description: desc,
                        value: money,
                        producer: producer,
                        imageLink: image,
                        type: 'TV'
                    });
                    product = faker.fake("{{commerce.productName}}");
                    money = faker.fake("{{commerce.price}}");        
                    producer = faker.fake("{{company.companyName}}");
                    desc = faker.fake("{{lorem.paragraph}}");        
                    number = faker.fake("{{random.number}}");  
                    image = `https://picsum.photos/200/300?image=2${i}`;      
                    newTV.save();
                    const newPC = new Computer({
                        name: product,
                        ram: number,
                        description: desc,
                        value: money,
                        producer: producer,
                        imageLink: image,
                        type: 'PC'
                    });
                    product = faker.fake("{{commerce.productName}}");
                    money = faker.fake("{{commerce.price}}");        
                    producer = faker.fake("{{company.companyName}}");
                    desc = faker.fake("{{lorem.paragraph}}");        
                    number = faker.fake("{{random.number}}");     
                    image = `https://picsum.photos/200/300?image=4${i}`;   
                    newPC.save();
                    const newCamera = new Camera({
                        name: product,
                        resolution: number,
                        description: desc,
                        value: money,
                        producer: producer,
                        imageLink: image,
                        type: 'Camera'
                    });
                    product = faker.fake("{{commerce.productName}}");
                    money = faker.fake("{{commerce.price}}");        
                    producer = faker.fake("{{company.companyName}}");
                    desc = faker.fake("{{lorem.paragraph}}");        
                    number = faker.fake("{{random.number}}");     
                    image = `https://picsum.photos/200/300?image=3${i}`;   
                    newCamera.save();
                    const newPhone = new Phone({
                        name: product,
                        rom: number,
                        description: desc,
                        value: money,
                        producer: producer,
                        imageLink: image,
                        type: 'Phone'
                    });
                    newPhone.save();
               }


               console.log('fill database done');
            }
        })
   
    
}
module.exports = fillDatabase;
