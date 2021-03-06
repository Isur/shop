const Item = require('../models/Item');
const User = require('../models/User');
const faker = require('faker');

selectType = (numberOfItem, amountOfItems) => {
        if(1 <= numberOfItem  && numberOfItem <= amountOfItems / 4) 
            return 'TV';
        if(amountOfItems / 4 < numberOfItem && numberOfItem <= 2*amountOfItems / 4)
            return 'Phone';
        if(2 * amountOfItems / 4 < numberOfItem && numberOfItem <= 3*amountOfItems / 4)
            return 'Computer';
        if(3 * amountOfItems / 4< numberOfItem && numberOfItem <= amountOfItems)
            return 'Camera';
}

checkAndFillDatabase = (howMuch) => {
    User.find().then(val => {
        console.log(val.length);
        if(val.length === 0){
            let user = new User();
            user.firstName = "admin";
            user.lastName = "admin";
            user.login = "admin";
            user.setPassword("admin");
            user.mail = "admin@admin.admin";
            user.type = "admin";
            user.permissions.addProducts = true;
            user.save();

            for(let i = 1; i <=howMuch/20 - 1; i++){
                let user = new User();
                user.firstName = faker.fake("{{name.firstName}}");
                user.lastName = faker.fake("{{name.lastName}}");
                user.mail = faker.fake("{{internet.email}}");
                user.login = faker.fake("{{internet.userName}}");
                user.setPassword("password");
                user.type = 'user';
                user.permissions.addProducts = false;

                user.save();
            }

        }
            
    })

    Item.find().then(val => {
        console.log(val.length);
        if(val.length !== 0)
            return;
        else {        
            var product, money, producer, desc, image, type;
            for(let i=1;i<=howMuch;i++){
                product = faker.fake("{{commerce.productName}}");
                money = faker.fake("{{commerce.price}}");        
                producer = faker.fake("{{company.companyName}}");
                desc = faker.fake("{{lorem.paragraph}}");        
                number = faker.fake("{{random.number}}"); 
                image = `https://picsum.photos/250/300?image=${i}`;       
                description = faker.fake("{{lorem.paragraphs}}") + faker.fake("{{lorem.paragraphs}}") ;
                type = selectType(i, howMuch);
                    
                const newItem = new Item({
                    name: product,
                    description: desc,
                    longDescription: description,
                    value: money,
                    producer: producer,
                    imageLink: image,
                    itemType: type
                });
                newItem.save();
            }
            
            console.log('fill database with items - done');
        }
    })
}
module.exports = checkAndFillDatabase;
