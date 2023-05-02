const apiURL = "https://projeto-final-modulo01-arnia.onrender.com/"

//Esconde os campos da primeira parte do formulário de cadastro do usuário e apresenta os campos da segunda parte
function parte2(){
    
    let nome = document.getElementById('nomeCadastro')
    let email = document.getElementById('emailCadastro')
    //se os campos da parte1 estiverem vazios
    if(nome.value.trim() === '' || email.value.trim() === ''){
        //a função trim() serve para retirar os espaços em branco antes e depois da string.
        window.alert("Preencha os campos!")
    }else{
        document.querySelector(".parte1").style.display = "none"

        const vetor = document.querySelectorAll(".parte2")

        for(let i=0; i< vetor.length; i++){
        vetor[i].style.display = "block"
        }
    }
}


const cadastrarUsuario = async (usuario) => {
    try{    
        await fetch(apiURL+'usuarios', {
            method: "POST",
            headers:  {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            //body só aceita como valor uma string
            body: JSON.stringify(usuario)
            });
        }catch(erro){
            console.log("Ocorreu um erro: ", erro)
        }
}
//Formulário Cadastro de Usuário
document.getElementById('formCadastro').addEventListener('submit', async (evento)=>{
    //Bloqueio temporário do evento de submissão para execução da função callback
    evento.preventDefault()
    const nome = document.getElementById("nomeCadastro").value;
    const email= document.getElementById("emailCadastro").value;
    const senha= document.getElementById("senhaCadastro").value;
    const confSenha = document.getElementById("confirmarSenhaCadastro").value;

    if(senha != confSenha){
        window.alert("As Senhas não coincidem! Não são as mesmas.")
    }else{
        const usuario = {
            "nome": nome,
            "email": email,
            "senha": senha
        }
    
    // const resultado = await cadastrarUsuario(usuario)
    // console.log(resultado)
    await cadastrarUsuario(usuario)

    //Se o cadastro for realizado com sucesso, uma mensagem informando isso será mostrada e em seguida a página de login será apresentada.
    //carrega a página de login
    window.location.href = "index.html"
    }

    //Se o cadastro der errado a página é recarregada e a primeira parte do formulário é apresentada
})

let olhoSenha = document.querySelector('#olhoSenha');
//Visualizar o que foi digitado no campo Senha
olhoSenha.addEventListener('click', function(){
    let input = document.querySelector('#senhaCadastro');

    if(input.getAttribute('type') == 'password'){
        input.setAttribute('type', 'text');
    }else{
        input.setAttribute('type', 'password');
    }
})

let olhoConfSenha = document.querySelector('#olhoConfSenha');
//visualizar o que foi digitado no campo Confirmar Senha
olhoConfSenha.addEventListener('click', function (){
    let input = document.querySelector('#confirmarSenhaCadastro');

    if(input.getAttribute('type') == 'password'){
        input.setAttribute('type', 'text');
    }else{
        input.setAttribute('type', 'password');
    }
})