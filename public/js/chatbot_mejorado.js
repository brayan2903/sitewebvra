// chatbot_mejorado.js

let activeUtterance = null; // 🗣️ Control de voz activa

function normalize(text) {
    return text.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

const ChatStorage = {
    saveHistory(content) {
        localStorage.setItem('chatHistory', content);
    },
    loadHistory() {
        return localStorage.getItem('chatHistory') || '';
    },
    clearHistory() {
        localStorage.removeItem('chatHistory');
    },
};

window.addEventListener('DOMContentLoaded', () => {
    const chatUI = {
        button: document.getElementById('chatButton'),
        container: document.getElementById('chatContainer'),
        body: document.getElementById('chatBody'),
        input: document.getElementById('userInput'),
        sendBtn: document.getElementById('sendButton'),
        closeBtn: document.getElementById('closeChat'),
        modal: document.getElementById('imageModal'),
        modalImg: document.getElementById('expandedImg'),
        modalClose: document.querySelector('.image-modal-close')
    };

    const sessionId = Date.now().toString();

    // Reiniciar historial en cada carga de página
    ChatStorage.clearHistory();
    chatUI.body.innerHTML = '';

    chatUI.button.addEventListener('click', () => {
        window.speechSynthesis.cancel(); // 🛑 Callar el bot si estaba hablando
        chatUI.container.classList.remove('hidden');
        chatUI.button.style.display = 'none';
        chatUI.body.innerHTML = '';
        addBotMessage("¡Hola! Soy el asistente virtual del Vicerrectorado Académico de la UNA Puno. ¿En qué puedo ayudarte hoy?");
        addQuickLinks();
    });
    
    chatUI.closeBtn.addEventListener('click', () => {
        window.speechSynthesis.cancel(); // 🛑 Callar el bot si estaba hablando
        addBotMessage("Fue un placer ayudarte 😊 ¡Hasta pronto!");
        speak("Fue un placer ayudarte. Hasta pronto.");

        // Espera un poco para que se lea antes de cerrar
        setTimeout(() => {
            chatUI.container.classList.add('hidden');
            chatUI.button.style.display = 'flex';
            chatUI.body.innerHTML = '';
            ChatStorage.clearHistory();
        }, 2000); // espera 2 segundos
    });

    chatUI.sendBtn.addEventListener('click', () => sendMessage(chatUI));
    chatUI.input.addEventListener('keypress', e => e.key === 'Enter' && sendMessage(chatUI));
    chatUI.modalClose.addEventListener('click', () => chatUI.modal.style.display = 'none');
    chatUI.modal.addEventListener('click', e => e.target === chatUI.modal && (chatUI.modal.style.display = 'none'));

    function sendMessage(ui) {
        window.speechSynthesis.cancel(); // 🛑 Calla el bot si estaba hablando
        const msg = ui.input.value.trim();
        if (!msg) return;
        addUserMessage(msg);
        processMessage(msg);
        ui.input.value = '';
    }

    function addUserMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'message user-message';
        msg.textContent = text;
        chatUI.body.appendChild(msg);
        chatUI.body.appendChild(document.createElement('div')).style.clear = 'both';
        chatUI.body.scrollTop = chatUI.body.scrollHeight;
        ChatStorage.saveHistory(chatUI.body.innerHTML);
    }

    function addBotMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'message bot-message';
        msg.textContent = text;
        chatUI.body.appendChild(msg);
        chatUI.body.scrollTop = chatUI.body.scrollHeight;
        ChatStorage.saveHistory(chatUI.body.innerHTML);
        speak(text);
    }

    function addQuickLinks() {
        const quickLinks = ["Contacto", "Matrícula", "Cursos", "Nivelación", "Diplomados", "Asistencia", "Bibliotecas", "Carreras", "Examenes"];
        const wrapper = document.createElement('div');
        wrapper.className = 'quick-links';

        quickLinks.forEach(link => {
            const span = document.createElement('span');
            span.className = 'quick-link';
            span.textContent = link;
            span.onclick = () => {
                window.speechSynthesis.cancel(); // 🛑 Calla si estaba hablando
                chatUI.input.value = link;
                chatUI.sendBtn.click();
            };

            wrapper.appendChild(span);
        });
        chatUI.body.appendChild(wrapper);
        chatUI.body.scrollTop = chatUI.body.scrollHeight;
        ChatStorage.saveHistory(chatUI.body.innerHTML);
    }

    function speak(text) {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();

            const voices = speechSynthesis.getVoices();
            const msg = new SpeechSynthesisUtterance(text);

            // ✅ Configura idioma, velocidad y voz específica
            msg.lang = 'es-PE'; // Español Perú
            msg.rate = 2;    // Velocidad (1.0 es normal, puedes subir hasta ~2)
            msg.pitch = 1;      // Tono normal
            msg.volume = 1;     // Volumen máximo

            // ✅ Busca una voz compatible
            const preferredVoices = voices.filter(voice =>
                voice.lang.includes('es') && (voice.name.includes('Google') || voice.name.includes('Microsoft') || voice.name.includes('Paulina') || voice.name.includes('Lucia'))
            );
            if (preferredVoices.length > 0) {
                msg.voice = preferredVoices[0];
            }

            activeUtterance = msg;
            speechSynthesis.speak(msg);
        }
    }

    function processMessage(message) {
        const msgNorm = normalize(message);
        const matched = knowledgeBase.find(kb => kb.keywords.some(kw => msgNorm.includes(normalize(kw))));

        if (matched) {
            addBotMessage(matched.response);
            if (matched.resources) matched.resources.forEach(addResource);
            if (matched.quickLinks) addQuickLinks();
        } else {
            addBotMessage("Lo siento, no tengo información específica sobre eso. Puedes preguntarme sobre admisión, matrícula, cursos, biblioteca, entre otros.");
            addQuickLinks();
        }
    }

    function addResource(res) {
        const box = document.createElement('div');
        box.className = 'message bot-message';

        if (res.type === 'link') {
            const a = document.createElement('a');
            a.href = res.url.startsWith('http') ? res.url : 'https://' + res.url;
            a.target = '_blank';
            a.className = 'resource-link';
            a.innerHTML = `
                <img src="${res.icon}" alt="icono recurso">
                <div class="resource-info">
                    <div class="resource-title">${res.title}</div>
                    <div class="resource-desc">${res.description}</div>
                </div>
            `;
            box.appendChild(a);
        } else if (res.type === 'image') {
            const img = document.createElement('img');
            img.src = res.url;
            img.alt = res.alt || 'imagen';
            img.onclick = () => showImageModal(img.src, img.alt);
            box.appendChild(img);
        } else if (res.type === 'info') {
            box.innerHTML = res.content;
        }

        chatUI.body.appendChild(box);
        chatUI.body.scrollTop = chatUI.body.scrollHeight;
        ChatStorage.saveHistory(chatUI.body.innerHTML);
    }

    function showImageModal(url, alt) {
        chatUI.modalImg.src = url;
        chatUI.modalImg.alt = alt;
        chatUI.modal.style.display = 'flex';
    }
});
