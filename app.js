(function () {
    var MAX_VALUE = 15;
    var HIDE_TIMEOUT = 1000;

    var aElem = document.querySelector('.a'),
        bElem = document.querySelector('.b'),
        resultElem = document.querySelector('.result'),
        actionElem = document.querySelector('.action'),
        okElem = document.querySelector('.ok'),
        errorElem = document.querySelector('.error'),
        winElem = document.querySelector('.win-img'),
        lostElem = document.querySelector('.lost-img'),
        scoreElem = document.querySelector('.score'),
        paranjaElem = document.querySelector('.paranja'),
        answerElem = document.querySelector('.answer');


    var spoiled = false,
        correctResult = 0,
        score = 0;

    function generateExercise() {

        var result = Math.floor(Math.random() * MAX_VALUE);
        var a = Math.floor(Math.random() * MAX_VALUE);
        var b = result - a;

        scoreElem.innerText = score;

        actionElem.innerHTML = b < 0 ? '&ndash;' : '+';

        b = Math.abs(b);

        aElem.innerText = a;
        bElem.innerText = b;

        if (spoiled = Math.random() > 0.5) {
            correctResult = result;
            result += result <= MAX_VALUE/2 ? 1 : -1;
        }

        resultElem.innerText = result;
    }

    function hideAll() {
        lostElem.classList.add('_hidden');
        winElem.classList.add('_hidden');
        paranjaElem.classList.add('_hidden');
        answerElem.classList.add('_hidden');
    }

    /**
     * @param {Boolean} respnse - indicates whether user agrees with the solution or not
     */
    function processResponse(response) {
        var copy;

        answerElem.innerHTML = '';

        if (response == spoiled) {
            lostElem.classList.remove('_hidden');
            score > 0 && (score -= 1);
            copy = document.querySelector('.wrapper_exercise').cloneNode(true);
            if (spoiled) {
                copy.querySelector('.equals').innerHTML = '&ne;';
                copy.querySelector('.result').classList.add('_red');
            }
            answerElem.appendChild(copy);
            answerElem.classList.remove('_hidden');
            paranjaElem.classList.remove('_hidden');
            setTimeout(hideAll, HIDE_TIMEOUT * 10);
        } else {
            winElem.classList.remove('_hidden');
            score += 1;
            setTimeout(hideAll, HIDE_TIMEOUT);
        }
    }

    function okElemClickHandler() {
        processResponse(true);
        generateExercise();
    }

    function errorElemClickHandler() {
        processResponse(false);
        generateExercise();
    }

    okElem.addEventListener('click', okElemClickHandler, false);
    errorElem.addEventListener('click', errorElemClickHandler, false);

    paranjaElem.addEventListener('click', hideAll, false);
    answerElem.addEventListener('click', hideAll, false);
    lostElem.addEventListener('click', hideAll, false);

    generateExercise();
})();
