const musics = [
    { name: 'A New Beginning', source: '/music/anewbeginning.mp3', coverUrl: '/images/anewbeginning.jpg' },
    { name: 'Creative Minds', source: '/music/creativeminds.mp3', coverUrl: '/images/creativeminds.jpg' },
    { name: 'Happy Rock', source: '/music/happyrock.mp3', coverUrl: '/images/happyrock.jpg' }
];

let currentMusicIndex = -1;

const $audio = document.getElementById('audio');

const $player = document.getElementById('player');
const $coverImage = document.getElementById('cover-image');
const $musicTitle = document.getElementById('music-title');

const $progressBar = document.getElementById('progress-bar');
const $progress = document.getElementById('progress');

const $play = document.getElementById('play');
const $prev = document.getElementById('prev');
const $next = document.getElementById('next');

loadMusic(0);

$progressBar.addEventListener('click', handleProgressClick);

$play.addEventListener('click', play);
$prev.addEventListener('click', prev);
$next.addEventListener('click', next);

$audio.addEventListener('timeupdate', onProgress);
$audio.addEventListener('ended', next);

function loadMusic(musicIndex) {
    const { name, source, coverUrl } = musics[musicIndex];

    $musicTitle.textContent = name;
    $audio.src = source;
    $coverImage.src = coverUrl;

    currentMusicIndex = musicIndex;
}

function prev() {
    const prevMusicIndex = currentMusicIndex === 0 ? musics.length - 1 : currentMusicIndex - 1;
    loadMusic(prevMusicIndex);
    play();
}

function next() {
    const nextMusicIndex = currentMusicIndex === musics.length - 1 ? 0 : currentMusicIndex + 1;
    loadMusic(nextMusicIndex);
    play();
}

function play() {
    if ($audio.paused) {
        $audio.play();
        $player.classList.add('is-playing');
        $play.innerHTML = `<span class="fas fa-pause"></span>`;
    } else {
        $audio.pause();
        $player.classList.remove('is-playing');
        $play.innerHTML = `<span class="fas fa-play"></span>`;
    }
}

function onProgress() {
    const progress = $audio.currentTime / $audio.duration;
    setProgress(progress);
}

function setProgress(progress) {
    $progress.style.width = `${(progress * 100)}%`;
}

function handleProgressClick(event) {
    const seekedProgress = event.offsetX / $progressBar.clientWidth;
    const seekedTime = $audio.duration * seekedProgress;

    $audio.currentTime = seekedTime;
}
