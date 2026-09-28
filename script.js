/* =========================================================
   BURGUER OBPC - PEDIDOS PELO WHATSAPP
========================================================= */


/* =========================================================
   CONFIGURAÇÕES
========================================================= */

// Mesmo número do PIX e do WhatsApp que recebe os pedidos
const WHATSAPP = "5542999304153";

// Preço do Burguer OBPC
const PRECO_HAMBURGUER = 15;


// Quantidade inicial
let quantidade = 1;



/* =========================================================
   ELEMENTOS
========================================================= */

const quantidadeElemento =
    document.getElementById("quantidade");

const resumoQuantidade =
    document.getElementById("resumoQuantidade");

const resumoSubtotal =
    document.getElementById("resumoSubtotal");

const totalElemento =
    document.getElementById("total");

const btnMais =
    document.getElementById("btnMais");

const btnMenos =
    document.getElementById("btnMenos");

const btnWhatsApp =
    document.getElementById("btnWhatsApp");

const tipoEntrega =
    document.getElementById("tipoEntrega");

const dadosEntrega =
    document.getElementById("dadosEntrega");

const pagamento =
    document.getElementById("pagamento");

const pixInfo =
    document.getElementById("pixInfo");



/* =========================================================
   FORMATAR MOEDA
========================================================= */

function formatarMoeda(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}



/* =========================================================
   ATUALIZAR RESUMO
========================================================= */

function atualizarResumo() {

    const total =
        PRECO_HAMBURGUER * quantidade;


    quantidadeElemento.textContent =
        quantidade;


    resumoQuantidade.textContent =
        quantidade;


    resumoSubtotal.textContent =
        formatarMoeda(total);


    totalElemento.textContent =
        formatarMoeda(total);

}



/* =========================================================
   AUMENTAR QUANTIDADE
========================================================= */

btnMais.addEventListener(
    "click",
    function () {

        quantidade++;

        atualizarResumo();

    }
);



/* =========================================================
   DIMINUIR QUANTIDADE
========================================================= */

btnMenos.addEventListener(
    "click",
    function () {

        if (quantidade > 1) {

            quantidade--;

            atualizarResumo();

        }

    }
);



/* =========================================================
   ENTREGA / RETIRADA
========================================================= */

tipoEntrega.addEventListener(
    "change",
    function () {

        if (
            tipoEntrega.value ===
            "Entrega"
        ) {

            dadosEntrega.style.display =
                "block";

        } else {

            dadosEntrega.style.display =
                "none";

        }

    }
);



/* =========================================================
   PAGAMENTO
========================================================= */

pagamento.addEventListener(
    "change",
    function () {

        if (
            pagamento.value ===
            "PIX"
        ) {

            pixInfo.style.display =
                "block";

        } else {

            pixInfo.style.display =
                "none";

        }

    }
);



/* =========================================================
   ENVIAR PEDIDO
========================================================= */

btnWhatsApp.addEventListener(
    "click",
    function () {


        /* ---------------------------------------------
           DADOS
        --------------------------------------------- */

        const nome =
            document
                .getElementById("nome")
                .value
                .trim();


        const telefone =
            document
                .getElementById("telefone")
                .value
                .trim();


        const retiradaIngredientes =
            document
                .getElementById("retirar")
                .value
                .trim();


        const endereco =
            document
                .getElementById("endereco")
                .value
                .trim();


        const referencia =
            document
                .getElementById("referencia")
                .value
                .trim();


        const tipo =
            tipoEntrega.value;


        const formaPagamento =
            pagamento.value;



        /* ---------------------------------------------
           VALIDAR NOME
        --------------------------------------------- */

        if (nome === "") {

            alert(
                "Por favor, informe seu nome."
            );

            document
                .getElementById("nome")
                .focus();

            return;

        }



        /* ---------------------------------------------
           VALIDAR WHATSAPP
        --------------------------------------------- */

        if (telefone === "") {

            alert(
                "Por favor, informe seu WhatsApp."
            );

            document
                .getElementById("telefone")
                .focus();

            return;

        }



        /* ---------------------------------------------
           VALIDAR ENTREGA / RETIRADA
        --------------------------------------------- */

        if (tipo === "") {

            alert(
                "Escolha se deseja entrega ou retirada na igreja."
            );

            tipoEntrega.focus();

            return;

        }



        /* ---------------------------------------------
           VALIDAR DADOS DE ENTREGA
        --------------------------------------------- */

        if (
            tipo === "Entrega" &&
            endereco === ""
        ) {

            alert(
                "Informe o endereço para entrega."
            );

            document
                .getElementById("endereco")
                .focus();

            return;

        }


        if (
            tipo === "Entrega" &&
            referencia === ""
        ) {

            alert(
                "Informe um ponto de referência."
            );

            document
                .getElementById("referencia")
                .focus();

            return;

        }



        /* ---------------------------------------------
           VALIDAR PAGAMENTO
        --------------------------------------------- */

        if (formaPagamento === "") {

            alert(
                "Escolha a forma de pagamento."
            );

            pagamento.focus();

            return;

        }



        /* ---------------------------------------------
           CALCULAR TOTAL
        --------------------------------------------- */

        const total =
            PRECO_HAMBURGUER *
            quantidade;



        /* ---------------------------------------------
           MONTAR MENSAGEM
        --------------------------------------------- */

        let mensagem = "";


        mensagem +=
            "🍔 *NOVO PEDIDO - BURGUER OBPC*";


        mensagem +=
            "\n\n";


        mensagem +=
            "⛪ *OBPC UVARANAS*";


        mensagem +=
            "\n";


        mensagem +=
            "❤️ Pedido em prol da reforma da igreja";


        mensagem +=
            "\n\n";



        /* ---------------------------------------------
           CLIENTE
        --------------------------------------------- */

        mensagem +=
            "👤 *Cliente:* " +
            nome;


        mensagem +=
            "\n";


        mensagem +=
            "📱 *WhatsApp:* " +
            telefone;



        /* ---------------------------------------------
           PEDIDO
        --------------------------------------------- */

        mensagem +=
            "\n\n";


        mensagem +=
            "🍔 *PEDIDO*";


        mensagem +=
            "\n";


        mensagem +=
            "Burguer OBPC";


        mensagem +=
            "\n";


        mensagem +=
            "Quantidade: " +
            quantidade;


        mensagem +=
            "\n";


        mensagem +=
            "Valor unitário: " +
            formatarMoeda(
                PRECO_HAMBURGUER
            );


        mensagem +=
            "\n";


        mensagem +=
            "💰 *TOTAL: " +
            formatarMoeda(total) +
            "*";



        /* ---------------------------------------------
           ENTREGA / RETIRADA
        --------------------------------------------- */

        mensagem +=
            "\n\n";


        mensagem +=
            "📦 *FORMA DE RECEBIMENTO:*";


        mensagem +=
            "\n";


        mensagem +=
            tipo;



        if (
            tipo === "Entrega"
        ) {

            mensagem +=
                "\n";


            mensagem +=
                "📍 *Endereço:* " +
                endereco;


            mensagem +=
                "\n";


            mensagem +=
                "🧭 *Ponto de referência:* " +
                referencia;

        }



        /* ---------------------------------------------
           INGREDIENTES
        --------------------------------------------- */

        if (
            retiradaIngredientes !== ""
        ) {

            mensagem +=
                "\n\n";


            mensagem +=
                "🚫 *Deseja retirar:*";


            mensagem +=
                "\n";


            mensagem +=
                retiradaIngredientes;

        }



        /* ---------------------------------------------
           PAGAMENTO
        --------------------------------------------- */

        mensagem +=
            "\n\n";


        mensagem +=
            "💳 *FORMA DE PAGAMENTO:*";


        mensagem +=
            "\n";


        mensagem +=
            formaPagamento;



        if (
            formaPagamento === "PIX"
        ) {

            mensagem +=
                "\n\n";


            mensagem +=
                "📲 *PIX:* 42 99930-4153";


            mensagem +=
                "\n";


            mensagem +=
                "👤 Wagner Notargiacomo";


            mensagem +=
                "\n";


            mensagem +=
                "Após o pagamento, o comprovante pode ser enviado por aqui.";

        }



        /* ---------------------------------------------
           FINAL
        --------------------------------------------- */

        mensagem +=
            "\n\n";


        mensagem +=
            "❤️ Obrigado por contribuir com a reforma da nossa igreja!";


        mensagem +=
            "\n";


        mensagem +=
            "⛪ *OBPC Uvaranas*";



        /* ---------------------------------------------
           CODIFICAR
        --------------------------------------------- */

        const mensagemCodificada =
            encodeURIComponent(
                mensagem
            );



        /* ---------------------------------------------
           LINK WHATSAPP
        --------------------------------------------- */

        const url =
            "https://wa.me/" +
            WHATSAPP +
            "?text=" +
            mensagemCodificada;



        /* ---------------------------------------------
           ABRIR WHATSAPP
        --------------------------------------------- */

        window.location.href =
            url;

    }
);



/* =========================================================
   MÁSCARA DE TELEFONE
========================================================= */

const telefoneInput =
    document.getElementById("telefone");


telefoneInput.addEventListener(
    "input",
    function (event) {

        let valor =
            event.target.value
                .replace(/\D/g, "");


        if (
            valor.length > 11
        ) {

            valor =
                valor.substring(
                    0,
                    11
                );

        }


        if (
            valor.length > 10
        ) {

            valor =
                valor.replace(
                    /^(\d{2})(\d{5})(\d{4}).*/,
                    "($1) $2-$3"
                );

        }

        else if (
            valor.length > 6
        ) {

            valor =
                valor.replace(
                    /^(\d{2})(\d{4})(\d{0,4}).*/,
                    "($1) $2-$3"
                );

        }

        else if (
            valor.length > 2
        ) {

            valor =
                valor.replace(
                    /^(\d{2})(\d{0,5}).*/,
                    "($1) $2"
                );

        }


        event.target.value =
            valor;

    }
);



/* =========================================================
   INICIAR
========================================================= */

atualizarResumo();
