const ruleOne = document.querySelector(".rule__one");
const ruleTwo = document.querySelector(".rule__two");
const formulario = document.getElementById("formulario");
let ruleTwoElements;
let ruleOneElements;
const numero1 = document.getElementById("numero1");
const numero2 = document.getElementById("numero2");
const tabla = [
  { grid: 1, numero: 10 },
  { grid: 2, numero: 9 },
  { grid: 3, numero: 8 },
  { grid: 4, numero: 7 },
  { grid: 5, numero: 6 },
  { grid: 6, numero: 5 },
  { grid: 7, numero: 4 },
  { grid: 8, numero: 3 },
  { grid: 9, numero: 2 },
  { grid: 10, numero: 1 },
];

document.addEventListener("DOMContentLoaded", () => {
  fillRule(9, "one", ruleOne);
  fillRule(10, "two", ruleTwo);
  ruleTwoElements = document.querySelectorAll(".two");
  ruleOneElements = document.querySelectorAll(".one");
  formulario.reset();
});

function fillRule(cant, rule, element) {
  if (rule === "one") {
    for (let index = cant; index >= 1; index--) {
      const one = createElementRule(index, "one");
      element.appendChild(one);
    }
    fillEqual(element);
  } else {
    for (let index = 0; index <= cant; index++) {
      const two = createElementRule(index, "two");
      element.appendChild(two);
    }
  }
}

function fillEqual(element) {
  const equalSym = document.createElement("span");
  equalSym.classList.add("rule__num", "equal");
  equalSym.textContent = "=";
  element.appendChild(equalSym);
}

function createElementRule(numElement, rule) {
  const num = document.createElement("span");
  num.classList.add("rule__num", rule);
  num.textContent = numElement;
  return num;
}

numero1.addEventListener("blur", addRule);
numero2.addEventListener("blur", addRule);

function sumarInputs() {
  resultado = 0;
  if (numero1.value && numero2.value) {
    resultado = parseInt(numero1.value) + parseInt(numero2.value);
    return resultado;
  }
  return null;
}

function addRule() {
  resultado = sumarInputs();
  const ubicacion = tabla.find((element) => element.numero === resultado);
  ruleTwoElements[0].style.gridColumn = ubicacion ? ubicacion.grid : 2;
  const marco = [...ruleOneElements].find(
    (el) => el.textContent == numero1.value
  );
  [...ruleOneElements].forEach((el) => el.classList.remove("borde"));
  marco.classList.add("borde");
}

document.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    resultado = sumarInputs();
    respuesta = parseInt(document.getElementById("result").value);
    if (resultado === respuesta) console.log("correcto");
    else console.log("fallo");

    formulario.reset();
    [...ruleOneElements].forEach((el) => el.classList.remove("borde"));
    numero1.focus();
  }
});
