/*----------
IMPORT
---------- */

import guts from "/assets/guts.webp";
import dragonball from "/assets/dragon-ball.jpeg";
import narutoTome from "/assets/naruto-tome.jpeg";
import kirua from "/assets/kirua.jpeg";
import bleach from "/assets/bleach.png";
import fma from "/assets/fma.jpeg";
import signe1 from "/assets/alphonse1.webp";

/*----------
VARIABLES
---------- */

// Query
let score = document.querySelector<HTMLElement>('.score');
let valider = document.querySelector<HTMLElement>('.valider');
let reponses = document.querySelectorAll<HTMLButtonElement>('.reponse');
let question = document.querySelector<HTMLElement>('.question');
let questionNumber = document.querySelector<HTMLElement>('.questionNumber');
let imgOnRight = document.querySelector<HTMLImageElement>('.imgOnRight');
// Boolean
let isCorrectAnswer: boolean = false;
let answerIsSelected: boolean = false;
// Number
let questionCounter: number = 0;
let scoreNumber: number = 0;
let questionNumber2: number = 1;
let imageCounter: number = 0;
let reponsesCounter: number = 0;
let i = 0;
let goodAnswerCounter: number = 0;
// Array
let tabQuestions: string[] = ['Qui est l\'auteur de Berserk ?', 'Quand a été publié Dragon Ball ?', 'Combien de tomes de Naruto ont été vendus depuis sa sortie ?', 'Comment s\'appelle le frere aîné de Kirua ?', 'Quel est le nom du Zanpakutō de Ichigo ?', 'Quel signe se cache dans l\'armure de Alphonse ?']
let tabImgOnRight: string[] = [guts, dragonball, narutoTome, kirua, bleach, fma];
let tabReponses: string[][] = [
    ['Akira Toriyama', 'Eiichiro Oda', 'Masashi Kishimito', 'Kentaro Miura'],
    ['1979', '1982', '1984', '1988'],
    ['500 000', '1 300 000', '10 000 000', '250 000 000'],
    ['Miruki', 'Irumi', 'Aruka', 'Karuto'],
    ['Wabisuke', 'Hyōrinmaru', 'Hyōrinmaru', 'Zangetsu'],
    [insertImg(signe1), insertImg(signe1), '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
];
let tabGoodAnswer: string[] = ['Kentaro Miura', '1984', '250 000 000', 'Irumi', 'Zangetsu', '', '', '', '', '']

/**
 * Insere l'image dans le tableau de réponse
 * @param src L'image a insérer
 * @returns Le code HTML de l'image
 */
function insertImg(src:string) {
    let img = `<img src="${src}" style="widht: 100px; height: 100px">`;
    return(img);
}

/*----------
CONDITIONS
---------- */

// Affiche l'image correspondant a la question actuelle
if (imgOnRight) {
    imgOnRight.src = tabImgOnRight[imageCounter];
}
// Affiche le numero de la question actuelle
if (questionNumber) {
    questionNumber.innerHTML = questionNumber2 + '';
}
// Affiche la question actuelle
if (question) {
    question.innerHTML = tabQuestions[questionCounter];
}
// On vérifie une 1ere fois si 'score' existe pour lui attribuer la valeur 0
if (score) {
    score.innerHTML = scoreNumber + '';
}
// Lors du clic sur une réponse on apelle une fonction pour changer sa couleur
for (const reponse of reponses) {
    reponse.innerHTML = tabReponses[0][i];
    reponse.addEventListener('click', () => {
        checkReponseSelect(reponse);
        if (reponse.textContent == tabGoodAnswer[goodAnswerCounter]) {
            isCorrectAnswer = true;
        } else {
            isCorrectAnswer = false;
        }
        answerIsSelected = true;
    })
    i++;
}
// Si 'valider' existe, la fonction 'check' se lance lorsqu'on clique sur le bouton
// FAIRE UNE CONDITION POUR EMPECHER LE PASSAGE A LA QUESTION SUIVANTE SI IL N'Y A PLUS DE QUESTIONS
valider?.addEventListener('click', () => {
    if (answerIsSelected == true) {
        check();
        AnswerCheckColor();
        setTimeout(next, 3000, goodAnswerCounter++, 3000);
        setTimeout(changeAnswer, 3000);
        setTimeout(removeClass, 3000);
    }
})

/*----------
FONCTIONS
---------- */


/**
 * Elle porte bien son nom celle-la
 */
function removeClass() {
    for (const reponse of reponses) {
        reponse.classList.remove('reponseGood');
        reponse.classList.remove('reponseSelect');
        reponse.classList.remove('reponseBad');
    }
}

/**
 * Change la couleur de la bonne réponse en vert et les autres en rouge
 */
function AnswerCheckColor() {
    for (const reponse of reponses) {
        if (reponse.textContent == tabGoodAnswer[goodAnswerCounter]) {
            reponse.classList.add('reponseGood');
        } else {
            reponse.classList.add('reponseBad');
        }
    }
}

/**
 * Vérifie si une réponse a déja été selectionnée puis change la couleur en conséquence
 * @param reponseColor La réponse selectionné (qui doit changer de couleur)
 */
function checkReponseSelect(reponseColor: HTMLButtonElement) {
    for (const reponse of reponses) {
        if (reponse?.classList.contains('reponseSelect')) {
            reponse.classList.toggle('reponseSelect')
        }
    }
    reponseColor.classList.toggle('reponseSelect');
}

/**
 * Ajoute du score pour une bonne réponse
 */
function check() {
    // Verifie que la réponse est correct pour lui attribuer des points
    if (isCorrectAnswer) {
        scoreNumber += 50;
        if (score) {
            // On doit convertir scoreNumber en string pour le manipuler
            score.innerHTML = scoreNumber + '';
        }
    }
}

/**
 * Permet de passer a la question suivante (change la question, son numero et son image)
 */
function next() {
    // Augmente le numero de la question
    if (questionNumber) {
        questionNumber2++;
        questionNumber.innerHTML = questionNumber2 + '';
    }
    // Affiche la question suivante
    if (question) {
        questionCounter++;
        question.innerHTML = tabQuestions[questionCounter];
    }
    // Affiche l'image suivante
    if (imgOnRight) {
        imageCounter++;
        imgOnRight.src = tabImgOnRight[imageCounter];
    }
}

/**
 * Change les réponses pour la question suivante
 */
function changeAnswer() {
    let j = 0;
    reponsesCounter++;
    for (const reponse of reponses) {
        reponse.innerHTML = tabReponses[reponsesCounter][j];
        j++;
    }
}