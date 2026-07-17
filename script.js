// ---------- elementos ----------
const elHoras = document.getElementById('horas');
const elMinutos = document.getElementById('minutos');
const elSegundos = document.getElementById('segundos');
const elData = document.getElementById('data');
const elDataAnalog = document.getElementById('data-analog');
const elSelect = document.getElementById('fuso');
const elBandeira = document.getElementById('bandeira');
const elOffset = document.getElementById('offset');
const elTituloPais = document.getElementById('pais-nome-titulo');

const ponteiroHora = document.getElementById('ponteiro-hora');
const ponteiroMinuto = document.getElementById('ponteiro-minuto');
const ponteiroSegundo = document.getElementById('ponteiro-segundo');
const elMarcas = document.getElementById('marcas');

const btnTema = document.getElementById('theme-toggle');
const btnView = document.getElementById('view-toggle');
const viewDigital = document.getElementById('view-digital');
const viewAnalogico = document.getElementById('view-analogico');

// ---------- estado (com persistência) ----------
const state = {
    fuso: localStorage.getItem('relogio.fuso') || 'America/Sao_Paulo',
    tema: localStorage.getItem('relogio.tema') || 'claro',
    view: localStorage.getItem('relogio.view') || 'digital'
};

// ---------- tema ----------
function aplicarTema(tema) {
    state.tema = tema;
    if (tema === 'escuro') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('relogio.tema', tema);
}

btnTema.addEventListener('click', () => {
    aplicarTema(state.tema === 'escuro' ? 'claro' : 'escuro');
});

// ---------- alternância digital/analógico ----------
function aplicarView(view) {
    state.view = view;
    if (view === 'analogico') {
        viewDigital.hidden = true;
        viewAnalogico.hidden = false;
        btnView.textContent = 'Ver relógio digital';
    } else {
        viewDigital.hidden = false;
        viewAnalogico.hidden = true;
        btnView.textContent = 'Ver relógio analógico';
    }
    localStorage.setItem('relogio.view', view);
}

btnView.addEventListener('click', () => {
    aplicarView(state.view === 'analogico' ? 'digital' : 'analogico');
});

// ---------- seletor de país ----------
elSelect.value = state.fuso;

elSelect.addEventListener('change', () => {
    state.fuso = elSelect.value;
    localStorage.setItem('relogio.fuso', state.fuso);
    atualizarCabecalho();
    tick();
});

function atualizarCabecalho() {
    const opcao = elSelect.selectedOptions[0];
    elBandeira.textContent = opcao.dataset.flag || '🌍';
    elTituloPais.textContent = opcao.dataset.nome || '';
}

// ---------- marcas do relógio analógico (60 traços, 12 maiores) ----------
(function criarMarcas() {
    const cx = 150, cy = 150, rOut = 138, rInMaior = 118, rInMenor = 128;
    for (let i = 0; i < 60; i++) {
        const angulo = (i * 6) * (Math.PI / 180);
        const maior = i % 5 === 0;
        const rIn = maior ? rInMaior : rInMenor;
        const x1 = cx + rOut * Math.sin(angulo);
        const y1 = cy - rOut * Math.cos(angulo);
        const x2 = cx + rIn * Math.sin(angulo);
        const y2 = cy - rIn * Math.cos(angulo);
        const linha = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        linha.setAttribute('x1', x1.toFixed(2));
        linha.setAttribute('y1', y1.toFixed(2));
        linha.setAttribute('x2', x2.toFixed(2));
        linha.setAttribute('y2', y2.toFixed(2));
        if (maior) linha.setAttribute('stroke-width', '3');
        elMarcas.appendChild(linha);
    }
})();

// ---------- formatação de data/hora por fuso horário ----------
function obterPartes(fuso) {
    const dtf = new Intl.DateTimeFormat('pt-BR', {
        timeZone: fuso,
        hourCycle: 'h23',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
    const partes = {};
    dtf.formatToParts(new Date()).forEach(p => { partes[p.type] = p.value; });
    return partes;
}

function obterOffset(fuso) {
    try {
        const dtf = new Intl.DateTimeFormat('en-US', {
            timeZone: fuso,
            timeZoneName: 'shortOffset'
        });
        const parte = dtf.formatToParts(new Date()).find(p => p.type === 'timeZoneName');
        return parte ? parte.value.replace('GMT', 'UTC') : '';
    } catch (e) {
        return '';
    }
}

// ---------- loop principal ----------
function tick() {
    const fuso = state.fuso;
    const p = obterPartes(fuso);

    elHoras.textContent = p.hour;
    elMinutos.textContent = p.minute;
    elSegundos.textContent = p.second;

    const dataTexto = `${p.weekday}, ${p.day} de ${p.month} de ${p.year}`;
    elData.textContent = dataTexto;
    elDataAnalog.textContent = dataTexto;

    elOffset.textContent = obterOffset(fuso);

    const h = parseInt(p.hour, 10);
    const m = parseInt(p.minute, 10);
    const s = parseInt(p.second, 10);

    const anguloSeg = s * 6;
    const anguloMin = m * 6 + s * 0.1;
    const anguloHora = (h % 12) * 30 + m * 0.5;

    ponteiroSegundo.style.transform = `rotate(${anguloSeg}deg)`;
    ponteiroMinuto.style.transform = `rotate(${anguloMin}deg)`;
    ponteiroHora.style.transform = `rotate(${anguloHora}deg)`;
}

// ---------- inicialização ----------
aplicarTema(state.tema);
aplicarView(state.view);
atualizarCabecalho();
tick();
setInterval(tick, 1000);
