const apiURL = "https://projeto-final-modulo01-arnia.onrender.com/"
// const apiURL = "http://localhost:3000/"


//pega toda string da url
const barraEnderecoUrl = window.location.search;

//pega a parte da string da url depois do ponto de interrogação incluso ele
const urlParams = new URLSearchParams(barraEnderecoUrl);


//pega o valor da variável 'usuario' na url
const identificadorUsuario = Number.parseInt(urlParams.get('usuario'));

//Pega o valor da variável paciente
const identificadorPaciente = Number.parseInt(urlParams.get('paciente'));

const identificadorSessao = Number.parseInt(urlParams.get('sessao'));


const pegar_Usuario = async (dado) =>{
    try{ 
        const varUsuario = await fetch(apiURL+`usuarios/${dado}`);
        const vetUsuario =  await varUsuario.json();
        return vetUsuario;
    }catch(erro){
        console.log("Ocorreu um erro: ", erro);
    }
}

const obterSessao = async (idSessao) => {
    try{    
        const ObjetoSessao = await fetch(apiURL+`prontuario/${idSessao}`);
        const ObjetoSessaoJSON = await ObjetoSessao.json();
        return ObjetoSessaoJSON;
    }catch(erro){
        console.log('Ocorreu um erro: ', erro)
    }
}

const editarSessao = async (idSessao, sessaoEditada) => {
    try{
        await fetch(apiURL+`prontuario/${idSessao}`, {
                method: "PUT",
                headers:  {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sessaoEditada)
        });
    }catch(erro){
        console.log("Ocorreu um erro: ", erro);
    }
}


async function nomearUsuario(idUsuario){
    const usuario = await pegar_Usuario(idUsuario);

    document.getElementById('nomeUsuario').innerHTML =`${usuario.nome} 
    <div class="dropdown d-inline">
        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        </button>
        <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#"><label class="d-block" style="line-height: 10px; font-weight: 700" >Admin</label><div class="mt-0">${usuario.email}</div></a></li>
            <li><a class="dropdown-item" href="index.html" style="font-weight: 600"><img src="imagens/iconeEntrar.png" style="height: 25px; margin-right: 10px">Sair</a></li>
        </ul>
    </div>`
}

function editarLink(){
    document.getElementById("voltarProntuario").href = `prontuario.html?usuario=${identificadorUsuario}&paciente=${identificadorPaciente}`
}

async function imprimirSessao(idSessao){
    const sessao = await obterSessao(idSessao);
    document.querySelector('.corpoSessao').innerHTML = 
        `
        <div class="tituloCorpoSessao">${sessao.titulo}</div>
        <div class="dataCartao">${sessao.data} | ${sessao.horaInicioSessao}h - ${sessao.horaFimSessao}h</div>
        <div class="conteudoCartao mb-4">${sessao.texto}</div>
        <div class="tituloPagamento mb-3">Pagamento</div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-6 col-sm-3 p-0">
                    <div class="labelSessao ">valor</div>
                    <div class="valorSessao">R$${sessao.valorSessao}</div>
                </div>
                <div class="col-6 col-sm-4 p-0">
                    <div class="labelSessao">Forma de pagamento</div>
                    <div class="valorSessao">${sessao.formaPagamentoSessao}</div>
                </div>
                <div class="col-6 col-sm-3 p-0">
                    <div class="labelSessao">Status</div>
                    <div class="valorSessao">${sessao.estadoPagamentoSessao}</div>
                </div>
            </div>
        </div>
        <div class="opcoes">
            <!--<a href="#" data-bs-toggle="modal" data-bs-target="#ModalEditarSessao"><img src="imagens/logoEditar.png" alt=""></a>-->
            <a href="#" onclick="mostrarModalEditarSessao(${identificadorSessao})"><img src="imagens/logoEditar.png"></a>
            <a href="#" onclick="deletarSessaoOuFatoRelevante(${identificadorSessao})" ><img src="imagens/logoDeletar.png" ></a>
        </div>`
}

async function nomearUsuario_editaLink_mostraSessao(){
    await nomearUsuario(identificadorUsuario);
    editarLink();
    await imprimirSessao(identificadorSessao);
}

async function mostrarModalEditarSessao(idSessao){
    
    //capturar os elementos html pelo DOM
    let editarDataSessao = document.querySelector("#editarDataSessao");
    let editarHoraInicioSessao = document.querySelector("#editarHoraInicioSessao");
    let editarHoraFimSessao = document.querySelector("#editarHoraFimSessao");
    let editarTituloSessao = document.querySelector("#editarTituloSessao");
    let editarResumoSessao = document.querySelector("#editarResumoSessao");
    let editarValorSessao = document.querySelector("#editarValorSessao");
    let editarFormaPagamentoSessao = document.querySelector("#editarFormaPagamento");
    let listaRadios = document.querySelectorAll("input[name='editarEstadoPagamento']");

    //Requisita Sessão da API
    const sessao = await obterSessao(idSessao);

    //Preencher os campos do formulário com os Dados da Sessão
    editarDataSessao.value = sessao.data;
    editarHoraInicioSessao.value = sessao.horaInicioSessao;
    editarHoraFimSessao.value = sessao.horaFimSessao;
    editarTituloSessao.value = sessao.titulo;
    editarResumoSessao.value = sessao.texto;
    editarValorSessao.value = sessao.valorSessao;
    editarFormaPagamentoSessao.value = sessao.formaPagamentoSessao;

    if(sessao.estadoPagamentoSessao === "pago"){
        listaRadios[0].checked = true;
    }
    if(sessao.estadoPagamentoSessao === "nao_pago"){
        listaRadios[1].checked = true;
    }

    //Apresentar Modal de Edição da Sessão
    let ModalEditarSessao = new bootstrap.Modal(document.getElementById('modalEditarSessao'), {});
    ModalEditarSessao.show();


    document.getElementById('btn_editarSessao').addEventListener('click', async (evento) => {

        const sessaoEditada = {
            "data": editarDataSessao.value,
            "horaInicioSessao": editarHoraInicioSessao.value,
            "horaFimSessao": editarHoraFimSessao.value,
            "titulo": editarTituloSessao.value,
            "texto": editarResumoSessao.value,
            "valorSessao": editarValorSessao.value,
            "formaPagamentoSessao": editarFormaPagamentoSessao.value,
            "estadoPagamentoSessao": document.querySelector('input[name="editarEstadoPagamento"]:checked').value,
            "tipo": "sessao",
            "idPaciente": identificadorPaciente
        }

        await editarSessao(idSessao, sessaoEditada);
        await imprimirSessao(identificadorSessao);
        window.location.reload()
    })
}

const deletarSessaoOuFatoRelevante = async (idObjeto) => {
    const resposta = window.confirm("Tu tens certeza de que desejas fazer esta deleção?")
    if(resposta === true){
        try{    
            await fetch(apiURL+`prontuario/${idObjeto}`, {
                method: "DELETE"
            });
            window.location.href = `prontuario.html?usuario=${identificadorUsuario}&paciente=${identificadorPaciente}`;
        }catch(erro){
            console.log("Ocorreu um erro: ", erro)
        }
    }
}