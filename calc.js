const affichage = document.getElementById("affichage");
let expression = "";

function mettreAJour() {
  if (expression === "") {
    affichage.textContent = "0";
  } else {
    affichage.textContent = expression;
  }
}

function dernierNombre() {
  let nombre = "";
  for (let i = expression.length - 1; i >= 0; i--) {
    const c = expression[i];
    if ((c >= "0" && c <= "9") || c === ".") {
      nombre = c + nombre;
    } else {
      break;
    }
  }
  return nombre;
}

function estOperateur(c) {
  return c === "+" || c === "-" || c === "x" || c === "÷";
}

function ajouter(texte) {
  if (estOperateur(texte)) {
    if (estOperateur(expression[expression.length - 1])) {
      expression = expression.slice(0, -1);
    }

    const avant = expression[expression.length - 1];
    if ((expression === "" || avant === "(") && texte !== "-") {
      mettreAJour();
      return;
    }
  }

  const nombre = dernierNombre();

  if (texte === "." && nombre.includes(".")) {
    return;
  }

  if (texte === "." && nombre === "") {
    expression += "0";
  }

  if (texte >= "0" && texte <= "9" && nombre === "0") {
    expression = expression.slice(0, -1);
  }

  expression += texte;
  mettreAJour();
}

function effacerTout() {
  expression = "";
  mettreAJour();
}

function effacerDernier() {
  expression = expression.slice(0, -1);
  mettreAJour();
}

function calculer() {
  if (expression === "") {
    return;
  }

  let formule = expression;
  formule = formule.replaceAll("x", "*");
  formule = formule.replaceAll("÷", "/");
  formule = formule.replaceAll("-", "-");

  try {
    const resultat = Function("return " + formule)();

    if (!isFinite(resultat)) {
      throw new Error("invalide");
    }

    expression = String(Math.round(resultat * 1e10) / 1e10);
    mettreAJour();
  } catch (erreur) {
    expression = "";
    affichage.textContent = "Erreur";
  }
}

const chiffres = document.querySelectorAll(".chiffre");
for (const bouton of chiffres) {
  bouton.addEventListener("click", function () {
    ajouter(bouton.textContent);
  });
}

const operateurs = document.querySelectorAll(".operateur");
for (const bouton of operateurs) {
  bouton.addEventListener("click", function () {
    ajouter(bouton.textContent);
  });
}

const parentheses = document.querySelectorAll(".parenthese");
for (const bouton of parentheses) {
  bouton.addEventListener("click", function () {
    ajouter(bouton.textContent);
  });
}

document.querySelector(".egal").addEventListener("click", calculer);
document.querySelector(".clear").addEventListener("click", effacerTout);
document.querySelector(".efface").addEventListener("click", effacerDernier);

document.addEventListener("keydown", function (e) {
  const touche = e.key;

  if (touche >= "0" && touche <= "9") {
    ajouter(touche);
  } else if (touche === "." || touche === "(" || touche === ")" || touche === "+") {
    ajouter(touche);
  } else if (touche === "*") {
    ajouter("x");
  } else if (touche === "/") {
    ajouter("÷");
  } else if (touche === "-") {
    ajouter("-");
  } else if (touche === "Enter") {
    e.preventDefault();
    calculer();
  } else if (touche === "Backspace") {
    effacerDernier();
  } else if (touche === "Escape") {
    effacerTout();
  }
});