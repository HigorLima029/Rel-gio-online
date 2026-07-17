# ⏰ Relógio Digital Mundial

Um relógio desenvolvido com **HTML**, **CSS** e **JavaScript** puro, que exibe a hora atual em tempo real para qualquer país do mundo.

## ✨ Funcionalidades

- 🌍 **Seletor de país/fuso horário** — escolha entre mais de 15 países (Brasil, Espanha, EUA, Japão, etc.) e o relógio atualiza em tempo real para o fuso escolhido.
- 🌓 **Tema claro/escuro** — botão no canto superior direito, preferência salva no navegador.
- 📅 **Data atual** — dia da semana, dia, mês e ano por extenso, no fuso selecionado.
- 📱 **Responsivo** — layout se adapta a celulares e tablets.
- 🕑 **Versão analógica** — alterne entre o relógio digital e um relógio analógico com ponteiros animados.

## 🚀 Tecnologias utilizadas

- HTML5
- CSS3 (variáveis CSS para os temas)
- JavaScript (vanilla) — `Intl.DateTimeFormat` para fusos horários, sem bibliotecas externas

## 📂 Estrutura do Projeto

```
relogio-digital/
├── index.html   # Estrutura do relógio, seletor de país e botões
├── style.css    # Estilização, temas claro/escuro e responsividade
└── script.js    # Lógica de fuso horário, data, tema e ponteiros analógicos
```

## 💡 Como usar

1. Clone o repositório ou baixe os arquivos.
2. Abra o arquivo `index.html` no seu navegador.
3. Escolha o país no seletor para ver a hora em tempo real por lá.
4. Use os botões no topo para trocar o tema ou a versão do relógio.

## 🛠️ Possíveis melhorias futuras

- Permitir adicionar/remover países favoritos.
- Comparar vários fusos horários lado a lado.
- Alarme/timer.
- PWA (instalável e funcionando offline).

## 📄 Licença

Este projeto é de uso livre para fins educacionais e pessoais.
