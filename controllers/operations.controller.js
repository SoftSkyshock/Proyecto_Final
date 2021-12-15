module.exports = {
    getAll: function (req, res) {
        res.status(201)
        .json({
            'options': {
                'suma': '/operations/sum',
                'resta': '/operations/substract',
                'multiplicacion': '/operations/multiply',
                'division': '/operations/divide'
            }
        })
        .send();
    },
    sum: function (req, res) {
        const {a, b} = req.body
        res.status(201).json({
            'suma': `${a} + ${b} = ${parseFloat(a) + parseFloat(b)}`
        });
    },

    substract: function (req, res) {
        const {a, b} = req.body
        res.status(201).json({
            'resta': `${a} - ${b} = ${parseFloat(a) - parseFloat(b)}`
        });
    },

    multiply: function (req, res) {
        const {a, b} = req.body
        res.status(201).json({
            'multiplicacion': `${a} x ${b} = ${parseFloat(a) * parseFloat(b)}`
        });
    },

    divide: function (req, res) {
        const {a, b} = req.body
        const result = parseFloat(a) / parseFloat(b)
        res.status(201).json({
            'division': `${a} / ${b} = ${result.toFixed(2)}`
        });
    }
};
