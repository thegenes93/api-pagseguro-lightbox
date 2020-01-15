async function pagar(e) {
  //solicitando o codigo da transação ao backend
  await $.post(`/getcode`, { iten }, function (code) {
    let callback = {
      success: function (transactionCode) {
        console.log("sucesso");
      },
      abort: function () {
        console.log("abortado");
      }
    };
    let isOpenLightbox = PagSeguroLightbox(code, callback);
    // Redireciona o comprador, caso o navegador não tenha suporte ao Lightbox
    if (!isOpenLightbox) {
      location.href = "https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=" + code;
      console.log("Redirecionamento")
    }
  })
  e.submit();
}