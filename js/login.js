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


function login2(){
    const payloud = {
        email:nome.value,
        password: senha.value
    };
    axios.post(url, payloud)
        .then(response => {
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

function getUser() {
    axios.get(url)
        .then(response => {
            const data = response.data;
        })
        .catch(error => console.log())
}

getUser()


function login() {
    if (!!validSenha || !!validNome ) {
        alert("Campos não preenchidos corretamente")
    } else {

        //Salvando informações em localStorage


        let listaUser = JSON.parse(localStorage.getItem('listUser') || '[]')
        localStorage.setItem('listaUser', JSON.stringify(listaUser))
        listaUser.push({
            nome: nome.value, pass: senha.value,
        })

        axios.get(url, {
            auth: {
                user, pass,
            }
        })
            .then(response => {
                const data = response.data

                if (listaUser.nome === data.first_name && listaUser.pass === data.last_name) {

                }

            })
            .catch(error => console.log())

    }

}
