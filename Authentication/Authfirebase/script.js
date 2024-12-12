// Obtém os elementos de botão e formulários de login/cadastro
const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const goBacktoLoginButton = document.getElementById('goBacktoLoginButton');
const signInForm = document.getElementById('signIn');
const signUpForm = document.getElementById('signup');
const RecuperarSenhaBotao = document.getElementById('recoverPasswordButton');
const RecuperarSenhaForm = document.getElementById('recoverPasswordForm')


// Quando o botão de cadastro é clicado, esconde o formulário de login e mostra o de cadastro
signUpButton.addEventListener('click', function() {
    signInForm.style.display = "none";
    signUpForm.style.display = "block";
    RecuperarSenhaForm.style.display = "none";
});

// Quando o botão de login é clicado, esconde o formulário de cadastro e mostra o de login
signInButton.addEventListener('click', function() {
    signInForm.style.display = "block";
    signUpForm.style.display = "none";
    RecuperarSenhaForm.style.display = "none";
});

RecuperarSenhaBotao.addEventListener('click', function() {
    RecuperarSenhaForm.style.display = "block";
    signUpForm.style.display = "none";
    signInForm.style.display = "none";
});

goBacktoLoginButton.addEventListener('click', function () {
    RecuperarSenhaForm.style.display = "none";
    signUpForm.style.display = "none";
    signInForm.style.display = "block";
})
