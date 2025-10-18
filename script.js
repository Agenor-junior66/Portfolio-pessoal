document.addEventListener('DOMContentLoaded', function() {
    
    // 1. LÓGICA DE TEMA CLARO/ESCURO (Interação)
    
    const themeButton = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Função principal para trocar o tema
    function toggleTheme() {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeButton.textContent = isDark ? 'Tema Claro' : 'Tema Escuro';
    }
    
    // Função para aplicar o tema salvo ao carregar a página
    function applySavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark') {
            body.classList.add('dark-theme');
            if (themeButton) themeButton.textContent = 'Tema Claro';
        } else {
            if (themeButton) themeButton.textContent = 'Tema Escuro';
        }
    }
    
    // Aplica o tema salvo imediatamente
    applySavedTheme();

    // Adiciona o evento de clique ao botão
    if (themeButton) {
        themeButton.addEventListener('click', toggleTheme);
    }
    
    // 2. LÓGICA DO FORMULÁRIO DE CONTATO (Validação e Simulação)

    const form = document.getElementById('form-contato');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalButton = document.getElementById('modal-close-btn');

    // Função para exibir o modal de confirmação (em vez de alert())
    function showModal(title, message, isSuccess) {
        const modalTitle = document.getElementById('modal-title');
        const modalMessage = document.getElementById('modal-message');
        const modalContent = document.querySelector('.modal-content');

        modalTitle.textContent = title;
        modalMessage.textContent = message;
        
        // Ajusta a cor da borda e texto do modal para feedback de sucesso ou erro
        if (isSuccess) {
            modalContent.style.borderColor = 'var(--cor-principal)';
            modalTitle.style.color = 'var(--cor-principal)';
        } else {
            modalContent.style.borderColor = '#dc3545'; /* Vermelho para erro */
            modalTitle.style.color = '#dc3545'; 
        }

        modalOverlay.classList.add('show');
    }

    // Função para esconder o modal
    function hideModal() {
        modalOverlay.classList.remove('show');
    }

    // Evento para fechar o modal
    if (modalButton) {
        modalButton.addEventListener('click', hideModal);
    }
    if (modalOverlay) {
        // Fecha o modal ao clicar fora da caixa
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                hideModal();
            }
        });
    }

    // Processamento do formulário (só roda na página contato.html)
    if (form) { 
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            // 1. Captura e limpeza dos valores
            const tipo = document.getElementById('tipo') ? document.getElementById('tipo').value.trim() : ''; // Novo campo 'tipo'
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();
            
            // Regex simples para validação de e-mail (obrigatório)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // --- Validação ---
            
            // Verifica se o campo 'tipo' e todos os outros campos obrigatórios estão preenchidos
            if (!tipo || !nome || !email || !mensagem) {
                showModal('Erro na Validação', 'Por favor, preencha todos os campos obrigatórios.', false);
                return;
            }

            // Verifica o formato do e-mail
            if (!emailRegex.test(email)) {
                showModal('Erro na Validação', 'O e-mail inserido possui um formato inválido.', false);
                return;
            }

            // --- Simulação do Envio (Requisito atendido) ---
            
            // Simula uma requisição assíncrona com um pequeno delay
            setTimeout(() => {
                showModal('Mensagem Enviada!', 'Sua mensagem foi recebida com sucesso! Em breve, entrarei em contato. (Motivo: ' + (tipo === 'feedback' ? 'Feedback' : 'Contato') + ')', true);
                
                // Limpa os campos após o envio bem-sucedido
                form.reset();
            }, 800);
        });
    }
});