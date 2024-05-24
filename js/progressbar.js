const progressLoader = document.querySelector('.progress-loader');
const progress = document.querySelector('.progress');

let progressRunning = false;

function startProgressLoader() {
    progressRunning = true;
    progressLoader.style.visibility = 'visible';
    progress.style.animation = 'loading_44 5s cubic-bezier(.4,1.01,1,1)';

    progress.addEventListener('animationend', () => {
        closeOpenedCards();
    }, {once: true});
}

function stopProgressLoader() {
    progressRunning = false;
    progress.style.animation = '';
    progress.style.width = '0%';
    progressLoader.style.visibility = 'hidden';
}