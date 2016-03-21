(function () {
    var MAX_VALUE = 15;
    var HIDE_TIMEOUT = 1000;

    var okAudio = new Audio('sounds/tada.mp3'),
        failAudio = new Audio('sounds/bzz.mp3');

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
        answerElem = document.querySelector('.answer'),
        soundSwitchElem = document.querySelector('.sound-switch');

    var spoiled = false,
        soundEnabled = true,
        hideTimeoutId = null,
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

        spoiled = Math.random() > 0.5;
        if (spoiled) {
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
            hideTimeoutId = setTimeout(hideAll, HIDE_TIMEOUT * 10);
            soundEnabled && failAudio.play();
        } else {
            winElem.classList.remove('_hidden');
            score += 1;
            hideTimeoutId = setTimeout(hideAll, HIDE_TIMEOUT);
            soundEnabled && okAudio.play();
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

    function toggleSound() {
        soundEnabled = !soundEnabled;
        soundSwitchElem.classList[soundEnabled ? 'remove' : 'add']('sound-switch_disabled');
    }

    okElem.addEventListener('click', okElemClickHandler, false);
    errorElem.addEventListener('click', errorElemClickHandler, false);

    paranjaElem.addEventListener('click', hideAll, false);
    answerElem.addEventListener('click', hideAll, false);
    lostElem.addEventListener('click', hideAll, false);
    soundSwitchElem.addEventListener('click', toggleSound, false);

    document.body.addEventListener('keydown', function (evt) {
        // if (evt.defaultPrevented) {
        //     return;
        // }

        if (hideTimeoutId && evt.keyCode === 27) {
            clearTimeout();
            hideTimeoutId = null;
            hideAll();
        } else if (evt.keyCode == 37) {
            okElemClickHandler();
        } else if (evt.keyCode === 39) {
            errorElemClickHandler();
        } else if (evt.keyCode == 83 ) {
          toggleSound();
        }

        // evt.preventDefault();
    }, true);

    generateExercise();

})();
