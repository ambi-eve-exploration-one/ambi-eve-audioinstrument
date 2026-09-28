const content = document.querySelector(".content");
const Playimage = document.querySelector(".music-image img");
const musicName = document.querySelector(".music-title .name");
const musicArtist = document.querySelector(".music-title .artist");
const Audio = document.querySelector(".main-song");
const playBtn = document.querySelector(".play-pause");
const playBtnIcon = document.querySelector(".play-pause img");
const Shuffle = document.querySelector("#shuffle");
const nextBtn = document.querySelector("#skip");

let index = 1;

window.addEventListener("load", () => {
  loadData(index);
  Audio.play();
});

// This line of code is used to play songs through the index value which I've assigned to each song in the playlist.js folder

function loadData(indexValue) {
  musicName.innerHTML = songs[indexValue - 1].name;
  musicArtist.innerHTML = songs[indexValue - 1].artist;
  Audio.src = "songs/" + songs[indexValue - 1].audio + ".mp3";
}

// Each index corresponds to the name of the song and the artist

playBtn.addEventListener("click", () => {
  const isMusicPaused = content.classList.contains("paused");
  if (isMusicPaused) {
    pauseSong();
  } else {
    playSong();
  }
});

// The line of code used to play/pause the song whenever the play button is clicked by the user

function playSong() {
  content.classList.add("paused");
  playBtnIcon.src = "icons/icons8-pause-30.png";
  Audio.play();
}

// To pause the song specifically

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

Shuffle.addEventListener("click", () => {
  var randIdex = Math.floor(Math.random() * songs.length + 1);
  loadData(randIdex);
  playSong();
});

// When shuffling the songs, the index code would pick a random index value. However this doesn't shuffle the entire order of the song

Audio.addEventListener("ended", () => {
  index++;
  if (index > songs.length) {
    index = 1;
  }
  loadData(index);
  playSong();
});

// When the song ends, this line of code will continue to play the next song
