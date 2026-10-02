
document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       CONFIGURAÇÕES
    ========================= */

    const WHATSAPP = "5542999304153";

    const PRECO_HAMBURGUER = 15;
    const PRECO_REFRIGERANTE = 3;
    const TAXA_ENTREGA = 5;

    let quantidade = 1;
    let quantidadeRefrigerante = 0;


    /* =========================
       ELEMENTOS
    ========================= */

    const quantidadeElemento = document.getElementById("quantidade");
    const resumoQuantidade = document.getElementById("resumoQuantidade");
    const resumoSubtotal = document.getElementById("resumoSubtotal");
    const resumoRefrigerante = document.getElementById("resumoRefrigerante");
    const resumoQuantidadeRefrigerante = document.getElementById("resumoQuantidadeRefrigerante");
    const totalElemento = document.getElementById("total");
    const linhaTaxaEntrega = document.getElementById("linhaTaxaEntrega");

    const btnMais = document.getElementById("btnMais");
    const btnMenos = document.getElementById("btnMenos");
    const btnMaisRefri = document.getElementById("btnMaisRefri");
    const btnMenosRefri = document.getElementById("btnMenosRefri");
    const quantidadeRefriElemento = document.getElementById("quantidadeRefri");

    const btnWhatsApp = document.getElementById("btnWhatsApp");

    const tipoEntrega = document.getElementById("tipoEntrega");
    const dadosEntrega = document.getElementById("dadosEntrega");
    const pagamento = document.getElementById("pagamento");
    const pixInfo = document.getElementById("pixInfo");

    const nomeInput = document.getElementById("nome");
    const telefoneInput = document.getElementById("telefone");
    const enderecoInput = document.getElementById("endereco");
    const referenciaInput = document.getElementById("referencia");


    /* =========================
       VERIFICAR ELEMENTOS
    ========================= */

    const elementos = [
        quantidadeElemento,
        resumoQuantidade,
        resumoSubtotal,
        resumoRefrigerante,
        resumoQuantidadeRefrigerante,
        totalElemento,
        linhaTaxaEntrega,
        btnMais,
        btnMenos,
        btnMaisRefri,
        btnMenosRefri,
        quantidadeRefriElemento,
        btnWhatsApp,
        tipoEntrega,
        dadosEntrega,
        pagamento,
        pixInfo,
        nomeInput,
        telefoneInput,
        enderecoInput,
        referenciaInput
    ];

    if (elementos.some(elemento => elemento === null)) {
        console.error("Erro: algum elemento do HTML não foi encontrado.");
        return;
    }


    /* =========================
       FORMATAR MOEDA
    ========================= */

    function formatarMoeda(valor) {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }


    /* =========================
       ATUALIZAR RESUMO
    ========================= */

    function atualizarResumo() {

        const subtotal = PRECO_HAMBURGUER * quantidade;

        const valorRefrigerante =
            PRECO_REFRIGERANTE * quantidadeRefrigerante;

        const taxaEntrega =
            tipoEntrega.value === "Entrega"
                ? TAXA_ENTREGA
                : 0;

        const valorTotal =
            subtotal + valorRefrigerante + taxaEntrega;


        // Hambúrguer
        quantidadeElemento.textContent = quantidade;
        resumoQuantidade.textContent = quantidade;
        resumoSubtotal.textContent = formatarMoeda(subtotal);


        // Refrigerante
        quantidadeRefriElemento.textContent = quantidadeRefrigerante;
        resumoQuantidadeRefrigerante.textContent = quantidadeRefrigerante;
        resumoRefrigerante.textContent = formatarMoeda(valorRefrigerante);


        // Total
        totalElemento.textContent = formatarMoeda(valorTotal);


        // Taxa de entrega
        linhaTaxaEntrega.style.display =
            tipoEntrega.value === "Entrega" ? "flex" : "none";
    }


    /* =========================
       MAIS HAMBÚRGUER
    ========================= */

    btnMais.addEventListener("click", function () {
        quantidade++;
        atualizarResumo();
    });


    /* =========================
       MENOS HAMBÚRGUER
    ========================= */

    btnMenos.addEventListener("click", function () {
        if (quantidade > 1) {
            quantidade--;
            atualizarResumo();
        }
    });


    /* =========================
       MAIS REFRIGERANTE
    ========================= */

    btnMaisRefri.addEventListener("click", function () {
        quantidadeRefrigerante++;
        atualizarResumo();
    });


    /* =========================
       MENOS REFRIGERANTE
    ========================= */

    btnMenosRefri.addEventListener("click", function () {
        if (quantidadeRefrigerante > 0) {
            quantidadeRefrigerante--;
            atualizarResumo();
        }
    });


    /* =========================
       ENTREGA
    ========================= */

    tipoEntrega.addEventListener("change", function () {

        dadosEntrega.style.display =
            tipoEntrega.value === "Entrega" ? "block" : "none";

        atualizarResumo();
    });


    /* =========================
       PAGAMENTO
    ========================= */

    pagamento.addEventListener("change", function () {

        pixInfo.style.display =
            pagamento.value === "PIX" ? "block" : "none";
    });


    /* =========================
       MÁSCARA DE TELEFONE
    ========================= */

    telefoneInput.addEventListener("input", function (event) {

        let valor = event.target.value.replace(/\D/g, "");

        if (valor.length > 11) {
            valor = valor.substring(0, 11);
        }

        if (valor.length > 10) {
            valor = valor.replace(
                /^(\d{2})(\d{5})(\d{4}).*/,
                "($1) $2-$3"
            );
        } else if (valor.length > 6) {
            valor = valor.replace(
                /^(\d{2})(\d{4})(\d{0,4}).*/,
                "($1) $2-$3"
            );
        } else if (valor.length > 2) {
            valor = valor.replace(
                /^(\d{2})(\d{0,5}).*/,
                "($1) $2"
            );
        }

        event.target.value = valor;
    });


    /* =========================
       ENVIAR PEDIDO
    ========================= */

    btnWhatsApp.addEventListener("click", function () {

        const nome = nomeInput.value.trim();
        const telefone = telefoneInput.value.trim();
        const endereco = enderecoInput.value.trim();
        const referencia = referenciaInput.value.trim();

        const tipo = tipoEntrega.value;
        const formaPagamento = pagamento.value;


        // Validações
        if (nome === "") {
            alert("Por favor, informe seu nome.");
            nomeInput.focus();
            return;
        }

        if (telefone === "") {
            alert("Por favor, informe seu WhatsApp.");
            telefoneInput.focus();
            return;
        }

        if (tipo === "") {
            alert("Escolha se deseja entrega ou retirada na igreja.");
            tipoEntrega.focus();
            return;
        }

        if (tipo === "Entrega" && endereco === "") {
            alert("Informe o endereço para entrega.");
            enderecoInput.focus();
            return;
        }

        if (tipo === "Entrega" && referencia === "") {
            alert("Informe um ponto de referência.");
            referenciaInput.focus();
            return;
        }

        if (formaPagamento === "") {
            alert("Escolha a forma de pagamento.");
            pagamento.focus();
            return;
        }


        // Valores
        const subtotal = PRECO_HAMBURGUER * quantidade;

        const valorRefrigerante =
            PRECO_REFRIGERANTE * quantidadeRefrigerante;

        const taxaEntrega =
            tipo === "Entrega" ? TAXA_ENTREGA : 0;

        const valorTotal =
            subtotal + valorRefrigerante + taxaEntrega;


        // Mensagem
        let mensagem = "";

        mensagem += "🍔 *NOVO PEDIDO - BURGUER OBPC*\n\n";
        mensagem += "⛪ *OBPC UVARANAS*\n";
        mensagem += "❤️ Pedido em prol da reforma da igreja\n\n";

        mensagem += "👤 *Cliente:* " + nome + "\n";
        mensagem += "📱 *WhatsApp:* " + telefone + "\n\n";

        mensagem += "🛒 *PEDIDO*\n";
        mensagem += "🍔 Burguer OBPC\n";
        mensagem += "Quantidade: " + quantidade + "\n";
        mensagem += "Valor unitário: R$ 15,00\n";
        mensagem += "Subtotal: " + formatarMoeda(subtotal) + "\n";


        // Refrigerantes
        if (quantidadeRefrigerante > 0) {
            mensagem += "\n🥤 *Refrigerante mini 200 ml*\n";
            mensagem += "Quantidade: " + quantidadeRefrigerante + "\n";
            mensagem += "Valor unitário: R$ 3,00\n";
            mensagem += "Subtotal: " +
                formatarMoeda(valorRefrigerante) + "\n";
        }


        // Recebimento
        mensagem += "\n📦 *FORMA DE RECEBIMENTO:*\n";
        mensagem += tipo + "\n";

        if (tipo === "Entrega") {
            mensagem += "📍 *Endereço:* " + endereco + "\n";
            mensagem += "🧭 *Ponto de referência:* " + referencia + "\n";
            mensagem += "🚗 *Taxa de entrega:* R$ 5,00\n";
        }


        // Total
        mensagem += "\n🧾 *RESUMO DOS VALORES*\n";
        mensagem += "🍔 Hambúrgueres: " +
            formatarMoeda(subtotal) + "\n";

        if (quantidadeRefrigerante > 0) {
            mensagem += "🥤 Refrigerantes: " +
                formatarMoeda(valorRefrigerante) + "\n";
        }

        if (taxaEntrega > 0) {
            mensagem += "🚗 Entrega: R$ 5,00\n";
        }

        mensagem += "\n💰 *TOTAL: " +
            formatarMoeda(valorTotal) + "*\n";

        // Pagamento
        mensagem += "\n💳 *FORMA DE PAGAMENTO:* " +
            formaPagamento + "\n";

        if (formaPagamento === "PIX") {
            mensagem += "\n📲 *PIX:* 42 99930-4153\n";
            mensagem += "👤 Wagner Notargiacomo\n";
            mensagem += "Após o pagamento, envie o comprovante por aqui.\n";
        }

        mensagem += "\n❤️ Obrigado por contribuir com a reforma da nossa igreja!\n";
        mensagem += "⛪ *OBPC Uvaranas*";


        // Abrir WhatsApp
        const url =
            "https://wa.me/" + WHATSAPP +
            "?text=" + encodeURIComponent(mensagem);

        window.location.href = url;
    });


    /* =========================
       INICIAR
    ========================= */

    dadosEntrega.style.display = "none";
    pixInfo.style.display = "none";

    atualizarResumo();

});
