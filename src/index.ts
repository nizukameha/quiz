// PROBLEME LORSQUON CLIQUE 2 FOIS SUR VALIDER

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
import signe2 from "/assets/alphonse2.jpeg";
import signe3 from "/assets/alphonse3.webp";
import signe4 from "/assets/alphonse4.png";
import uchiyamada from "/assets/uchiyamada.jpeg";
import livai from "/assets/livai.jpeg";
import pokemon from "/assets/pokemon.png";
import cowboy from "/assets/cowboy.jpeg";

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
let tabQuestions: string[] = ['Qui est l\'auteur de Berserk ?', 'Quand a été publié Dragon Ball ?', 'Combiem de tomes de Naruto ont été vendus ?', 'Comment s\'appelle le frere aîné de Kirua ?', 'Quel est le nom du Zanpakuto de Ichigo ?', 'Quel signe se cache dans l\'armure d\'Alphonse ?', 'Quelle est la voiture de Uchiyamada ?', 'Quel est le titre de Livai au sein du bataillon d\'exploration ?', 'Comment s\'appelle ce Pokemon ?', 'Qui est ce personnage de Cowboy Bebop ?']
let tabImgOnRight: string[] = [guts, dragonball, narutoTome, kirua, bleach, fma, uchiyamada, livai, pokemon, cowboy];
let tabReponses: string[][] = [
    ['Akira Toriyama', 'Eiichiro Oda', 'Masashi Kishimito', 'Kentaro Miura'],
    ['1979', '1982', '1984', '1988'],
    ['500 000', '1 300 000', '10 000 000', '250 000 000'],
    ['Miruki', 'Irumi', 'Aruka', 'Karuto'],
    ['Wabisuke', 'Hyorinmaru', 'Engetsu', 'Zangetsu'],
    [insertImg(signe1), insertImg(signe2), insertImg(signe3), insertImg(signe4)],
    ['Toyota', 'Honda', 'Cresta', 'Nissan'],
    ['Major', 'Caporal-chef', 'Lieutenant', 'Capitaine'],
    ['Cochignon', 'Mammochon', 'Limoute', 'Momoute'],
    ['Grimmjow', 'Bebop', 'Spike', 'Jow']
];
let tabGoodAnswer: string[] = ['Kentaro Miura', '1984', '250 000 000', 'Irumi', 'Zangetsu', insertImg(signe1), 'Cresta', 'Caporal-chef', 'Cochignon', 'Spike']

/*----------
CONDITIONS
---------- */

for (const reponse of reponses) {
    reponse.innerHTML = tabReponses[0][i];
    i++;
}
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

// Si 'valider' existe, la fonction 'check' se lance lorsqu'on clique sur le bouton
// FAIRE UNE CONDITION POUR EMPECHER LE PASSAGE A LA QUESTION SUIVANTE SI IL N'Y A PLUS DE QUESTIONS
// BUG LORSQUON CLIQUE RAPIDEMENT SUR VALIDER
// TIMER QUI DECLENCHE LES ACTIONS DE VALIDER SANS CLIQUER DESSUS
// PAGE DE FIN DE QUIZ
valider?.addEventListener('click', () => {
    if (answerIsSelected == true) {
        check();
        AnswerCheckColor();
        if(questionCounter < 9) {
            setTimeout(next, 2000, goodAnswerCounter++, 2000);
            setTimeout(changeAnswerOnValidate, 2000);
            setTimeout(removeClass, 2000);
        } else {
            alert('Fin du quiz !')
        }
    }
})

// Lors du clic sur une réponse on apelle une fonction pour changer sa couleur
for (const reponse of reponses) {
        reponse.addEventListener('click', () => {
        checkReponseSelect(reponse);
        if (reponse.textContent == tabGoodAnswer[goodAnswerCounter]) {
            isCorrectAnswer = true;
        } else if (reponse.classList.contains('goud')) {
            isCorrectAnswer = true;
        }
         else {
            isCorrectAnswer = false;
        }
        answerIsSelected = true;
    })
}

/*----------
FONCTIONS
---------- */

/**
 * Insere l'image dans le tableau de réponse
 * @param src L'image a insérer
 * @returns Le code HTML de l'image
 */
function insertImg(src:string) {
    return(`<img src="${src}" style="widht: 60px; height: 60px">`);
}

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
        if (reponse.textContent == tabGoodAnswer[goodAnswerCounter] || reponse.classList.contains('goud')) {
            reponse.classList.add('reponseGood');
            reponse.classList.remove('goud');
        }
        else {
            reponse.classList.add('reponseBad');
        }
    }
}

/**
 * Cette fonction affiche les réponses qui correspondent au theme
 * @param tabRep Le tableau de réponse qu'on doit afficher
 */
function changeAnswer(tabRep:string[][]) {
    let j = 0;
    for (const reponse of reponses) {
        reponse.innerHTML = tabRep[reponsesCounter][j];
    j++;
    }
    answerIsSelected = false;
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
        if (tabQuestions[questionCounter] == tabQuestions[5]) {
            reponses[0].classList.add('goud');
        }
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
function changeAnswerOnValidate() {
    let j = 0;
    reponsesCounter++;
    for (const reponse of reponses) {
        reponse.innerHTML = tabReponses[reponsesCounter][j];
        j++;
    }
    answerIsSelected = false;
}