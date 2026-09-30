const content = document.querySelector(".content");
const Playimage = document.querySelector(".music-image img");
const musicName = document.querySelector(".music-title .name");
const musicArtist = document.querySelector(".music-title .artist");
const Audio = document.querySelector(".main-song");
const playBtn = document.querySelector(".play-pause");
const playBtnIcon = document.querySelector(".play-pause img");
const volumeSlider = document.querySelector(".volumeSlider");

let index = 1;

window.addEventListener("load", () => {
  loadData(index);
  Audio.play();
});

function loadData(indexValue) {
  musicName.innerHTML = songs[indexValue - 1].name;
  musicArtist.innerHTML = songs[indexValue - 1].artist;
  Audio.src = "songs/" + songs[indexValue - 1].audio + ".mp3";
}

playBtn.addEventListener("click", () => {
  const isMusicPaused = content.classList.contains("paused");
  if (isMusicPaused) {
    pauseSong();
  } else {
    playSong();
  }
});

function playSong() {
  content.classList.add("paused");
  playBtnIcon.src = "icons/icons8-pause-30.png";
  Audio.play();
}

function pauseSong() {
  content.classList.remove("paused");
  playBtnIcon.src = "icons/icons8-play-30.png";
  Audio.pause();
}

nextBtn.addEventListener("click", () => {
  nextSong();
});

function nextSong() {
  index++;
  if (index > songs.length) {
    index = 1;
  }
  loadData(index);
  playSong();
}

Audio.addEventListener("ended", () => {
  index++;
  if (index > songs.length) {
    index = 1;
  }
  loadData(index);
  playSong();
});

volumeSlider.addEventListener("input", () => {
  Audio.volume = Number(volumeSlider.value);
});
