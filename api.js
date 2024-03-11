/**
 * @param {object} createdUser - Espera um objeto sobre o usuário criado
 * @returns {Promise<number>} - Retorna o status da requisição feita para a API cagada em ts
 */

const URL = 'https://nextfit-utils-api-production.up.railway.app/users';

const postCreatedUser = async (createdUser) => {
    if (typeof createdUser !== 'object')
        throw new Error(`EX-001: ${typeof createdUser} nao é objeto comilança de merda`);


    const payload = {
        new_user_id: createdUser.newUserId,
        nome: createdUser.Nome,
        cpf: createdUser.cpf || null,
        rg: createdUser.rg || null,
        dd_fone: createdUser.DdFone || null,
        fone: createdUser.Fone || null,
        data_nascimento: createdUser.DataNascimento || null,
        email: createdUser.Email || null,
        cod_objetivo: createdUser.CodObjetivo || null,
        tem_responsavel: createdUser.TemResponsavel || null,
        codigo_cliente_responsavel: createdUser.CodigoClienteResponsavel || null,
        sexo: createdUser.Sexo || null,
        cod_usuario_professor: createdUser.CodUsuarioProfessor || null,
        cod_usuario_consultor: createdUser.CodUsuarioConsultor || null,
        cep: createdUser.Cep || null,
        bairro: createdUser.Bairro || null,
        endereco: createdUser.Endereco || null,
        num_endereco: createdUser.NumEndereco || null,
        user_id: createdUser.user_id,
        user_name: createdUser.user_name,
        user_email: createdUser.user_email
    }

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }

    return (await fetch(URL, options)).status;
}

// Mensagem recebida do contentScript.js
chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
    if (request.action === "postCreatedUser") {
        postCreatedUser(request.createdUser)
            .then((status) => sendResponse({ status }))
            .catch((error) => sendResponse({ error: error.message }));
        return true;
    }
})