const apiURL = "https://projeto-final-modulo01-arnia.onrender.com/"

//pega toda string da url
const barraEnderecoUrl = window.location.search;

//pega a parte da string da url depois do ponto de interrogação incluso ele
const urlParams = new URLSearchParams(barraEnderecoUrl);

//pega o valor da variável 'usuario' na url
const identificadorUsuario = Number.parseInt(urlParams.get('usuario'));

const cadastrarPaciente = async (paciente) =>{
    try{
        await fetch(apiURL + "pacientes", {
            method: "POST",
            headers:  {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            //body só aceita como valor uma string
            body: JSON.stringify(paciente)
        });
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

const obterTodosPacientes = async () => {
    try{
        const listaPacientes = await fetch(apiURL + 'pacientes');
        const listaPacientesJSON = listaPacientes.json()
        return listaPacientesJSON
    }catch(erro){
        console.log("Ocorreu um erro: ", erro);
    }
}


const editarPaciente = async (idPaciente, pacienteEditado) => {
    try{    
        await fetch(apiURL+`pacientes/${idPaciente}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pacienteEditado)
        })
    }catch(erro){
        console.log("Ocorreu um erro: ", erro)
    }
}

const deletarPaciente = async (idPaciente) => {
    try{
        await fetch(apiURL+`pacientes/${idPaciente}`, {
            method: "DELETE"
        })
    }catch(erro){
        console.log("Ocorreu um erro: ", erro);
    }
}

const listarPacientesDoUsuarioOrdemDeRegistro = async (idUsuario) => {
    try{    
        let vetorTdsPacientesDoUsuario = await fetch(apiURL+`pacientes?idDoProfissionalUsuario=${idUsuario}`);

        const pacientesUsuarioJSON = await vetorTdsPacientesDoUsuario.json();

        return pacientesUsuarioJSON;
    }catch(erro){
        console.log("Ocorreu um erro: ", erro)
    }
}


//Ordem inversa em que está registrado no Banco de Dados. Pilha
const listarPacientesDoUsuario = async (idUsuario) => {
    try{    
        let vetorTdsPacientesDoUsuario = await fetch(apiURL+ `pacientes?idDoProfissionalUsuario=${idUsuario}&_sort=id&_order=desc`);

        const pacientesUsuarioJSON = await vetorTdsPacientesDoUsuario.json();

        return pacientesUsuarioJSON;
    }catch(erro){
        console.log("Ocorreu um erro: ", erro)
    }
}

const pegar_Usuario = async (dado) =>{
    try{ 
        const varUsuario = await fetch(apiURL+`usuarios/${dado}`)
        const vetUsuario =  await varUsuario.json()
        return vetUsuario
    }catch(erro){
        console.log("Ocorreu um erro: ", erro)
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

function imprimirPaciente(ObjetoPaciente){
    let tbody = document.getElementById('tbody');

    tbody.innerHTML = tbody.innerHTML + 
        `<tr>
            <td class="text-center">${ObjetoPaciente.id}</td>
            <td class="dadosPaciente" onclick="mostrarModalDadosPaciente(${ObjetoPaciente.id})">${ObjetoPaciente.nome}</td>
            <td>${ObjetoPaciente.cpf}</td>
            <td class="text-center">
                <a href="prontuario.html?usuario=${identificadorUsuario}&paciente=${ObjetoPaciente.id}"><img src="imagens/logoProtuario.png" title="Prontuário" class="aumento"></a>
                <a href="#"><img src="imagens/logoEditar.png" onclick="mostrarModalEditarPaciente(${ObjetoPaciente.id})" title="Editar Paciente" class="aumento"></a>
                <a href="#"><img src="imagens/logoDeletar.png" onclick="mostrarModalDeletarPaciente(${ObjetoPaciente.id})" title="Deletar Paciente" class="aumento"></a>
            </td>
        </tr>`
}

function editarColunaNome(idUsuario){
    document.getElementById('colunaNome').innerHTML = `<img src="imagens/iconeOrdemAlfabética.png" class="iconeOrdenacao me-2" onclick="ordemAlfabeticaPacientes(${idUsuario})"  title="Ordem Alfabética">Nome<img src="imagens/iconOrdemInversaAlfabetica.png" class="iconeOrdenacao ms-2" onclick="ordemAlfabeticaInversaPacientes(${idUsuario})" title="Ordem Alfabética Inversa">`;
}

async function nomearUsuario_E_listarPacientes(){
    //pega o valor da variável 'usuario' na url
    const idUsuario = Number.parseInt(urlParams.get('usuario'));

    await nomearUsuario(idUsuario);
    editarColunaNome(idUsuario);

    const vetorPacientesDoUsuario = await listarPacientesDoUsuario(idUsuario);
    document.getElementById('tbody').innerHTML = "";
    vetorPacientesDoUsuario.forEach(elemento => {
        imprimirPaciente(elemento);
    })
}

const ordemAlfabeticaPacientes = async (idUsuario) => {
    try{
        const ordemAlfabetica = await fetch(apiURL+`pacientes?idDoProfissionalUsuario=${idUsuario}&_sort=nome`);
        const ordemAlfabeticaJSON = await ordemAlfabetica.json();
        
        //imprimir a lista em ordem alfabética na Página HTML
        document.getElementById('tbody').innerHTML = '';
        ordemAlfabeticaJSON.forEach(paciente => {
            imprimirPaciente(paciente);
        });

    }catch(erro){
        console.log("Ocorreu um erro: ", erro)
    }
}

const ordemAlfabeticaInversaPacientes = async (idUsuario) => {
    try{
        const ordemInversa = await fetch(apiURL+`pacientes?idDoProfissionalUsuario=${idUsuario}&_sort=nome&_order=desc`);
        const ordemInversaJSON = await ordemInversa.json();

        //imprimir lista de pacientes na tabela
        document.getElementById('tbody').innerHTML = "";
        ordemInversaJSON.forEach(paciente => {
            imprimirPaciente(paciente);
        });
    }catch(erro){
        console.log("Ocorreu um erro: ", erro)
    }
}

//Buscar pacientes cujo nome contenha a palavra chave no campo de pesquisa
document.getElementById("formPesquisar").addEventListener('submit', async (evento) => {
    evento.preventDefault()
    //Repare que a função trim() serve para retirar os espaços em branco antes e depois da string.
    const palavraChave = document.getElementById('campoPesquisar').value.trim();
    
    //verificar se o campo de pesquisa tem valor diferente de vazio
    if(palavraChave !== ""){
        const pesquisa = await fetch(apiURL+ `pacientes?idDoProfissionalUsuario=${identificadorUsuario}&nome_like=${palavraChave}`);
        const pesquisaJSON = await pesquisa.json();

        //Imprimir os objetos da pesquisa na tabela
        document.getElementById('tbody').innerHTML = "";
        pesquisaJSON.forEach(paciente =>{
            imprimirPaciente(paciente);
        })
    }
})

//formulário cadastro de paciente
document.getElementById('formCadastroPaciente').addEventListener('submit', async (evento) => {
    evento.preventDefault();

    //Capitura os campos do formulário pelo DOM
    let cpf = document.querySelector('#CPF');
    let nome = document.querySelector('#nomePaciente');
    let dataNascimento = document.querySelector('#dataNascimento');
    let email = document.querySelector('#email');
    let genero = document.querySelector('#genero');
    let nacionalidade = document.querySelector('#nacionalidade');
    let naturalidade = document.querySelector('#naturalidade');
    let profissao = document.querySelector('#profissao');
    let escolaridade = document.querySelector('#escolaridade');
    let estadoCivil = document.querySelector('#estadoCivil');
    let mae = document.querySelector('#mae');
    let pai = document.querySelector('#pai');
    

    const paciente = {
        "cpf": cpf.value,
        "nome": nome.value,
        "dataNascimento": dataNascimento.value,
        "email": email.value,
        "genero": genero.value,
        "nacionalidade": nacionalidade.value,
        "naturalidade": naturalidade.value,
        "profissao": profissao.value,
        "escolaridade": escolaridade.value,
        "estadoCivil": estadoCivil.value,
        "mae": mae.value,
        "pai": pai.value,
        "idDoProfissionalUsuario": Number.parseInt(urlParams.get('usuario'))
    }

    await cadastrarPaciente(paciente);
    //Apresenta os pacientes com a inclusão do novo paciente na página pacientes.html
    await nomearUsuario_E_listarPacientes();
    console.log("1 linha antes da função mostrarAnimacao()")
    //Fechar modal de formulário de Cadastro de Paciente
    document.getElementById('modalCadastroPaciente').parentNode.classList.remove('show');
    mostrarAnimacao();

})

function mostrarAnimacao(){
    console.log("Entrou na função mostrarAnimação()")
    //Abrir modal da animação
    let modalAnimacao = new bootstrap.Modal(document.getElementById('animacaoCadastroPaciente'), {});
    modalAnimacao.show();
    
}


async function mostrarModalEditarPaciente(idPaciente){
    //pega campos pelo DOM
    let editarCPF = document.querySelector('#editarCPF');
    let editarNome = document.querySelector('#editarNomePaciente');
    let editarDataNascimento = document.querySelector('#editarDataNascimento');
    let editarEmail = document.querySelector('#editarEmail');
    let editarGenero = document.querySelector('#editarGenero');
    let editarNacionalidade = document.querySelector('#editarNacionalidade');
    let editarNaturalidade = document.querySelector('#editarNaturalidade');
    let editarProfissao = document.querySelector('#editarProfissao');
    let editarEscolaridade = document.querySelector('#editarEscolaridade');
    let editarEstadoCivil = document.querySelector('#editarEstadoCivil');
    let editarMae = document.querySelector('#editarMae');
    let editarPai = document.querySelector('#editarPai');

    //Requisita o paciente na API
    let paciente = await obterPacienteEspecifico(idPaciente)

    //Preenche os campos com os dados do paciente
    editarCPF.value = paciente.cpf;
    editarNome.value = paciente.nome;
    editarDataNascimento.value = paciente.dataNascimento;
    editarEmail.value = paciente.email;
    editarGenero.value = paciente.genero;
    editarNacionalidade.value = paciente.nacionalidade;
    editarNaturalidade.value = paciente.naturalidade;
    editarProfissao.value = paciente.profissao;
    editarEscolaridade.value = paciente.escolaridade;
    editarEstadoCivil.value = paciente.estadoCivil;
    editarMae.value = paciente.mae;
    editarPai.value = paciente.pai;

    //Apresenta o Modal de Edição de pacientes  
    let ModalEditarPaciente = new bootstrap.Modal(document.getElementById('modalEditarDadosPaciente'), {});
    ModalEditarPaciente.show();

    //formulário Editar Paciente
    document.getElementById('formEditarDadosPaciente').addEventListener('submit', async (evento) => {
        evento.preventDefault()
        
        const pacienteEditado = {
            "cpf": editarCPF.value,
            "nome": editarNome.value,
            "dataNascimento": editarDataNascimento.value,
            "email": editarEmail.value,
            "genero": editarGenero.value,
            "nacionalidade": editarNacionalidade.value,
            "naturalidade": editarNaturalidade.value,
            "profissao": editarProfissao.value,
            "escolaridade": editarEscolaridade.value,
            "estadoCivil": editarEstadoCivil.value,
            "mae": editarMae.value,
            "pai": editarPai.value,
            "idDoProfissionalUsuario": paciente.idDoProfissionalUsuario
        }
        //Faz a edição do paciente na API
        await editarPaciente(idPaciente,pacienteEditado);

        //Apresenta lista de pacientes com a nova edição na página pacientes.html
        await nomearUsuario_E_listarPacientes();
    })
}

async function mostrarModalDeletarPaciente(idPaciente){
    //Captura paciente da API
    let delPaciente = await obterPacienteEspecifico(idPaciente);

    //Seleciona campos do DOM
    let delCPF = document.querySelector('#delCPF');
    let delNome = document.querySelector('#delNomePaciente');
    let delDataNascimento = document.querySelector('#delDataNascimento');
    let delEmail = document.querySelector('#delEmail');
    let delGenero = document.querySelector('#delGenero');
    let delNacionalidade = document.querySelector('#delNacionalidade');
    let delNaturalidade = document.querySelector('#delNaturalidade');
    let delProfissao = document.querySelector('#delProfissao');
    let delEscolaridade = document.querySelector('#delEscolaridade');
    let delEstadoCivil = document.querySelector('#delEstadoCivil');
    let delMae = document.querySelector('#delMae');
    let delPai = document.querySelector('#delPai');

    //Atribui valores aos campos correspondentes ao do objeto paciente
    delCPF.value = delPaciente.cpf;
    delNome.value = delPaciente.nome;
    delDataNascimento.value = delPaciente.dataNascimento;
    delEmail.value = delPaciente.email;
    delGenero.value = delPaciente.genero;
    delNacionalidade.value = delPaciente.nacionalidade;
    delNaturalidade.value = delPaciente.naturalidade;
    delProfissao.value = delPaciente.profissao;
    delEscolaridade.value = delPaciente.escolaridade;
    delEstadoCivil.value = delPaciente.estadoCivil;
    delMae.value = delPaciente.mae;
    delPai.value = delPaciente.pai;

    //Edita botão/link de Editar paciente nos modal Dados Paciente e Modal Deletar Paciente

    const vetorLinks = document.querySelectorAll('.linkEditarPaciente')

    for(let i=0; i < vetorLinks.length; i++){
        vetorLinks[i].innerHTML = `<img src="imagens/logoEditar.png" class="ms-2" onclick="mostrarModalEditarPaciente(${idPaciente})" data-bs-dismiss="modal" aria-label="Close">`;     
    }

    // document.getElementById('linkEditarPaciente').innerHTML = `<img src="imagens/logoEditar.png" class="ms-2" onclick="mostrarModalEditarPaciente(${idPaciente})" data-bs-dismiss="modal" aria-label="Close">`;

    //Mostra Modal de deleção
    let modalDelecao = new bootstrap.Modal(document.getElementById('modalDeletarDadosPaciente'),{});
    modalDelecao.show();

    //Formulário deletar
    document.getElementById('formDeletarDadosPaciente').addEventListener('submit', async (evento) => {
        evento.preventDefault()
        let resposta = window.confirm("Tens certeza de que desejas deletar este paciente?")
        if(resposta === true){
            //Realiza a deleção
            // await deletarPaciente(idPaciente)
            await deletarPaciente(idPaciente)
    
            //Apresenta a página atualizada sem este paciente
            await nomearUsuario_E_listarPacientes();
        }
    })
}


async function mostrarModalDadosPaciente(idPaciente){
    //Captura paciente da API
    let dadosPaciente = await obterPacienteEspecifico(idPaciente);

    //Seleciona campos do DOM
    let dadoCPF = document.querySelector('#dadoCPF');
    let dadoNome = document.querySelector('#dadoNomePaciente');
    let dadoDataNascimento = document.querySelector('#dadoDataNascimento');
    let dadoEmail = document.querySelector('#dadoEmail');
    let dadoGenero = document.querySelector('#dadoGenero');
    let dadoNacionalidade = document.querySelector('#dadoNacionalidade');
    let dadoNaturalidade = document.querySelector('#dadoNaturalidade');
    let dadoProfissao = document.querySelector('#dadoProfissao');
    let dadoEscolaridade = document.querySelector('#dadoEscolaridade');
    let dadoEstadoCivil = document.querySelector('#dadoEstadoCivil');
    let dadoMae = document.querySelector('#dadoMae');
    let dadoPai = document.querySelector('#dadoPai');

    //Atribui valores aos campos correspondentes ao do objeto dadosPaciente
    dadoCPF.value = dadosPaciente.cpf;
    dadoNome.value = dadosPaciente.nome;
    dadoDataNascimento.value = dadosPaciente.dataNascimento;
    dadoEmail.value = dadosPaciente.email;
    dadoGenero.value = dadosPaciente.genero;
    dadoNacionalidade.value = dadosPaciente.nacionalidade;
    dadoNaturalidade.value = dadosPaciente.naturalidade;
    dadoProfissao.value = dadosPaciente.profissao;
    dadoEscolaridade.value = dadosPaciente.escolaridade;
    dadoEstadoCivil.value = dadosPaciente.estadoCivil;
    dadoMae.value = dadosPaciente.mae;
    dadoPai.value = dadosPaciente.pai;

    //Edita botão/link de Editar paciente nos modal Dados Paciente e Modal Deletar Paciente

    const vetorLinks = document.querySelectorAll('.linkEditarPaciente')

    for(let i=0; i < vetorLinks.length; i++){
        vetorLinks[i].innerHTML = `<img src="imagens/logoEditar.png" class="ms-2" onclick="mostrarModalEditarPaciente(${idPaciente})" data-bs-dismiss="modal" aria-label="Close">`;     
    }

    // document.getElementById('linkEditarPaciente').innerHTML = `<img src="imagens/logoEditar.png" class="ms-2" onclick="mostrarModalEditarPaciente(${idPaciente})" data-bs-dismiss="modal" aria-label="Close">`;

    //Mostra Modal de Dados so Paciente
    let modalDadosPaciente = new bootstrap.Modal(document.getElementById('modalDadosPaciente'),{});
    modalDadosPaciente.show();

}

