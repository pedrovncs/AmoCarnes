window.onload = _ => {
  document.querySelector('.background-home h2').style.display = 'block';
  document.querySelector('.background-home h2').classList.add('animate__animated');
  document.querySelector('.background-home h2').classList.add('animate__backInRight');
}

//RADIO BUTTON
let buttons = document.querySelectorAll("#radio-button div");

buttons.forEach((radio) => radio.onclick = () => {
  const marked = document.getElementsByClassName("marked")[0];
  marked.classList.remove("marked");
  marked.children[0].classList.add("hidden");
  radio.children[0].classList.remove("hidden");
  radio.classList.add("marked");
})

//SELECT
const options = document.querySelector('.options');
const arrow = document.querySelector('#select img');
const optionHeader = document.querySelector('#select span');

function showOptions() {
  arrow.classList.toggle('rotate');
  options.classList.toggle('hidden');
}

function selected(selected) {
  optionHeader.innerText = selected.innerText;
  options.classList.toggle('hidden');
  arrow.classList.toggle('rotate');
}

//checkbox
const caixaPai = document.querySelector("#caixaPai");
const caixas = document.querySelectorAll(".flex-column-boxes div");

const checkPai = _ => {
  if (caixaPai.classList.contains(("checked"))) {
    caixas.forEach(caixa => caixa.classList.remove("checked"))
  } else {
    caixaPai.classList.toggle('checked');
    caixas.forEach(caixa => caixa.classList.add("checked"))
    caixaPai.classList.remove("middle")
  }
}
const check = a => {
  a.classList.toggle("checked")
  let interruptor = 0
  for (let i = 1; i < caixas.length; i++) {
    if (caixas[i].classList.contains("checked") == true) {
      interruptor++
    } else {
      interruptor--
    }
  }
  switch (interruptor) {
    case 0:
      caixaPai.classList.remove("checked")
      caixaPai.classList.add("middle")
      break;
    case 1:
      caixaPai.classList.remove("checked")
      caixaPai.classList.add("middle")
      break;
    case 2:
      caixaPai.classList.remove("middle")
      caixaPai.classList.add("checked")
      break;
    default:
      caixaPai.classList.remove("middle")
      caixaPai.classList.remove("checked")
  }
}

//Validar formulario
const iptAll = document.querySelectorAll(".inputs input");
const iptNome = document.getElementById("nome");
const iptEmail = document.getElementById("email");
const iptTelefone = document.getElementById("telefone");
const txtArea = document.getElementById("textArea");
txtArea.onclick = focus;
iptAll.forEach(ipt => ipt.onclick = focus);

function verificador() {
  let flag = false;
  if (verificaPalavras(iptNome, 2)) flag = true;
  else flag = false;
  if (verificaPalavras(txtArea, 5)) flag = true;
  else flag = false;
  if (verificaEmail()) flag = true;
  else flag = false;
  if (!verificaTelefone() && flag === true) flag = false;


  if (flag) {
    const msgEnvio = document.getElementById("msgEnvio");
    iptAll.forEach(input => input.value = null);
    txtArea.value = null;
    setTimeout(function() {
      msgEnvio.classList.add('aparecendo');
  }, 50);
    setTimeout(function() {
      msgEnvio.classList.add('sumindo');
    }, 1300);
    setTimeout(function() {
      msgEnvio.classList.remove('aparecendo');
      msgEnvio.classList.remove('sumindo');
    }, 1500);
  }
}

function verificaPalavras(input, qtd) {
  const palavra = input.value.trim();
  const palavras = input.value.split(' ');
  if (palavras.length < qtd || palavra === '') {
    input.value = null;
    input.classList.add("error");
    input.classList.add("shake");
    return false;
  }
  else return true;
}

function verificaEmail() {
  const email = iptEmail.value.trim();
  const iArroba = email.indexOf('@');
  const iPonto = email.indexOf('.', iArroba);
  let qtdArroba = 0;
  for (let l of email) {
    if (l === '@') qtdArroba++;
  }
  if (qtdArroba >= 2 || iArroba === 0 || email.length === 0 || iArroba === -1 || iPonto === -1 || iPonto <= iArroba + 1) {
    iptEmail.value = null;
    iptEmail.classList.add("error");
    iptEmail.classList.add("shake");
    return false;
  } else return true;
}

function verificaTelefone() {
  let numero = iptTelefone.value.replace(/[()\s-]/g, '');
  if (numero.length !== 11) {
    iptTelefone.value = null;
    iptTelefone.classList.add("error");
    iptTelefone.classList.add("shake");
    return false;
  } else if (!checaNan(numero)) {
    iptTelefone.value = null;
    iptTelefone.classList.add("error");
    iptTelefone.classList.add("shake");
    return false;
  } else return true;
}

function checaNan(numero) {
  let flag = true;
  for (let n of numero) {
    if (isNaN(n)) flag = false;
  }
  return flag;
}

function focus() {
  event.target.classList.remove("error");
  event.target.classList.remove("shake");
}