const formCadastradoElement = document.getElementById('form-cadastro');

formCadastradoElement.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    // daqui pra baixo conseguimos capturar o value dos campos tranquilamente pois a página não reestarta

    const emailInput = document.getElementById('email')
    const senhaInput = document.getElementById('senha')
    const repetirSenhaInput = document.getElementById('re-senha')
    const nomeInput = document.getElementById('nome')
  
    const nomeValido = validarPreenchimentoCampo(nomeInput.value)
    const emailValido = validarPreenchimentoCampo(emailInput.value)
    const senhaValido = validarPreenchimentoCampo(senhaInput.value)
    const repetirSenhaValido = validarPreenchimentoCampo(repetirSenhaInput.value)

    if (!emailValido || !senhaValido || !repetirSenhaValido||!nomeValido) {
        alert("Preencha os campos corretamente")
        return
    }

    if (!validarSenhas(senhaInput.value, repetirSenhaInput.value)) {
        alert("As senhas não coincidem")
        return
    }

    const novoUsuario = {
        nome: nomeInput.value,
        email: emailInput.value,
        senha: senhaInput.value,
    }

    console.log(novoUsuario)

    const deuBom = await cadastrarUsuario(novoUsuario);

    if (deuBom) {
        emailInput.value = ''
        senhaInput.value = ''
        nomeInput.value = ''
        repetirSenhaInput.value = ''

        window.location.href = 'index.html'
    }

})


function validarPreenchimentoCampo(valorDigitado) {
    if (valorDigitado === '') {
        return false
    }

    return true
}

function validarSenhas(senha, repetirSenha) {
    if (senha !== repetirSenha) {
        return false
    }

    return true
}

async function cadastrarUsuario(novoUsuario) {
    try {
        const resposta = await apiConfig.post('/cadastro', novoUsuario)

        alert(resposta.data.message)
        console.log(resposta)
        return true

    } catch (erro) {
        alert(`${erro.response.data.mensagem}`)
        return false
    }
    
}