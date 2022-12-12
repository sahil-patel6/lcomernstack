var braintree = require("braintree");
var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "tpyv5rgb3d5k65xk",
    publicKey: "sj7q9v37zfksc8mc",
    privateKey: "f360d636609c997418e763e2cdff5899",
});
exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        console.log(response);
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(response);
        }
    });
};

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;
    gateway.transaction.sale(
        {
            amount: amountFromTheClient,
            paymentMethodNonce: nonceFromTheClient,
            options: {
                submitForSettlement: true,
            },
        },
        function (err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(result);
            }
        }
    );
};
