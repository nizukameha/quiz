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
let valider = document.querySelector<HTMLButtonElement>('.valider');
let reponses = document.querySelectorAll<HTMLButtonElement>('.reponse');
let question = document.querySelector<HTMLElement>('.question');
let questionNumber = document.querySelector<HTMLElement>('.questionNumber');
let imgOnRight = document.querySelector<HTMLImageElement>('.imgOnRight');
let timeHTML = document.querySelector<HTMLElement>('.time');
let commencer = document.querySelector<HTMLButtonElement>('.commencer');
let commencement = document.querySelector<HTMLDivElement>('.commencement');
let mainSection = document.querySelector<HTMLDivElement>('.mainSection');
let commencementH2 = document.querySelector<HTMLHeadingElement>('.commencementH2');
let commencementUl = document.querySelector<HTMLUListElement>('.commencementUl');
let commencementP = document.querySelector<HTMLParagraphElement>('.commencementP');
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
let timeCounter = 15;
// Array
let tabQuestions: string[] = ['Qui est l\'auteur de Berserk ?', 'Quand a été publié Dragon Ball ?', 'Combiem de tomes de Naruto ont été vendus ?', 'Comment s\'appelle le frere aîné de Kirua ?', 'Quel est le nom du Zanpakuto de Ichigo ?', 'Quel signe se cache dans l\'armure d\'Alphonse ?', 'Quelle est la voiture de Uchiyamada ?', 'Quel est le titre de Livai au sein du bataillon d\'exploration ?', 'Comment s\'appelle ce Pokemon ?', 'Qui est ce personnage de Cowboy Bebop ?']
let tabImgOnRight: string[] = [guts, dragonball, narutoTome, kirua, bleach, fma, uchiyamada, livai, pokemon, cowboy];
let tabReponses: string[][] = [
    ['Akira Toriyama', 'Eiichiro Oda', 'Masashi Kishimito', 'Kentaro Miura'],
    ['1979', '1982', '1984', '1988'],
    ['500 000 000', '10 000 000', '100 000 000', '250 000 000'],
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

// Affiche les réponses actuelles
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
// Affiche le temps pour le timer
if (timeHTML) {
    timeHTML.innerHTML = String(timeCounter);
}

// Lors du click sur le boutton 'Commencer' 
commencer?.addEventListener('click', () => {
    commencer?.classList.add('hide')
    commencement?.classList.add('hide')
    appear();
    timer();
})

// Lors du click sur le boutton 'Valider' des fonctions sont appellées pour enchainer les questions/réponses
valider?.addEventListener('click', () => {
    if (answerIsSelected == true) {
        if (valider) {
            valider.disabled = true;
        }
        check();
        AnswerCheckColor();
        if (questionCounter < 0) {
            quiz()
        } else {
            quizEnd();
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
 * Change la couleur des réponses. Passes aux questions/réponses suivantes
 */
function quiz() {
    setTimeout(()=>{
        next();
        goodAnswerCounter++;
        changeAnswerOnValidate();
        removeClass();
        validerDisabledFalse();
    },1500)
}

/**
 * Cache des éléments html et en affiche d'autres pour la fin du quiz
 */
function quizEnd() {
    setTimeout(()=>{
        for (const reponse of reponses) {
            reponse.classList.add('hide');
        }
        valider?.classList.add('hide');
        question?.classList.add('hide');
        mainSection?.classList.add('hide');
        commencer?.classList.remove('hide');
        commencement?.classList.remove('hide');
        if (commencementH2 && commencer && commencementP) {
            commencementH2.innerHTML = 'Fin du quiz !';
            commencementP.innerHTML = 'Merci d\'avoir participé a mon quiz :)<br>Vous pouvez trouver mes autres projets ici :<br><a href="https://axel-reviron.netlify.app/"><img src="https://axel-reviron.netlify.app/img/logo-h-purple-fonce.webp" alt="portfolio" style="width: 50%; margin-top: 10%;"></a>'
            commencementP.style.marginTop = '10%';
        }
        commencer?.classList.add('hide');
        commencementUl?.classList.add('hide');
        commencement?.setAttribute('id', 'end');
    }, 1500)
}

/**
 * Le bouton pour valider la réponse est de nouveau disponible
 */
function validerDisabledFalse() {
    if (valider) {
        valider.disabled = false;
    }
}

/**
 * Déclenche un timer de 15s, lorsqu'il arrive a 0. On passe a la question suivante
 */
function timer() {
    let monInterval = setInterval(chrono, 1000);
    function chrono() {
        valider?.addEventListener('click', () => {
            if (answerIsSelected == true) {
                clearInterval(monInterval);
            }
        });
        timeCounter--;
        if (timeHTML) {
            timeHTML.innerHTML = String(timeCounter);
        }
        if (timeCounter == 0) {
            clearInterval(monInterval);
            if (answerIsSelected == true) {
                check();
            }
            AnswerCheckColor();
            if (questionCounter < 9) {
                quiz()
            } else {
                quizEnd();
            }
        }
    }
}

/**
 * Insere l'image dans le tableau de réponse
 * @param src L'image a insérer
 * @returns Le code HTML de l'image
 */
function insertImg(src: string) {
    return (`<img src="${src}" style="widht: 60px; height: 60px">`);
}

/**
 * Permet de changer les couleurs des reponses
 */
function removeClass() {
    for (const reponse of reponses) {
        reponse.classList.remove('reponseGood');
        reponse.classList.remove('reponseSelect');
        reponse.classList.remove('reponseBad');
        reponse.classList.remove('hide');
    }
}

/**
 * Fait apparaitre les questions et les réponses quand on commence le quiz
 */
function appear() {
    for (const reponse of reponses) {
        reponse.classList.remove('hide');
    }
    question?.classList.remove('hide');
    imgOnRight?.classList.remove('hide');
    valider?.classList.remove('hide');
    mainSection?.classList.remove('hide');
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
function changeAnswer(tabRep: string[][]) {
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
    timeCounter = 16;
    timer();
}