document.addEventListener('DOMContentLoaded', function() {
    // Pega o ID do usuário da URL (por exemplo, ?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    // Faz a requisição para obter os detalhes do usuário
    const token = localStorage.getItem('token');  // Obtém o token do localStorage
    fetch(`http://localhost:8000/api/users/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,  // Inclui o token de autenticação
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar detalhes do usuário');
        }
        return response.json();
    })
    .then(data => {
        // Preenche os detalhes do usuário na página
        document.getElementById('userName').textContent = data.name;
        document.getElementById('userEmail').textContent = data.email;
        document.getElementById('userCreatedAt').textContent = new Date(data.createdAt).toLocaleDateString('pt-BR');
        // Adicione mais campos conforme necessário
    })
    .catch(error => {
        console.error('Erro ao carregar os detalhes do usuário:', error);
    });
});
