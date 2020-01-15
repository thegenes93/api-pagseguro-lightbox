module.exports = app => {
    let controllers = app.app.controllers

    //Sem controle de sessão   
    app.route('/')
        .get(controllers.render.index)

    app.route('/notify')
        .post(controllers.verificar.noti)

    app.route('/getcode')
        .post(controllers.pagseguro.code)

    app.route('/*')
        .get(controllers.render.index)
}
