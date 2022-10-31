const url = "https://reqres.in/api/login"
let senha = document.querySelector('#pass')
let nome = document.querySelector('#user')
let visibilitySearch = document.querySelector('#search')
let visibilityLogin = document.querySelector('#login')
let validSenha = false;
let validNome = false;

//Validação dos Campos de senha e userId
nome.addEventListener('keyup', () => {
    if (nome.value.length <= 3) {
        nome.setAttribute('style', 'border: solid red')
        validNome = false;
    } else {
        nome.setAttribute('style', 'none')
        validNome = true;
    }
})

senha.addEventListener('keyup', () => {
    if (senha.value.length <= 3) {
        senha.setAttribute('style', 'border: solid red')
        validSenha = false;
    } else {
        senha.setAttribute('style', 'none')
        validSenha = true;
    }
})

function validaLogin(){
    const id = localStorage.getItem("user")
    if(id != null){
        visibilityLogin.classList.toggle('hidden')
        visibilitySearch.classList.toggle('hidden')
    }
}

function login(){
    const payloud = {
        email:nome.value,
        password: senha.value
    };
    axios.post(url, payloud)
        .then(response => {
            localStorage.setItem("user", nome.value)
            if(!!response.data){
                visibilityLogin.classList.toggle('hidden')
                visibilitySearch.classList.toggle('hidden')
            }else{
                alert('Não aprovado')
            }
        })
        .catch((error) =>{
            alert('deu bad')
        })
}

