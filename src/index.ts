/*----------
VARIABLES
---------- */

let score = document.querySelector<HTMLElement>('.score');
let scoreNumber = 0;
let valider = document.querySelector<HTMLElement>('.valider');
let reponse1 = document.querySelector<HTMLElement>('.reponse1');
let reponse2 = document.querySelector<HTMLElement>('.reponse2');
let reponse3 = document.querySelector<HTMLElement>('.reponse3');
let reponse4 = document.querySelector<HTMLElement>('.reponse4');
let reponseIsSelect:boolean = false;
let isCorrectAnswer:boolean = false;

/*----------
CONDITIONS
---------- */

// On vérifie une 1ere fois si 'score' existe pour lui attribuer la valeur 0
if (score) {
    score.innerHTML = scoreNumber+'';
}
// Si 'valider' existe, la fonction 'check' se lance lorsqu'on clique sur le bouton
if (valider) {
    valider.addEventListener('click', () => {
        check();
    })
}

if (reponse1) {
    reponse1.addEventListener('click', () => {
        checkReponseSelect(reponse1, reponse2, reponse3, reponse4);
    })
}
if (reponse2) {
    reponse2.addEventListener('click', () => {
        checkReponseSelect(reponse2, reponse1, reponse3, reponse4);
    })
}
//49, 108, 244
if (reponse3) {
    reponse3.addEventListener('click', () => {
        checkReponseSelect(reponse3, reponse2, reponse1, reponse4);
    })
}
if (reponse4) {
    reponse4.addEventListener('click', () => {
        checkReponseSelect(reponse4, reponse2, reponse3, reponse1);
        isCorrectAnswer = true;
    })
}

/*----------
FONCTIONS
---------- */

// Cette fonction vérifie si une réponse a déja été selectionnée puis change la couleur en conséquence
function checkReponseSelect (reponseA: HTMLElement | null, reponseB: HTMLElement | null, reponseC: HTMLElement | null, reponseD: HTMLElement | null) {
    if (reponseB?.classList.contains('reponseSelect')) {
        reponseB.classList.toggle('reponseSelect');
        changeColor(reponseA);
    }
    else if (reponseC?.classList.contains('reponseSelect')) {
        reponseC.classList.toggle('reponseSelect');
        changeColor(reponseA);
    } else if (reponseD?.classList.contains('reponseSelect')) {
        reponseD.classList.toggle('reponseSelect');
        changeColor(reponseA);
    } else {
        changeColor(reponseA);
    }
}

// Cette fonction permet de changer la couleur d'une réponse selectionnée
function changeColor (reponse: HTMLElement | null) {
    if (reponse) {
    reponse.classList.add('reponseSelect');
    reponseIsSelect = true;
    }
}

// Cette fonction ajoute du score lors du click du bouton 'valider'
function check () {
    // On verifie qu'une reponse a été selectionée et qu'elle est correct
    if (reponseIsSelect && isCorrectAnswer) {
        scoreNumber += 50;
        if (score) {
            // On doit convertir scoreNumber en string pour le manipuler
            score.innerHTML = scoreNumber+'';
        }
    }
}
