const apiURL = "https://projeto-final-modulo01-arnia.onrender.com/"

//pega toda string da url
const barraEnderecoUrl = window.location.search;

//pega a parte da string da url depois do ponto de interrogação incluso ele
const urlParams = new URLSearchParams(barraEnderecoUrl);

//pega o valor da variável 'usuario' na url
const identificadorUsuario = Number.parseInt(urlParams.get('usuario'));

//Pega o valor da variável paciente
const identificadorPaciente = Number.parseInt(urlParams.get('paciente'))



const pegar_Usuario = async (dado) =>{
    try{ 
        const varUsuario = await fetch(apiURL+`usuarios/${dado}`)
        const vetUsuario =  await varUsuario.json()
        return vetUsuario
    }catch(erro){
        console.log("Ocorreu um erro: ", erro)
    }
}

const obterPacienteEspecifico = async (idPaciente) => {
    try{
        const paciente = await fetch(apiURL+`pacientes/${idPaciente}`)
        const pacienteJSON = await paciente.json()
        return pacienteJSON
    }catch(erro){
        console.log("Ocorreu um erro: ", erro)
    }
}

const deletarSessaoOuFatoRelevante = async (idObjeto) => {
    const resposta = window.confirm("Tu tens certeza de que desejas fazer esta deleção?")
    if(resposta === true){
        try{    
            fetch(apiURL+`prontuario/${idObjeto}`, {
                method: "DELETE"
            });
            await imprimirProntuario(identificadorPaciente);
        }catch(erro){
            console.log("Ocorreu um erro: ", erro)
        }
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

function linkVoltarPraListagem(){
    document.getElementById('voltarPgPacientes').href = `pacientes.html?usuario=${identificadorUsuario}`
}

/* function editaTagSelectFiltro(){
    console.log("Entrou na função editaTagSelectFiltro()")
    document.getElementById("selectFiltro").innerHTML = 
    `<select id="filtroSelect" class="form-select form-select-sm" style="width: 365px;">
        <option selected>Filtrar por:</option>
        <optgroup label="Ordem Inversa de Registro:">
            <option onclick="imprimirFiltrosProntuario(${identificadorPaciente}, 'todos_ordemInversaDeRegistro')" value="todos_ordemInversaDeRegistro">Todos (Ordem Inversa de Registro)</option>
            <option onclick="imprimirFiltrosProntuario(${identificadorPaciente}, 'sessao_ordemInversaDeRegistro')" value="sessao_ordemInversaDeRegistro">Sessão (Ordem Inversa de Registro)</option>
            <option onclick="imprimirFiltrosProntuario(${identificadorPaciente}, 'fatoRelevante_ordemInversaDeRegistro')" value="fatoRelevante_ordemInversaDeRegistro">Fato Relevante (Ordem Inversa de Registro)</option>
        </optgroup>
        <optgroup label="Ordem de Registro:">
            <option onclick="imprimirFiltrosProntuario(${identificadorPaciente}, 'todos_ordemDeRegistro')" value="todos_ordemDeRegistro">Todos (Ordem de Registro)</option>
            <option onclick="imprimirFiltrosProntuario(${identificadorPaciente}, 'sessao_ordemDeRegistro')" value="sessao_ordemDeRegistro">Sessão (Ordem de Registro)</option>
            <option onclick="imprimirFiltrosProntuario(${identificadorPaciente}, 'fatoRelevante_ordemDeRegistro')" value="fatoRelevante_ordemDeRegistro">Fato Relevante (Ordem de Registro)</option>
        </optgroup>
        
        <optgroup label="Ordem Crescente de Data:">
            <option onclick="imprimirFiltrosProntuario(${identificadorPaciente}, 'todos_ordemCrescenteDeData')" value="todos_ordemCrescenteDeData">Todos (Ordem Crescente de Data)</option>
            <option onclick="imprimirFiltrosProntuario(${identificadorPaciente}, 'sessao_ordemCrescenteDeData')" value="sessao_ordemCrescenteDeData">Sessão (Ordem Crescente de Data)</option>
            <option onclick="imprimirFiltrosProntuario(${identificadorPaciente}, 'fatoRelevante_ordemCrescenteDeData')" value="fatoRelevante_ordemCrescenteDeData">Fato Relevante (Ordem Crescente de Data)</option>
        </optgroup>
        <optgroup label="Ordem Decrescente de Data:">
            <option onclick="imprimirFiltrosProntuario(${identificadorPaciente}, 'todos_ordemDecrescenteDeData')" value="todos_ordemDecrescenteDeData">Todos (Ordem Decrescente de Data)</option>
            <option onclick="imprimirFiltrosProntuario(${identificadorPaciente}, 'sessao_ordemDecrescenteDeData')" value="sessao_ordemDecrescenteDeData">Sessão (Ordem Decrescente de Data)</option>
            <option onclick="imprimirFiltrosProntuario(${identificadorPaciente}, 'fatoRelevante_ordemDecrescenteDeData')" value="fatoRelevante_ordemDecrescenteDeData">Fato Relevante (Ordem Decrescente de Data)</option>
        </optgroup>
    </select>`
    
} */

function editaTagSelectFiltro(){
    console.log("Entrou na função editaTagSelectFiltro()")
    document.getElementById("selectFiltro").innerHTML = 
    `<select id="filtroSelect" class="form-select form-select-sm" style="width: 365px;">
        <option selected>Filtrar por:</option>
        <optgroup label="Ordem Inversa de Registro:">
            <option  value="todos_ordemInversaDeRegistro">Todos (Ordem Inversa de Registro)</option>
            <option  value="sessao_ordemInversaDeRegistro">Sessão (Ordem Inversa de Registro)</option>
            <option  value="fatoRelevante_ordemInversaDeRegistro">Fato Relevante (Ordem Inversa de Registro)</option>
        </optgroup>
        <optgroup label="Ordem de Registro:">
            <option  value="todos_ordemDeRegistro">Todos (Ordem de Registro)</option>
            <option  value="sessao_ordemDeRegistro">Sessão (Ordem de Registro)</option>
            <option  value="fatoRelevante_ordemDeRegistro">Fato Relevante (Ordem de Registro)</option>
        </optgroup>
        
        <optgroup label="Ordem Crescente de Data:">
            <option  value="todos_ordemCrescenteDeData">Todos (Ordem Crescente de Data)</option>
            <option  value="sessao_ordemCrescenteDeData">Sessão (Ordem Crescente de Data)</option>
            <option  value="fatoRelevante_ordemCrescenteDeData">Fato Relevante (Ordem Crescente de Data)</option>
        </optgroup>
        <optgroup label="Ordem Decrescente de Data:">
            <option  value="todos_ordemDecrescenteDeData">Todos (Ordem Decrescente de Data)</option>
            <option  value="sessao_ordemDecrescenteDeData">Sessão (Ordem Decrescente de Data)</option>
            <option  value="fatoRelevante_ordemDecrescenteDeData">Fato Relevante (Ordem Decrescente de Data)</option>
        </optgroup>
    </select>`
    console.log(document.getElementById("selectFiltro"))
}

async function nomeiaUsario_editaLink_apresentaProntuario(){
    linkVoltarPraListagem();
    await nomearUsuario(identificadorUsuario);
    identificarPaciente(identificadorPaciente);
    editaTagSelectFiltro();
    await imprimirProntuario(identificadorPaciente);

}

//Campo Pesquisar no Prontuário
document.getElementById('formPesquisarNoProntuario').addEventListener('submit', async (evento) => {
    evento.preventDefault();
    console.log("Entrou no formPesquisarNoProntuario")
    //O método trim() remove os espaços antes da string
    const palavraChave = document.getElementById('campoPesquisar').value.trim();
    console.log("Pegou a palavra chava: ", palavraChave)
    if(palavraChave != ""){
        //A ordem de apresentaçao do Prontuario será a inversa de registro
        const pesquisaInicio = await fetch(apiURL+`prontuario?idPaciente=${identificadorPaciente}&q=${palavraChave}&_sort=id&_order=desc`); //O parâmetro "q" pesquisa a palavraChave em todos os atributos do Objeto
        // const pesquisaInicio = await fetch(apiURL+`prontuario?idPaciente=${identificadorPaciente}&titulo_like=${palavraChave}|texto_like=${palavraChave}&_sort=id&_order=desc`);// Não está funcionando
        const pesquisa = await pesquisaInicio.json();
        console.log("Pesquisa na API: ", pesquisa)


        //imprimir prontuario
        let conteudo = document.getElementById('conteudo');
        
        conteudo.innerHTML = "";
        for(let i=0; i < pesquisa.length; i++){
            if(pesquisa[i].tipo === "sessao"){
                
                if(i > 0){
                    conteudo.innerHTML = conteudo.innerHTML + `<div class="tracoVerde"></div>`
                }

                conteudo.innerHTML = conteudo.innerHTML + 
                `<div class="col-12 cartaoSessao">
                    <div class="circuloSessao"><img src="imagens/rostoCoracao.png"></div>
                    <div class="tituloCartao">${pesquisa[i].titulo}</div>
                    <div class="dataCartao">${pesquisa[i].data}</div>
                    <div class="conteudoCartao">${pesquisa[i].texto}... <a href="sessao.html?usuario=${identificadorUsuario}&paciente=${identificadorPaciente}&sessao=${pesquisa[i].id}" class="linkAzul">Ver mais</a></div>
                
                    <div class="btn-group tres_pontos">
                        <button type="button" class="btn"><img src="imagens/tresPontos.png"></button>
                        <button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="visually-hidden">Três pontos</span>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item azul" href="#" onclick="mostrarModalEditarSessao(${pesquisa[i].id})"><img src="imagens/lapizAzul.png"> Editar</a></li>
                            <li><a class="dropdown-item vermelho" href="#" onclick="deletarSessaoOuFatoRelevante(${pesquisa[i].id})"><img src="imagens/lixoVermelho.png"> Excluir</a></li>
                            <!--<li><hr class="dropdown-divider"></li>-->
                            <!--<li><a class="dropdown-item azul" href="#" data-bs-toggle="modal" data-bs-target="#modalEditarSessao"><img src="imagens/lapizAzul.png"> Editar</a></li>-->
                        </ul>
                    </div> 
                </div>`
            }
            if(pesquisa[i].tipo === "fatoRelevante"){

                if(i > 0){
                    conteudo.innerHTML = conteudo.innerHTML + `<div class="tracoAzul"></div>`
                }

                conteudo.innerHTML = conteudo.innerHTML + 
                `<div class="col-12 cartaoFatoRelevante">
                    <div class="circuloFatoRelevante"><img src="imagens/logoFatoRelevanteCartao.png"></div>
                    <div class="tituloCartao">${pesquisa[i].titulo}</div>
                    <div class="dataCartao">${pesquisa[i].data}</div>
                    <div class="conteudoCartao">${pesquisa[i].texto}</div>
                
                    <div class="btn-group tres_pontos">
                        <button type="button" class="btn"><img src="imagens/tresPontos.png"></button>
                        <button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="visually-hidden">Três pontos</span>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item azul" href="#" onclick="mostrarModalEditarFatoRelevante(${pesquisa[i].id})"><img src="imagens/lapizAzul.png"> Editar</a></li>
                            <!-- <li><hr class="dropdown-divider"></li> -->
                            <li><a class="dropdown-item vermelho" href="#" onclick="deletarSessaoOuFatoRelevante(${pesquisa[i].id})"><img src="imagens/lixoVermelho.png"> Excluir</a></li>
                        </ul>
                    </div>
                </div>`
            }
        }
    }
})

//----------------------- Início ORDENAÇÃO DE APRESENTAÇÃO DO PRONTUÁRIO ------------------------ 

//O prontuário é o conjunto de Sessões e Fatos Relevantes
//A requisição retorna um lista de objetos na ordem inversa em que foram registrados. Pilha
const obterProntuario = async (idPaciente) => {
    try{
        const listaSessoesFatosRelevantes = await fetch(apiURL+`prontuario?idPaciente=${idPaciente}&_sort=id&_order=desc`);
        const prontuario = await listaSessoesFatosRelevantes.json();
        return prontuario;
    }catch(erro){
        console.log('Ocorreu um erro: ', erro)
    }
}

const obterApenasSessoes_ordemInversaDeRegistro = async (idPaciente)=> {
    try{    
        const apenasSessoesOrdemInversaRegistro = await fetch(apiURL+`prontuario?idPaciente=${idPaciente}&tipo=sessao&_sort=id&_order=desc`);
        const apenasSessoes_ordemInversaRegistroJSON = await apenasSessoesOrdemInversaRegistro.json();
        return apenasSessoes_ordemInversaRegistroJSON;
    }catch(erro){
        console.log("Ocorreu um erro: ", erro)
    }
}

const obterApenasFatosRelevantes_ordemInversaDeRegistro = async (idPaciente) => {
    try{
        const apenasFROrdemInversaRegistro = await fetch(apiURL+`prontuario?idPaciente=${idPaciente}&tipo=fatoRelevante&_sort=id&_order=desc`);
        const apenasFR_ordemInversaRegistro = await apenasFROrdemInversaRegistro.json();
        return apenasFR_ordemInversaRegistro;
    }catch(erro){
        console.log("Ocorreu um erro: ", erro)
    }
}

//A requisição retorna uma lista de objetos na ordem crescente de id
const obterProntuario_ordemDeRegistro = async (idPaciente) => {
    try{
        const listaSessoesFatosRelevantesOR = await fetch(apiURL+`prontuario?idPaciente=${idPaciente}`);
        const prontuarioOR = await listaSessoesFatosRelevantesOR.json();
        return prontuarioOR;
    }catch(erro){
        console.log('Ocorreu um erro: ', erro)
    }
}

const obterApenasSessoes_ordemDeRegistro = async (idPaciente) => {
    try{
        const apenasSessoesOrdemDeRegistro = await fetch(apiURL+`prontuario?idPaciente=${idPaciente}&tipo=sessao&_sort=id`);
        const apenasSessoes_ordemDeRegistoJSON = await apenasSessoesOrdemDeRegistro.json();
        return apenasSessoes_ordemDeRegistoJSON;
    }catch(erro){
        console.log("Ocorreu um erro: ", erro)
    }
}

const obterApenasFatosRelevantes_ordemDeRegistro = async (idPaciente) => {
    try{
        const ApenasFatosRelevantaesOrdemDeRegistro = await fetch(apiURL+`prontuario?idPaciente=${idPaciente}&tipo=fatoRelevante&_sort=id`)
    }catch(erro){
        console.log("Ocorreu um erro: ", erro)
    }
}

const obterProntuario_ordemCrescenteDeData = async (idPaciente) => {
    try{
        const prontuarioOrdemCrescenteData = await fetch(apiURL+`prontuario?idPaciente=${idPaciente}&_sort=data`);
        const prontuario_ordemCrescenteDataJSON = await prontuarioOrdemCrescenteData.json();
        return prontuario_ordemCrescenteDataJSON;
    }catch(erro){
        console.log("Ocorreu um erro: ", erro)
    }
}

const obterApenasSessoes_ordemCrescenteDeData = async (idPaciente) => {
    try{
        const apenasSessoesOrdemCrescenteData = await fetch(apiURL+`prontuario?idPaciente=${idPaciente}&tipo=sessao&_sort=data`);
        const apenasSessoes_ordemCrescenteDataJSON = await apenasSessoesOrdemCrescenteData.json();
        return apenasSessoes_ordemCrescenteDataJSON;
    }catch(erro){
        console.log("Ocorreu um erro: ", erro);
    }
}

const obterApenasFatosRelevantes_ordemCrescenteDeData = async (idPaciente) =>{
    try{
        const apenasFROrdemCrescenteData = await fetch(apiURL+`prontuario?idPaciente=${idPaciente}&tipo=fatoRelevante&_sort=data`);
        const apenasFatosRelevantes_ordemCrescenteDataJSON = await apenasFROrdemCrescenteData.json();
        return apenasFatosRelevantes_ordemCrescenteDataJSON;
    }catch(erro){
        console.log("Ocorreu um erro: ", erro);
    }
}

const obterProntuario_ordemDecrescenteDeData = async (idPaciente) => {
    try{    
        const prontuarioOrdemDecrescenteData = await fetch(apiURL+`prontuario?idPaciente=${idPaciente}&_sort=data&_order=desc`);
        const prontuario_ordemDecrescenteDataJSON = await prontuarioOrdemDecrescenteData.json();
        return prontuario_ordemDecrescenteDataJSON;
    }catch(erro){
        console.log("Ocorreu um erro: ", erro)
    }
}

const obterApenasSessoes_ordemDecrescenteDeData = async (idPaciente) => {
    try{
        const apenasSessoesOrdemDecrescenteData = await fetch(apiURL+`prontuario?idPaciente=${idPaciente}&tipo=sessao&_sort=data&_order=desc`);
        const apenasSessoes_ordemDecrescenteDataJSON = await apenasSessoesOrdemDecrescenteData.json();
        return apenasSessoes_ordemDecrescenteDataJSON;
    }catch(erro){
        console.log("Ocorreu um erro: ", erro)
    }
}

const obterApenasFatosRelevantes_ordemDecrescenteDeData = async (idPaciente) => {
    try{
        const apenasFROrdemDecrescenteData = await fetch(apiURL+`prontuario?idPaciente=${idPaciente}&tipo=fatoRelevante&_sort=data&_order=desc`);
        const apenasFR_ordemDecrescenteJSON = await apenasFROrdemDecrescenteData.json();
        return apenasFR_ordemDecrescenteJSON;
    }catch(erro){
        console.log("Ocorreu um erro: ", erro)
    }
}

//Evento da tag Select filtros de ordenação
//Esse evento "change" do select permite que o uso do teclado, assistente de voz e tambem o click dispare a função
const filtroSelect = document.getElementById('filtroSelect');
filtroSelect.addEventListener('change', async (evento) => {
    const filtro = evento.target.value;
    const vetorProntuario = [];
    console.log("Entrou no evento de escuta da tag Select");
    if(filtro === "todos_ordemInversaDeRegistro"){
        vetorProntuario = await obterProntuario(identificadorPaciente);
    }else if(filtro === "sessao_ordemInversaDeRegistro"){
        vetorProntuario = await obterApenasSessoes_ordemInversaDeRegistro(identificadorPaciente);
    }else if(filtro === "fatoRelevante_ordemInversaDeRegistro"){
        vetorProntuario = await obterApenasFatosRelevantes_ordemInversaDeRegistro(identificadorPaciente);
    }else if(filtro === "todos_ordemDeRegistro"){
        vetorProntuario = await obterProntuario_ordemDeRegistro(identificadorPaciente); 
    }else if(filtro === "sessao_ordemDeRegistro"){
        vetorProntuario = await obterApenasSessoes_ordemDeRegistro(identificadorPaciente);
    }else if(filtro === "fatoRelevante_ordemDeRegistro"){
        vetorProntuario = await obterApenasFatosRelevantes_ordemDeRegistro(identificadorPaciente);
    }else if(filtro === "todos_ordemCrescenteDeData"){
        vetorProntuario = await obterProntuario_ordemCrescenteDeData(identificadorPaciente);
    }else if(filtro === "sessao_ordemCrescenteDeData"){
        vetorProntuario = await obterApenasSessoes_ordemCrescenteDeData(identificadorPaciente);
    }else if(filtro === "fatoRelevante_ordemCrescenteDeData"){
        vetorProntuario = await obterApenasFatosRelevantes_ordemCrescenteDeData(identificadorPaciente);
    }else if(filtro === "todos_ordemDecrescenteDeData"){
        vetorProntuario = await obterProntuario_ordemDecrescenteDeData(identificadorPaciente);
    }else if(filtro === "sessao_ordemDecrescenteDeData"){
        vetorProntuario = await obterApenasSessoes_ordemDecrescenteDeData(identificadorPaciente);
    }else if(filtro === "fatoRelevante_ordemDecrescenteDeData"){
        vetorProntuario = await obterApenasFatosRelevantes_ordemDecrescenteDeData(identificadorPaciente);
    }else{
        console.log("Ocorreu um erro inesperado na função imprimirFiltrosProntuario()")
    }
    console.log("VetorProntuario: ", vetorProntuario);
    
    let conteudo = document.getElementById('conteudo');
    
    conteudo.innerHTML = "";
    for(let i=0; i < vetorProntuario.length; i++){
        if(vetorProntuario[i].tipo === "sessao"){
            
            if(i > 0){
                conteudo.innerHTML = conteudo.innerHTML + `<div class="tracoVerde"></div>`
            }

            conteudo.innerHTML = conteudo.innerHTML + 
            `<div class="col-12 cartaoSessao">
                <div class="circuloSessao"><img src="imagens/rostoCoracao.png"></div>
                <div class="tituloCartao">${vetorProntuario[i].titulo}</div>
                <div class="dataCartao">${vetorProntuario[i].data}</div>
                <div class="conteudoCartao">${vetorProntuario[i].texto}... <a href="sessao.html?usuario=${identificadorUsuario}&paciente=${identificadorPaciente}&sessao=${vetorProntuario[i].id}" class="linkAzul">Ver mais</a></div>
            
                <div class="btn-group tres_pontos">
                    <button type="button" class="btn"><img src="imagens/tresPontos.png"></button>
                    <button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="visually-hidden">Três pontos</span>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item azul" href="#" onclick="mostrarModalEditarSessao(${vetorProntuario[i].id})"><img src="imagens/lapizAzul.png"> Editar</a></li>
                        <li><a class="dropdown-item vermelho" href="#" onclick="deletarSessaoOuFatoRelevante(${vetorProntuario[i].id})"><img src="imagens/lixoVermelho.png"> Excluir</a></li>
                        <!--<li><hr class="dropdown-divider"></li>-->
                        <!--<li><a class="dropdown-item azul" href="#" data-bs-toggle="modal" data-bs-target="#modalEditarSessao"><img src="imagens/lapizAzul.png"> Editar</a></li>-->
                    </ul>
                </div> 
            </div>`
        }
        if(vetorProntuario[i].tipo === "fatoRelevante"){

            if(i > 0){
                conteudo.innerHTML = conteudo.innerHTML + `<div class="tracoAzul"></div>`
            }

            conteudo.innerHTML = conteudo.innerHTML + 
            `<div class="col-12 cartaoFatoRelevante">
                <div class="circuloFatoRelevante"><img src="imagens/logoFatoRelevanteCartao.png"></div>
                <div class="tituloCartao">${vetorProntuario[i].titulo}</div>
                <div class="dataCartao">${vetorProntuario[i].data}</div>
                <div class="conteudoCartao">${vetorProntuario[i].texto}</div>
            
                <div class="btn-group tres_pontos">
                    <button type="button" class="btn"><img src="imagens/tresPontos.png"></button>
                    <button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="visually-hidden">Três pontos</span>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item azul" href="#" onclick="mostrarModalEditarFatoRelevante(${vetorProntuario[i].id})"><img src="imagens/lapizAzul.png"> Editar</a></li>
                        <!-- <li><hr class="dropdown-divider"></li> -->
                        <li><a class="dropdown-item vermelho" href="#" onclick="deletarSessaoOuFatoRelevante(${vetorProntuario[i].id})"><img src="imagens/lixoVermelho.png"> Excluir</a></li>
                    </ul>
                </div>
            </div>`
        }
    }
})

/* async function imprimirFiltrosProntuario(idPaciente, filtro){
    const vetorProntuario = []
    console.log("Entrou na função imprimirFiltrosProntuario()")
    if(filtro === "todos_ordemInversaDeRegistro"){
        vetorProntuario = await obterProntuario(idPaciente);
    }else if(filtro === "sessao_ordemInversaDeRegistro"){
        vetorProntuario = await obterApenasSessoes_ordemInversaDeRegistro(idPaciente);
    }else if(filtro === "fatoRelevante_ordemInversaDeRegistro"){
        vetorProntuario = await obterApenasFatosRelevantes_ordemInversaDeRegistro(idPaciente);
    }else if(filtro === "todos_ordemDeRegistro"){
        vetorProntuario = await obterProntuario_ordemDeRegistro(idPaciente); 
    }else if(filtro === "sessao_ordemDeRegistro"){
        vetorProntuario = await obterApenasSessoes_ordemDeRegistro(idPaciente);
    }else if(filtro === "fatoRelevante_ordemDeRegistro"){
        vetorProntuario = await obterApenasFatosRelevantes_ordemDeRegistro(idPaciente);
    }else if(filtro === "todos_ordemCrescenteDeData"){
        vetorProntuario = await obterProntuario_ordemCrescenteDeData(idPaciente);
    }else if(filtro === "sessao_ordemCrescenteDeData"){
        vetorProntuario = await obterApenasSessoes_ordemCrescenteDeData(idPaciente);
    }else if(filtro === "fatoRelevante_ordemCrescenteDeData"){
        vetorProntuario = await obterApenasFatosRelevantes_ordemCrescenteDeData(idPaciente);
    }else if(filtro === "todos_ordemDecrescenteDeData"){
        vetorProntuario = await obterProntuario_ordemDecrescenteDeData(idPaciente);
    }else if(filtro === "sessao_ordemDecrescenteDeData"){
        vetorProntuario = await obterApenasSessoes_ordemDecrescenteDeData(idPaciente);
    }else if(filtro === "fatoRelevante_ordemDecrescenteDeData"){
        vetorProntuario = await obterApenasFatosRelevantes_ordemDecrescenteDeData(idPaciente);
    }else{
        console.log("Ocorreu um erro inesperado na função imprimirFiltrosProntuario()")
    }
    console.log("VetorProntuario:")
    console.log(vetorProntuario)
    let conteudo = document.getElementById('conteudo');
    
    conteudo.innerHTML = "";
    for(let i=0; i < vetorProntuario.length; i++){
        if(vetorProntuario[i].tipo === "sessao"){
            
            if(i > 0){
                conteudo.innerHTML = conteudo.innerHTML + `<div class="tracoVerde"></div>`
            }

            conteudo.innerHTML = conteudo.innerHTML + 
            `<div class="col-12 cartaoSessao">
                <div class="circuloSessao"><img src="imagens/rostoCoracao.png"></div>
                <div class="tituloCartao">${vetorProntuario[i].titulo}</div>
                <div class="dataCartao">${vetorProntuario[i].data}</div>
                <div class="conteudoCartao">${vetorProntuario[i].texto}... <a href="sessao.html?usuario=${identificadorUsuario}&paciente=${identificadorPaciente}&sessao=${vetorProntuario[i].id}" class="linkAzul">Ver mais</a></div>
            
                <div class="btn-group tres_pontos">
                    <button type="button" class="btn"><img src="imagens/tresPontos.png"></button>
                    <button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="visually-hidden">Três pontos</span>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item azul" href="#" onclick="mostrarModalEditarSessao(${vetorProntuario[i].id})"><img src="imagens/lapizAzul.png"> Editar</a></li>
                        <li><a class="dropdown-item vermelho" href="#" onclick="deletarSessaoOuFatoRelevante(${vetorProntuario[i].id})"><img src="imagens/lixoVermelho.png"> Excluir</a></li>
                        <!--<li><hr class="dropdown-divider"></li>-->
                        <!--<li><a class="dropdown-item azul" href="#" data-bs-toggle="modal" data-bs-target="#modalEditarSessao"><img src="imagens/lapizAzul.png"> Editar</a></li>-->
                    </ul>
                </div> 
            </div>`
        }
        if(vetorProntuario[i].tipo === "fatoRelevante"){

            if(i > 0){
                conteudo.innerHTML = conteudo.innerHTML + `<div class="tracoAzul"></div>`
            }

            conteudo.innerHTML = conteudo.innerHTML + 
            `<div class="col-12 cartaoFatoRelevante">
                <div class="circuloFatoRelevante"><img src="imagens/logoFatoRelevanteCartao.png"></div>
                <div class="tituloCartao">${vetorProntuario[i].titulo}</div>
                <div class="dataCartao">${vetorProntuario[i].data}</div>
                <div class="conteudoCartao">${vetorProntuario[i].texto}</div>
            
                <div class="btn-group tres_pontos">
                    <button type="button" class="btn"><img src="imagens/tresPontos.png"></button>
                    <button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="visually-hidden">Três pontos</span>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item azul" href="#" onclick="mostrarModalEditarFatoRelevante(${vetorProntuario[i].id})"><img src="imagens/lapizAzul.png"> Editar</a></li>
                        <!-- <li><hr class="dropdown-divider"></li> -->
                        <li><a class="dropdown-item vermelho" href="#" onclick="deletarSessaoOuFatoRelevante(${vetorProntuario[i].id})"><img src="imagens/lixoVermelho.png"> Excluir</a></li>
                    </ul>
                </div>
            </div>`
        }
    }
} */
//----------------------- Fim ORDENAÇÃO DE APRESENTAÇÃO DO PRONTUÁRIO ------------------------

const cadastrarSessao = async (sessao) => {
    try{    
        await fetch(apiURL+"://localhost:3000/prontuario", {
            method: "POST",
                headers:  {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sessao)
        })
    }catch(erro){
        console.log("Ocorreu um erro: ", erro)
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

const cadastrarFatoRelevante = async (ObjetoFR) => {
    try{    
        await fetch(apiURL+`prontuario`, {
            method: "POST",
            headers:  {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ObjetoFR)
        })
    }catch(erro){
        console.log("Ocorreu um erro: ", erro)
    }
}

const obterFatoRelevante = async (idFR) => {
    try{    
        const ObjetoFR = await fetch(apiURL+`prontuario/${idFR}`);
        const ObjetoFRJSON = await ObjetoFR.json();
        return ObjetoFRJSON;
    }catch(erro){
        console.log('Ocorreu um erro: ', erro)
    }
}

const editarFatoRelevante = async (idFR, FReditado) => {
    try{    
        await fetch(apiURL+`prontuario/${idFR}`, {
            method: "PUT",
            headers:  {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(FReditado)
        })
    }catch(erro){
        console.log("Ocorreu um erro: ", erro);
    }
}

async function imprimirProntuario(idPaciente){
    let VetorProntuario = [];
    VetorProntuario = await obterProntuario(idPaciente);
    console.log(VetorProntuario);

    let conteudo = document.getElementById('conteudo');
    
    conteudo.innerHTML = "";
    for(let i=0; i < VetorProntuario.length; i++){
        if(VetorProntuario[i].tipo === "sessao"){
            
            if(i > 0){
                conteudo.innerHTML = conteudo.innerHTML + `<div class="tracoVerde"></div>`
            }

            conteudo.innerHTML = conteudo.innerHTML + 
            `<div class="col-12 cartaoSessao">
                <div class="circuloSessao"><img src="imagens/rostoCoracao.png"></div>
                <div class="tituloCartao">${VetorProntuario[i].titulo}</div>
                <div class="dataCartao">${VetorProntuario[i].data}</div>
                <div class="conteudoCartao">${VetorProntuario[i].texto}... <a href="sessao.html?usuario=${identificadorUsuario}&paciente=${identificadorPaciente}&sessao=${VetorProntuario[i].id}" class="linkAzul">Ver mais</a></div>
            
                <div class="btn-group tres_pontos">
                    <button type="button" class="btn"><img src="imagens/tresPontos.png"></button>
                    <button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="visually-hidden">Três pontos</span>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item azul" href="#" onclick="mostrarModalEditarSessao(${VetorProntuario[i].id})"><img src="imagens/lapizAzul.png"> Editar</a></li>
                        <li><a class="dropdown-item vermelho" href="#" onclick="deletarSessaoOuFatoRelevante(${VetorProntuario[i].id})"><img src="imagens/lixoVermelho.png"> Excluir</a></li>
                        <!--<li><hr class="dropdown-divider"></li>-->
                        <!--<li><a class="dropdown-item azul" href="#" data-bs-toggle="modal" data-bs-target="#modalEditarSessao"><img src="imagens/lapizAzul.png"> Editar</a></li>-->
                    </ul>
                </div> 
            </div>`
        }
        if(VetorProntuario[i].tipo === "fatoRelevante"){

            if(i > 0){
                conteudo.innerHTML = conteudo.innerHTML + `<div class="tracoAzul"></div>`
            }

            conteudo.innerHTML = conteudo.innerHTML + 
            `<div class="col-12 cartaoFatoRelevante">
                <div class="circuloFatoRelevante"><img src="imagens/logoFatoRelevanteCartao.png"></div>
                <div class="tituloCartao">${VetorProntuario[i].titulo}</div>
                <div class="dataCartao">${VetorProntuario[i].data}</div>
                <div class="conteudoCartao">${VetorProntuario[i].texto}</div>
            
                <div class="btn-group tres_pontos">
                    <button type="button" class="btn"><img src="imagens/tresPontos.png"></button>
                    <button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="visually-hidden">Três pontos</span>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item azul" href="#" onclick="mostrarModalEditarFatoRelevante(${VetorProntuario[i].id})"><img src="imagens/lapizAzul.png"> Editar</a></li>
                        <!-- <li><hr class="dropdown-divider"></li> -->
                        <li><a class="dropdown-item vermelho" href="#" onclick="deletarSessaoOuFatoRelevante(${VetorProntuario[i].id})"><img src="imagens/lixoVermelho.png"> Excluir</a></li>
                    </ul>
                </div>
            </div>`
        }
    }
}

const identificarPaciente = async (idPaciente) => {
    const paciente = await obterPacienteEspecifico(idPaciente);

    document.getElementById('nomePaciente').innerText = `${paciente.nome}`;
    document.getElementById('dataNascimentoPaciente').innerText = `${paciente.dataNascimento}`;
    document.getElementById('profissaoPaciente').innerHTML = `${paciente.profissao}`;
    document.getElementById('escolaridadePaciente').innerHTML = `${paciente.escolaridade}`;

    //Cálculo da idade do paciente
    const dataNascimento = new Date (paciente.dataNascimento);

    // Cálculo da diferença entre a data de hoje e a data de nascimento da pessoa em milissegundos
    const diferenca = Date.now() - dataNascimento.getTime();

    // Converta a diferença em milissegundos para anos
    const idade = new Date(diferenca).getFullYear() - 1970;

    document.getElementById('idadePaciente').innerText = `${idade}`

}



//quando apertar botão "criar" que está fora do formulário, no rodapé do modal
document.getElementById("btn_cadastrar_sessao").addEventListener('click', async (evento) => {
    evento.preventDefault();

    //pega os dados dos campos do formulário
    const dataSessao = document.querySelector('#dataSessao').value;
    const horaInicioSessao = document.querySelector('#horaInicioSessao').value;
    const horaFimSessao = document.querySelector('#horaFimSessao').value;
    const tituloSessao = document.querySelector('#tituloSessao').value;
    const resumoSessao = document.querySelector('#resumoSessao').value;
    const valorSessao = document.querySelector('#valorSessao').value;
    const formaPagamento = document.querySelector('#formaPagamento').value;
    const estadoPagamento = document.querySelector('input[name="estadoPagamento"]:checked').value;

    //Atribui os dados dos campos ao Objeto Sessão
    const sessao = {
        "data": dataSessao,
        "horaInicioSessao": horaInicioSessao,
        "horaFimSessao": horaFimSessao,
        "titulo": tituloSessao,
        "texto": resumoSessao,
        "valorSessao": valorSessao,
        "formaPagamentoSessao": formaPagamento,
        "estadoPagamentoSessao": estadoPagamento,
        "tipo": "sessao",
        "idPaciente": identificadorPaciente
    }
    //adiciona Objeto Sessão na API
    await cadastrarSessao(sessao);

    await imprimirProntuario(identificadorPaciente);
})

//Cadastro Fato Relevante
document.getElementById('formCadastrarFatoRelevante').addEventListener('submit', async (evento) => {
    evento.preventDefault();

    //Pegar dados dos campos do formulário
    const dataFatoRelevante = document.querySelector('#dataFatoRelevante').value;
    const tituloFatoRelevante = document.querySelector('#tituloFatoRelevante').value;
    const descricaoFR = document.querySelector('#descricaoFR').value;

    //Objeto Fato Relevante
    const FatoRelevante = {
        "data": dataFatoRelevante,
        "titulo": tituloFatoRelevante,
        "texto": descricaoFR,
        "idPaciente": identificadorPaciente,
        "tipo": "fatoRelevante"
    }

    //adiciona o Objeto Fato Relevante na API
    await cadastrarFatoRelevante(FatoRelevante);
    await imprimirProntuario(identificadorPaciente)
})

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
        evento.preventDefault()

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
        await imprimirProntuario(identificadorPaciente);
    })
}

async function mostrarModalEditarFatoRelevante(idFR){
    //Pega os campos pelo DOM
    let editarDataFR = document.querySelector(`#editarDataFatoRelevante`);
    let editarTituloFR = document.querySelector('#editarTituloFatorelevante');
    let editarDescricaoFR = document.querySelector('#editarDescricaoFR');

    //busca o FR da API
    const fatoRelevante = await obterFatoRelevante(idFR);

    //Preenche o formulário de Edição FR com os dados do Objeto
    editarDataFR.value = fatoRelevante.data;
    editarTituloFR.value = fatoRelevante.titulo;
    editarDescricaoFR.value = fatoRelevante.texto;

    //Apresenta o Modal de Edição de Fato Relevante
    let ModalEditarFatoRelevante = new bootstrap.Modal(document.getElementById('ModalEditarFatoRelevante'), {});
    ModalEditarFatoRelevante.show();

    //Quando Clicar do botão "Editar" do formulário
    document.getElementById('formEditarFatoRelevante').addEventListener('submit', async (evento) => {
        evento.preventDefault()

        const FatoRelevanteEditado = {
            "data": editarDataFR.value,
            "titulo": editarTituloFR.value,
            "texto": editarDescricaoFR.value,
            "idPaciente": fatoRelevante.idPaciente,
            "tipo": "fatoRelevante",
        }

        await editarFatoRelevante(idFR, FatoRelevanteEditado);
        await imprimirProntuario(identificadorPaciente);
    })
}