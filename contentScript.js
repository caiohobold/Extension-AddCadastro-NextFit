"use strict"
/*
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
*/

const user = JSON.parse(localStorage.getItem('USER'));
const token = localStorage.getItem('X-AUTH-TOKEN');
const INSERT_CLIENTE_URL = 'https://api.nextfit.com.br/api/v2/Cliente/Inserir';

const postOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
};

function init() {
  const container = document.querySelector('div > div.layout-align-end-center.layout-row');
  container.insertAdjacentHTML('beforebegin', '<button id="btnCadastro">+ Cadastro</button>')
  const botao = document.getElementById('btnCadastro')

  botao.onclick = async () => {
    botao.textContent = "Adicionado!"
    setTimeout(() => {
      botao.textContent = "+ Cadastro";
    }, 3000);
    const body = document.querySelector('body > div.topbar.shadow');
    setTimeout(() => {
      body.removeChild(msgCadastro)
    }, 4000)

    await postUser();


    async function postUser() {
      const nomeCompleto = gerarNomeAleatorio();
      const payload = {
        Nome: nomeCompleto,
        DataNascimento: gerarDataNascimentoAleatoria(),
        Email: gerarEmail(nomeCompleto),
        Cpf: gerarCpfAleatorio(),
        Rg: gerarRgAleatorio(),
        Sexo: 1,
        Cep: gerarEnderecoAleatorio().cep,
        Bairro: gerarEnderecoAleatorio().bairro,
        Endereco: gerarEnderecoAleatorio().rua,
        NumEndereco: gerarEnderecoAleatorio().numero
      };

      

      try {
        const response = await fetch(INSERT_CLIENTE_URL, { ...postOptions, body: JSON.stringify(payload) });
        body.insertAdjacentHTML('beforeend', `<div id="msgCadastro">Cadastro adicionado!<br> <span class="nome-cliente">Nome: ${nomeCompleto}</span></div>`)
        const msgCadastro = document.getElementById('msgCadastro')

        if (!response.ok) {
          throw new Error('EX-002: erro no envio para api.nextfit');
        }

        const data = await response.json();

        const createdUser = {
          ...payload,
          newUserId: data.Content.Id,
          user_id: user.Id,
          user_name: user.Nome,
          user_email: user.Email,
          Cpf: gerarCpfAleatorio(),
          Rg: gerarRgAleatorio(),
          DdFone: gerarDDDAleatorio(),
          Fone: gerarFoneAleatorio(),
          Cep: gerarEnderecoAleatorio().cep,
          Bairro: gerarEnderecoAleatorio().bairro,
          Endereco: gerarEnderecoAleatorio().rua,
          NumEndereco: gerarEnderecoAleatorio().numero
        }

        console.log(createdUser)

        chrome.runtime.sendMessage({ action: 'postCreatedUser', createdUser },
          (response) => {
            if (response.status === 201) {
              console.log(response.status);
            } else {
              console.error(response);
            }
          });

      } catch (error) {
        console.error('Erro:', error);
      }
    }

    function gerarEnderecoAleatorio(){
      const cep = ["93222280", "69900718", "79108090", "77828200", "97573636", "29172380", "60050165", "76808272", "68903856", "44090504"];
      const ruas = ["Rua Daniel Dinis da Fonseca", "Rua Mata Grande", "Rua Celso Pinheiro", "Rua Beltrando de Azevedo", "Rua Primeiro de Agosto", "Travessa Rubens Peixoto", "Travessa José Tancredo Filho"]
      const num_endereco = Math.floor(Math.random() * 1000) + 1;
      const bairro = ["São Joaquim", "Jardim América", "Tabajara", "Parque Dois Irmãos", "Jardim das Palmeiras", "Cidade Operária", "Santos Dumont"]

      const cepIndex = Math.floor(Math.random() * cep.length);
      const ruaIndex = Math.floor(Math.random() * ruas.length);
      const bairroIndex = Math.floor(Math.random() * bairro.length);

      const endereco = {
        rua: ruas[ruaIndex],
        numero: num_endereco,
        cep: cep[cepIndex],
        bairro: bairro[bairroIndex]
      }

      return endereco;
    }


    function gerarEmail(nome) {
      const primeiroNome = nome.split(' ')[0].toLowerCase();
      const sobreNome = nome.split(' ')[1].toLowerCase();
      const dominios = ['teste.com', 'teste.com.br', 'testenextfit.com'];

      return `${primeiroNome}.${sobreNome}@${dominios[Math.floor(Math.random() * dominios.length)]}`;
    }

    function gerarCpfAleatorio() {
      let cpf = "";
      for (let i = 0; i < 9; i++) {
        cpf += Math.floor(Math.random() * 10).toString();
      }

      cpf += calcularDigito(cpf, 10, 2).toString();
      cpf += calcularDigito(cpf, 11, 2).toString();

      return cpf;
    }

    function calcularDigito(cpf, pesoInicial, pesoFinal) {
      let soma = 0;
      for (let i = 0; i < cpf.length; i++) {
        soma += parseInt(cpf[i]) * (pesoInicial - i);
      }
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    }

    function gerarRgAleatorio() {
      let rg = "";
      for (let i = 0; i < 9; i++) {
        rg += Math.floor(Math.random() * 10).toString();
      }
      return rg;
    }

    function gerarDDDAleatorio() {
      return Math.floor(Math.random() * 100).toString().padStart(2, '0');
    }

    function gerarFoneAleatorio() {
      return Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
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