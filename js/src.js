"use strict";

/** Aplicación en JavaScript que transforma un JSON con
eventos en una línea temporal visual.

Descripción

●Se proporciona un JSON que contiene un array de objetos que 
representan eventos desordenados en el tiempo.

●La aplicación debe procesar estos eventos y ordenarlos en el 
tiempo.

●Usando los métodos de DOM debe introducir en el HTML cada uno 
de estos eventos representando todos los datos correspondientes: 
año, título, imágen y texto.

●El timeline puede ser horizontal o vertical.


Recursos
●Lista de eventos1
●document.createElement2
●Element.innerHTML3
Bonus
●Como extra no obligatorio la aplicación puede mostrar un 
formulario con los campos necesarios para introducir 
dinámicamente un nuevo evento en la línea temporal después de 
que los elementos del JSON ya estén representados.
1 https://gist.github.com/bertez/8e62741154903c35edb3bfb825a7f052
2 https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
3 https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML

 */

const ul = document.querySelector("ul");

/**Llamamos al JSON */
async function getData() {
  const response = await fetch("/js/zelda.json");

  const datos = await response.json();

  return datos;
}

const forms = document.forms.formulario;
const title = forms.elements.titulo;
const date = forms.elements.date;
const image = forms.elements.imagen;
const text = forms.elements.parrafo;

///////////////////////////////////////////////////////////////

/**DOS FORMAS DIFERENTES */
/* const arrayJuegos = [
  {
    date: date.value,
    title: title.value,
    image: image.value,
    text: text.value,
  },
]; */

const arrayJuegos = [
  `date: ${date.value},
    title: ${title.value},
    image: ${image.value},
    text: ${text.value}`,
];

console.log(arrayJuegos);

const arrayVacio = [];

arrayVacio.push(arrayJuegos);

/////////////////////////////////////////////////////////////////

function handleSubmitForm(e) {
  // evitamos el comportamiento por defecto de enviar un form (recargar la pagina)
  e.preventDefault();

  /**Esto lo tengo bien */

  const li = document.createElement("li");
  li.innerHTML += `${`
  ${`<img src=${image.value} alt="imagen random" />`}
  ${`<h2>${title.value}</h2>`}
  ${`<div>${date.value}</div>`}
  ${`<p>${text.value}</p>`}`}
  `;

  console.log(li);
  ul.append(li);

  forms.reset();
}

forms.addEventListener("submit", handleSubmitForm);

localStorage.setItem("JuegoNuevo", JSON.stringify(arrayJuegos));
const arrayJuegosJSON = JSON.parse(localStorage.getItem("JuegoNuevo"));

async function printData(url) {
  const info = await getData(url);

  console.log(info);
  console.log(arrayJuegos);
  info.push(arrayJuegos);

  info.sort(function (a, b) {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  ul.innerHTML = "";
  for (const result of info) {
    const { title, date, text, image } = result; // cada result es un juego

    ul.innerHTML += `${`<li>
    ${`<img src=${image} alt="imagen random" />`}
    ${`<h2>${title}</h2>`}
    ${`<div>${date}</div>`}
    ${`<p>${text}</p>`} </li>`}
    `;
  }
}

printData();

console.log(arrayJuegos);
