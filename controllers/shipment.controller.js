//deberas de utilizar faker para generar los datos
const faker = require('faker');

module.exports = {
    createShipment: function (req, res) {
        dogstatsd.increment('shipment.createShipment');
        //debera de simular un envio con dirección un precio y una persona con sus datos
        const name = faker.name.firstName()
        const lastName = faker.name.lastName()
        const address = `${faker.address.streetAddress(true)}, ${faker.address.zipCode()}, ${faker.address.city()}, ${faker.address.state()}}`
        res
        .status(201)
        .json({
            'address': address,
            'price': faker.finance.amount(),
            'user': {
                'name': name,
                'lastName': lastName,
                'phone': faker.phone.phoneNumber(),
                'email': faker.internet.email(name, lastName, 'solotrucking.com')
            }
        });
    },
    changeStatus: function (req, res) {
        dogstatsd.increment('shipment.changeStatus');
        //Debera de retornar una dirección random
        const address = `${faker.address.streetAddress(true)}, ${faker.address.zipCode()}, ${faker.address.city()}, ${faker.address.state()}}`
        // codigo de respuesta 201
        // data la direcciòn random
        res
            .status(201)
            .json({address: address})
    },
};
