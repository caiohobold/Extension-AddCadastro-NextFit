"use strict"


function sendLocalStorageToBackground() {
  const localStorageData = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    localStorageData[key] = value;
  }

  chrome.runtime.sendMessage({ type: 'localData', data: localStorageData });
}

sendLocalStorageToBackground();


function init(){
  const container = document.querySelector('div > div.layout-align-end-center.layout-row');
  container.insertAdjacentHTML('beforebegin', '<button id="btnCadastro">+ Cadastro</button>')
  const botao = document.getElementById('btnCadastro')

  botao.onclick = () =>{
    botao.textContent = "Adicionado!"
    setTimeout(() => {
      botao.textContent = "+ Cadastro";
    }, 3000);
    const body = document.querySelector('body > div.topbar.shadow');
    body.insertAdjacentHTML('beforeend', '<div id="msgCadastro">Cadastro adicionado!</div>')
    const msgCadastro = document.getElementById('msgCadastro')
    setTimeout(() =>{
      body.removeChild(msgCadastro)
    }, 4000)
    const localStorageData = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      localStorageData[key] = value;
    }

    enviarJSONParaAPI(localStorageData['X-AUTH-TOKEN'])


      function enviarJSONParaAPI(token) {
        const url = "https://api.nextfit.com.br/api/v2/Cliente/Inserir";
          
        const exemploJSON = {
            nome: gerarNomeAleatorio(),
            DataNascimento: gerarDataNascimentoAleatoria()
        };
    
    
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Adiciona o token de autenticação Bearer
            },
            body: JSON.stringify(exemploJSON)
        };
    
        fetch(url, options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Erro ao enviar JSON para a API');
            })
            .then(data => {
                console.log('JSON enviado com sucesso!');
                console.log('Resposta da API:', data);
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }
    
    function gerarNomeAleatorio() {
        const nomes = ["Sophia",
            "Laura",
            "Valentina",
            "Beatriz",
            "Lara",
            "Ana Luiza",
            "Emanuelly",
            "Maria Alice",
            "Amanda",
            "Sofia",
            "Beatriz",
            "Helena",
            "Luisa",
            "Manuela",
            "Melissa",
            "Bianca",
            "Ana",
            "Alana",
            "Lorena",
            "Isis",
            "Giovana",
            "Abigail",
            "Larissa",
            "Leticia",
            "Eduarda",
            "Sara",
            "Rafaela",
            "Agnes",
            "Aline",
            "Luana",
            "Estela",
            "Lia",
            "Micaela",
            "Fernanda",
            "Emanuela",
            "Anita",
            "Eva",
            "Paloma",
            "Yara",
            "Juliana",
            "Milene",
            "Dulce",
            "Raquel",
            "Arthur",
            "Matheus",
            "Heitor",
            "Felipe",
            "Gustavo",
            "Henrique",
            "Murilo",
            "Benjamin",
            "Isaac",
            "Lucca",
            "Bryan",
            "Vicente",
            "Thiago",
            "Miguel",
            "Enzo",
            "Gabriel",
            "Henrique",
            "Mateus",
            "Caio",
            "Joaquim",
            "Samuel",
            "Leonardo",
            "Augusto",
            "Igor",
            "Alan",
            "Emanuel",
            "Kevin",
            "Valentim",
            "Leandro",
            "Marcelo",
            "Frederico",
            "Paulo",
            "Abel",
            "Pablo",
            "Raul",
            "Marcos",
            "Alexander",
            "Jonas",
            "Duarte",
            "Juliano"]; 
        const sobrenomes = [
            "Oliveira",
            "Santos",
            "Silva",
            "Pereira",
            "Costa",
            "Souza",
            "Rodrigues",
            "Almeida",
            "Ferreira",
            "Carvalho",
            "Lima",
            "Araujo",
            "Castro",
            "Fernandes",
            "Ramos",
            "Rocha",
            "Martins",
            "Ribeiro",
            "Alves",
            "Vieira",
            "Carvalho",
            "Medeiros",
            "Vasconcelos",
            "Oliveira",
            "Lima",
            "Ribeiro",
            "Azevedo",
            "Figueiredo",
            "Peixoto",
            "Pacheco",
            "Machado",
            "Marinho",
            "Moraes",
            "Alencar",
            "Galvão",
            "Brito",
            "Miranda",
            "Lopes",
            "Abreu",
            "Tavares"
        ]; // Lista de sobrenomes
        const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
        const sobrenomeAleatorio = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
        return `${nomeAleatorio} ${sobrenomeAleatorio}`;
    }
    
    function gerarDataNascimentoAleatoria() {
        const anoAtual = 2024;
        const idadeMinima = 10;
        const idadeMaxima = 60;
    
        const anoNascimento = anoAtual - Math.floor(Math.random() * (idadeMaxima - idadeMinima + 1)) - idadeMinima;
    
        const mesNascimento = Math.floor(Math.random() * 12) + 1;
    
        const diaNascimento = Math.floor(Math.random() * 28) + 1;
    
        const dataNascimento = `${anoNascimento}-${mesNascimento.toString().padStart(2, '0')}-${diaNascimento.toString().padStart(2, '0')}`;
    
        return dataNascimento;
    }
  }
}

init()