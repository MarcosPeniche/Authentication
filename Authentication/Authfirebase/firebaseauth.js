// Importa as funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDdd_Ou4ff4f_wGM94hbOD7tNT_zBBJTo0",
    authDomain: "pw02-c0b28.firebaseapp.com",
    projectId: "pw02-c0b28",
    storageBucket: "pw02-c0b28.appspot.com",
    messagingSenderId: "1063983057431",
    appId: "1:1063983057431:web:c8ff1853b04a4491746a52"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(); // Configura o serviço de autenticação
const db = getFirestore(); // Conecta ao Firestore

// Função para exibir mensagens temporárias na interface
function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function() {
        messageDiv.style.opacity = 0;
    }, 5000); // A mensagem desaparece após 5 segundos
}

// Lógica de cadastro de novos usuários
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault(); // Previne o comportamento padrão do botão

    // Captura os dados do formulário de cadastro
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    const auth = getAuth(); // Configura o serviço de autenticação
    const db = getFirestore(); // Conecta ao Firestore

    // Cria uma conta com e-mail e senha
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user; // Usuário autenticado
        const userData = { email, firstName, lastName }; // Dados do usuário para salvar

        showMessage('Conta criada com sucesso', 'signUpMessage'); // Exibe mensagem de sucesso

        // Salva os dados do usuário no Firestore
        const docRef = doc(db, "users", user.uid);
        setDoc(docRef, userData)
        .then(() => {
            window.location.href = 'index.html'; // Redireciona para a página de login após cadastro
        })
        .catch((error) => {
            console.error("Error writing document", error);
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        if (errorCode == 'auth/email-already-in-use') {
            showMessage('Endereço de email já existe', 'signUpMessage');
        } else {
            showMessage('Não é possível criar usuário', 'signUpMessage');
        }
    });
});

// Lógica de login de usuários existentes
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
    event.preventDefault(); // Previne o comportamento padrão do botão

    // Captura os dados do formulário de login
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth = getAuth(); // Configura o serviço de autenticação

    // Realiza o login com e-mail e senha
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        showMessage('Usuário logado com sucesso', 'signInMessage'); // Exibe mensagem de sucesso
        const user = userCredential.user;

        // Salva o ID do usuário no localStorage
        localStorage.setItem('loggedInUserId', user.uid);

        window.location.href = 'homepage.html'; // Redireciona para a página inicial
    })
    .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-credential') {
            showMessage('Email ou Senha incorreta', 'signInMessage');
        } else {
            showMessage('Essa conta não existe', 'signInMessage');
        }
    });
});

// Login com Google
const provider = new GoogleAuthProvider();

const botaoGoogle = document.getElementById("loginGoogle");
botaoGoogle.addEventListener("click", function() {
    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
        
        // Armazena os dados do usuario logado dentro do localstorage

            localStorage.setItem('nomeUsuarioGoogle', user.displayName);
            localStorage.setItem('emailUsuarioGoogle', user.email);
            localStorage.setItem('loggedInUserIdGoogle', user.uid);

        // Redireciona o usuario para a pagina de login

            })
            .then(() => {
                window.location.href = 'homepage.html';
            })

        // Coloca um erro nas logs do console caso não seja possivel salvar o usuario

            .catch((error) => {
                console.error("Ocorreu um erro ao salvar os dados do usuario", error);
            });

        });

// Redefinição de senha

const RecuperarSenha = document.getElementById("SubmitRecoverPassword")
RecuperarSenha.addEventListener("click", function () {
    const emailRecuperação = document.getElementById("recoverEmail");
    const email = emailRecuperação.value;

    sendPasswordResetEmail(auth, email)
    .then(() => {
        console.log('Email enviado');
    })
    .catch((error) => {
        console.log('Email NÃO enviado');
    });
});