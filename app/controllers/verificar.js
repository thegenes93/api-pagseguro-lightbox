'use strict'
const request = require('request');
var parseString = require('xml2js').parseString;
module.exports = app => {

    const noti = async (req, res) => {
        // variavel a são todos os dados que estão vindo da requisição
        const a = req.body
        //Coloque suas credencias do pagseguro
        let qs = {
            email: 'Email da conta do pagseguro',
            token: 'token gerado pelo pagseguro',
        }
        // uri link para requisão das atualização do status do pagamento / retirar sandbox para produção
        let options = await {
            uri: `https://ws.sandbox.pagseguro.uol.com.br/v3/transactions/notifications/${a.notificationCode}`,
            method: 'GET',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded; charset=ISO-8859-1',
            }, qs
        }
        // verificando o status da resposta
        await request(options, function (error, response) {
            if (!error && response.statusCode == 200) {
                parseString(response.body, function (err, result) {
                    let a
                    if (result.transaction.status[0] == 1) {
                        a = "Aguardando pagamento"
                    } else if (result.transaction.status[0] == 2) {
                        a = "Em análise"
                    } else if (result.transaction.status[0] == 3) {
                        a = "Pago"
                    } else if (result.transaction.status[0] == 4) {
                        a = "Disponivel"
                    } else if (result.transaction.status[0] == 5) {
                        a = "Em dispulta"
                    } else if (result.transaction.status[0] == 6) {
                        a = "Devolvido"
                    } else if (result.transaction.status[0] == 7) {
                        a = "Cancelado"
                    }
                    // retornando o status da cunsulta para o pagseguro

                    res.status(202).send("")

                });

            } else if (!error && response.statusCode == 404) {
                // retornando o status da cunsulta para o pagseguro
                res.status(404).send(error)
            }
        });
    }

    return { noti }
}