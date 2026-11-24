/* ===== Spotlight do cursor ===== */
function initCursorSpotlight() {
  // Em telas de toque, não faz nada
  if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

  const root = document.documentElement;
  const SMOOTHNESS = 0.12; // menor = mais lento e suave

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;

  // Guarda onde o mouse está e acende o brilho
  document.addEventListener("mousemove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    root.style.setProperty("--spot-opacity", "1");
  });

  // Apaga o brilho quando o mouse sai da janela
  document.documentElement.addEventListener("mouseleave", () => {
    root.style.setProperty("--spot-opacity", "0");
  });

  // A cada frame, o brilho anda uma parte do caminho até o mouse
  function animateSpotlight() {
    currentX += (targetX - currentX) * SMOOTHNESS;
    currentY += (targetY - currentY) * SMOOTHNESS;
    root.style.setProperty("--mouse-x", currentX + "px");
    root.style.setProperty("--mouse-y", currentY + "px");
    requestAnimationFrame(animateSpotlight);
  }

  animateSpotlight();
}

document.addEventListener("DOMContentLoaded", initCursorSpotlight);

// digitando animação

const titulo = document.querySelector('.digitando');

function ativaLetra(elemento) {
    const arrTexto = elemento.innerHTML.split('');
    elemento.innerHTML = '';

    arrTexto.forEach((letra, i) => {
        setTimeout(() => {
            elemento.innerHTML += letra;
        }, 75 * i);
    });
}

ativaLetra(titulo);


/* ===== Link ativo no header (acompanha a rolagem) ===== */
function initActiveNavLink() {
  const links = Array.from(document.querySelectorAll(".header__link"));

  // Junta cada link com a seção para onde ele aponta
  const pares = links
    .map((link) => ({ link, alvo: document.querySelector(link.getAttribute("href")) }))
    .filter((par) => par.alvo);

  if (pares.length === 0) return;

  function atualizar() {
    const linhaDeLeitura = 140; // distância do topo da tela
    let atual = pares[0];

    pares.forEach((par) => {
      if (par.alvo.getBoundingClientRect().top <= linhaDeLeitura) {
        atual = par;
      }
    });

    // No topo da página, sempre "Início"; no fim, sempre o último link
    if (window.scrollY < 80) {
      atual = pares[0];
    } else if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      atual = pares[pares.length - 1];
    }

    links.forEach((link) => {
      link.classList.toggle("is-active", link === atual.link);
    });
  }

  window.addEventListener("scroll", atualizar, { passive: true });
  window.addEventListener("resize", atualizar);
  atualizar();
}

document.addEventListener("DOMContentLoaded", initActiveNavLink);