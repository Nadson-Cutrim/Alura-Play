import { conectaApi } from "./conectaApi.js";
import constroiCard from "./mostrarVideos.js";

async function buscarVideo(evento) {
  evento.preventDefault();
  const dadosDePesquisa = document.querySelector("[data-pesquisa]").value;
  const busca = await conectaApi.buscaVideo(dadosDePesquisa);

  const lista = document.querySelector("[data-lista]");

  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }

  busca.forEach((elemento) =>
    lista.appendChild(
      constroiCard(
        elemento.titulo,
        elemento.descricao,
        elemento.url,
        elemento.imagem
      )
    )
  );
  if (busca.length == 0) {
    lista.innerHTML = `<h2 class="mensagem__titulo" style="color: red;">Não existe videos com esse termo 😭😭😭</h2>`;
    lista.style = `display: flex; 
    justify-content: center; 
    align-items: center; 
    width: 100%;
    height: 80vh;
    `;
  }
}

const botaoDePesquisa = document.querySelector("[data-botao-pesquisa]");

botaoDePesquisa.addEventListener("click", (evento) => buscarVideo(evento));
