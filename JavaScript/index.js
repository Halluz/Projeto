// const apiURL = "https://projeto-final-modulo01-arnia.onrender.com/"
const apiUrl = "http://localhost:3000/"

const obterUsuarios = async () =>{
    try{
        const obterUsuarios = await fetch(apiURL+"usuarios")
        const listaUsuarios = await obterUsuarios.json()
        return listaUsuarios

    }catch(erro){
        console.log("Ocorreu um erro: ", erro)
    }
}

const obterUsuario = async (dado) =>{
    try{ 
        const varUsuario = await fetch(apiURL+`usuarios?email=${dado}`)
        const vetUsuario =  await varUsuario.json()
        return vetUsuario
    }catch(erro){
        console.log("Ocorreu um erro: ", erro)
    }
}

let imagemOlho = document.getElementById('imagemOlho')

imagemOlho.addEventListener('click', function (){
    let input = document.getElementById('loginSenha')

    if(input.getAttribute('type') == 'password'){
        input.setAttribute('type', 'text');
    }else{
        input.setAttribute('type', 'password');
    }
})

//Formulário de login
document.getElementById('formLogin').addEventListener('submit', async (evento) =>{
    //Bloqueio temporário do evento de submissão para execução da callback
    evento.preventDefault()
    const login = document.getElementById('loginLogin').value
    const senha = document.getElementById('loginSenha').value
    
    const vetUsuario = await obterUsuario(login)
    console.log(vetUsuario)

    
    if(vetUsuario.length === 0){
        window.alert("Login e senha não cadastrados.")
    }else{
        vetUsuario.forEach(elemento => {
            if(login === elemento.email && senha === elemento.senha){
                
                window.location.href = `pacientes.html?usuario=${elemento.id}`
            }else if (login === elemento.email && senha !== elemento.senha){
                window.alert("Senha inválida")
            }else{
                window.alert("Ocorreu um erro inesperado.")
            }
        }); 
    }
})

function validarSenha(senha){
    expressaoRegular = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#/+])[0-9a-zA-Z$*&@#/+]{8,}$/
    return expressaoRegular.test(senha)
}