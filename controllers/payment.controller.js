const PAYMENT_FILE_PATH = './payment-generated.txt';
const faker = require('faker');
const fs = require('fs');
const os = require('os')
const LINE_ENDING = os.EOL;
const utils = require('../test/utils');

module.exports = {
    create: function (req, res) {
        try {
            const fd = fs.openSync(PAYMENT_FILE_PATH, 'a');
            fs.appendFileSync(fd, faker.commerce.price() + LINE_ENDING, 'utf8');
            res
                .status(201)
                .json({
                    'message': 'Wuju!'
                })
        } catch (error) {
            res
                .status(500)
                .json({
                    'message': 'No wuju!',
                    'error': error
                })
        }
    },

    applyDiscount: async function (req, res) {
        dogstatsd.increment('payment.applyDiscount');
        //debera de restar una cantidad a cada precio en payment-generated.txt
        try {
            const discount = parseFloat(req.body.discount)
            const result = await utils.readFile(PAYMENT_FILE_PATH)
            const splitResult = result.split(os.EOL)
            let newText = ''
            if (discount) {
                splitResult.forEach(num => {
                    const numx = parseFloat(num)
                    if (!isNaN(numx)) {
                        const discounted = numx - discount
                        if (!isNaN(numx)) newText += `${discounted > 0 ? discounted : 0}${os.EOL}`
                        else newText += !num.includes('/') ? num : ''
                    }
                });
                if (newText !== '') utils.generatePaymentFile(newText)
            }
            res
                .status(201)
                .json({
                    'oldContent': result,
                    'newContent': newText
                })
        } catch (error) {
            console.error(error)
            res.json({
                'message': 'No wuju!',
                'error': error
            })
        }
    },

    getPromos: function (req, res) {
        dogstatsd.increment('payment.getPromos');
        // req to res
        res
            .status(201)
            .json([
                { name: "BUENFIN" },
                { name: "HOTSALE" },
                { name: "CYBERMONDAY" },
                { name: "BLACKFRIDAY" },
                { name: "PRIMEDAY" },
            ]);
    }
};
