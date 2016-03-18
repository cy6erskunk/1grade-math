(function(){
    var okElem = document.querySelector('.ok');
    var errorElem = document.querySelector('.error');
    var winElem = document.querySelector('.win-img');
    var lostElem = document.querySelector('.lost-img');
    var scoreElem = document.querySelector('.score');

    var spoiled = false;
    var score = 0;

    function generateExercise(evt) {
        var MAX_VALUE = 15;
        var aElem = document.querySelector('.a');
        var bElem = document.querySelector('.b');
        var resultElem = document.querySelector('.result');
        var actionElem = document.querySelector('.action');

        var result = Math.floor(Math.random() * MAX_VALUE);
        var a = Math.floor(Math.random() * MAX_VALUE);
        var b = result - a;

        if (evt) {
            if ((evt.target == errorElem) != spoiled) {
                lostElem.classList.remove('_hidden');
                score -= 1;
                score < 0 && (score = 0);

            } else {
                winElem.classList.remove('_hidden');
                score += 1;
            }

            setTimeout(function () {
                lostElem.classList.add('_hidden');
                winElem.classList.add('_hidden');
            }, 1000);
        }

        scoreElem.innerText = score;

        actionElem.innerHTML = b < 0 ? '&ndash;' : '+';

        b = Math.abs(b);

        aElem.innerText = a;
        bElem.innerText = b;

        if (spoiled = Math.random() > 0.5) {
            result += result <= MAX_VALUE/2 ? 1 : -1;
        }

        resultElem.innerText = result;
    }

    okElem.addEventListener('click', generateExercise, false);
    errorElem.addEventListener('click', generateExercise, false);

    document.documentElement

    generateExercise();
})();
