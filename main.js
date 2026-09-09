const content = document.querySelector(".content"),
  Playimage = content.querySelector(".music-image img"),
  musicName = content.querySelector(".music-title .name"),
  musicArtist = content.querySelector(".music-title .artist");
Audio = document.querySelector(".main-song");
playBtn = content.querySelector(".play-pause");
playBtnIcon = content.querySelector(".play-pause img");
Shuffle = content.querySelector("#shuffle");

let index = 1;

window.addEventListener("load", () => {
  loadData(index);
  Audio.play();
});

function loadData(indexValue) {
  musicName.innerHTML = songs[indexValue - 1].name;
  musicArtist.innerHTML = songs[indexValue - 1].artist;
  Audio.src = "Songs/" + songs[indexValue - 1].audio + ".mp3";
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
  playBtnIcon.src = "Icons/icons8-pause-30.png";
  Audio.play();
}

function pauseSong() {
  content.classList.remove("paused");
  playBtnIcon.src = "Icons/icons8-play-30.png";
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

Shuffle.addEventListener("click", () => {
  var randIdex = Math.floor(Math.random() * songs.length + 1);
  loadData(randIdex);
  playSong();
});

Audio.addEventListener("ended", () => {
  index++;
  if (index > songs.length) {
    index = 1;
  }
  loadData(index);
  playSong();
});
