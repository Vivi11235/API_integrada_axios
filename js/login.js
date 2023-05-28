const formLoginElement = document.getElementById('form-login');

formLoginElement.addEventListener('submit', async (evento) => {
  evento.preventDefault();
    
  // daqui pra baixo conseguimos capturar o value dos campos tranquilamente pois a página não reestarta
    
  const emailInput = document.getElementById('email')
  const senhaInput = document.getElementById('senha')
  const permanecerConectado = document.getElementById('lembrar').checked
    
  const emailValido = validarPreenchimentoCampo(emailInput.value)
  const senhaValido = validarPreenchimentoCampo(senhaInput.value)
    
    if (!emailValido || !senhaValido) {
      alert("Preencha os campos corretamente")
      return
      }
    
    const dadosUsuario = {
      email: emailInput.value,
      senha: senhaInput.value,
      }
    
    const deuBom = await login(dadosUsuario, permanecerConectado);
    
    if (deuBom) {
      emailInput.value = ''
      senhaInput.value = ''
      window.location.href = 'home.html'
    } else {
      senhaInput.value = ''
    }
})
    
    
function validarPreenchimentoCampo(valorDigitado) {
  if (valorDigitado === '') {
    return false
  }else{
    return true
  }
}
    
async function login(dadosUsuario, permanecerConectado) {
  try {
    const resposta = await apiConfig.post('/login', dadosUsuario)
    console.log(resposta)
    
  if (permanecerConectado) {
    localStorage.setItem('email', dadosUsuario.email)
  } else {
    sessionStorage.setItem('email', dadosUsuario.email)
    }
    
  return true
    } catch (erro) {
      alert(`${erro.response.data.message}`)
      return false
  }
}
  

