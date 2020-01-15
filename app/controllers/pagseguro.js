'use strict'
const request = require('request');
var parseString = require('xml2js').parseString;

module.exports = app => {
    const code = async (req, res) => {
        //Coloque sua credencias do pagseguro
        let qs = {
            token: 'token gerado pelo pagseguro',
            email: 'email da sua conta do pagseguro',
            senderEmail: 'email do cliente',
            currency: 'BRL',
        }
        //add os demais dados do pedido OBs todos os dados deve ser string
        qs.reference = '1'
        qs.senderName = 'cliente'
        qs.shippingType = '1'
        qs.addressRequired = 'true'
        qs.shippingAddressPostalCode = 'cep'
        qs.shippingAddressStreet = 'rua'
        qs.shippingAddressNumber = 'numero'
        qs.shippingAddressComplement = 'complemento'
        qs.shippingAddressDistrict = 'bairro'
        qs.shippingAddressCity = 'cidade'
        qs.shippingAddressState = 'estado'
        qs.shippingAddressCountry = 'BRA'
        qs.shippingCost = 'valor do envio'
        qs.itemId1 = '1'
        qs.itemQuantity1 = '1'
        qs.itemDescription1 = 'camisa'
        qs.itemAmount1 = '10.0'

        //insira o link para requisição do codigo da transação
        let options = await {
            uri: 'https://ws.sandbox.pagseguro.uol.com.br/v2/checkout',
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=ISO-8859-1',
            }, qs
        }

        // solicitando o codigo de transação
        await request(options, function (error, response) {
            if (!error && response.statusCode == 200) {
                parseString(response.body, function (err, result) {
                    //enviando o codigo da transção para o front
                    res.json(result.checkout.code[0]);
                });

            } else if (!error && response.statusCode == 404) {
                console.log('deu 404');
            }
        });

    }

    return { code }
}