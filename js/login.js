const url = "https://reqres.in/api/login"
let senha = document.querySelector('#pass')
let nome = document.querySelector('#user')
let titleErrors = document.querySelector('#error')
let button = document.querySelector('#loginBtn')
let visibilitySearch = document.querySelector('#search')
let visibilityLogin = document.querySelector('#login')
let validSenha = false;
let validNome = false;

senha.value='';
nome.value='';
button.disabled = true;


//Validação dos Campos de senha e userId
nome.addEventListener('keyup', () => {
    if (nome.value.length < 3) {
        nome.setAttribute('style', 'border: solid red')
        validNome = false;
        button.disabled = true;

    } else {
        nome.setAttribute('style', 'none')
        validNome = true;

    }
});

senha.addEventListener('keyup', () => {
    if (senha.value.length < 3) {
        senha.setAttribute('style', 'border: solid red')
        validSenha = false;
        button.disabled = true;
    } else {
        senha.setAttribute('style', 'none')
        validSenha = true;
        button.disabled = false;
    }
});

button.addEventListener('click', () => {
    if (validNome === false || validSenha === false) {
        button.disabled = true;
    } else {
        titleErrors.innerHTML = '';
        button.disabled = false;
    }
});


function validaLogin() {
    const id = localStorage.getItem("user")
    if (id != null) {
        visibilityLogin.classList.toggle('hidden')
        visibilitySearch.classList.toggle('hidden')
    }
}

function login() {
    const payloud = {
        email: nome.value,
        password: senha.value
    };
    axios.post(url, payloud)
        .then(response => {
            localStorage.setItem("user", nome.value)
            if (!!response.data) {
                visibilityLogin.classList.toggle('hidden')
                visibilitySearch.classList.toggle('hidden')
            } else {
                titleErrors.style.color = '#FF0000';
                titleErrors.innerHTML = "Não aprovado"
            }
        })
        .catch((error) => {
            titleErrors.innerHTML = 'Verifique os campos e tente novamente'
        })
}

