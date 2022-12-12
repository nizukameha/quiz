let score = document.querySelector<HTMLElement>('.score');
let scoreNumber = 0;
let valider = document.querySelector<HTMLElement>('.valider');
let reponse1 = document.querySelector<HTMLElement>('reponse1');

if (reponse1) {
    console.log('OK');
    reponse1.style.backgroundColor = 'red';
}


// Cette fonction ajoute du score lors du click du bouton 'valider'
function check () {
    // FAIRE VERIF BONNE REPONSE AVANT D'AUGMENTER LE SCORE
    scoreNumber += 50;
    if (score) {
        // On doit convertir scoreNumber en string pour le manipuler
        score.innerHTML = scoreNumber+'';
    }
}
// On vérifie une 1ere fois si 'score' existe pour lui attribuer la valeur 0
if (score) {
    score.innerHTML = scoreNumber+'';
}
// Si 'valider' existe, la fonction 'check' se lance lorsqu'on clique sur le bouton
if (valider) {
    valider.onclick = check;
}