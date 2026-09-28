const content = document.querySelector(".content");
const Playimage = document.querySelector(".music-image img");
const musicName = document.querySelector(".music-title .name");
const musicArtist = document.querySelector(".music-title .artist");
const Audio = document.querySelector(".main-song");
const playBtn = document.querySelector(".play-pause");
const playBtnIcon = document.querySelector(".play-pause img");
const Shuffle = document.querySelector("#shuffle");
const nextBtn = document.querySelector("#skip");
const playlistEl = document.querySelector(".playlist");

let songOrder = [...songs];
let index = 0;

// With help from the AI agent in Visual Studio Code, I changed the original code to include 0 as an index instead of 1. This allows the playback order to come from the songOrder instead of the original array whilst keeping a copy of the playlist.

window.addEventListener("load", () => {
  loadData(index);
  Audio.play();
});

// This line of code is used to play songs through the index value which I've assigned to each song in the playlist.js folder

function loadData(indexValue) {
  const song = songOrder[indexValue];
  musicName.innerHTML = song.name;
  musicArtist.innerHTML = song.artist;
  Audio.src = "songs/" + song.audio + ".mp3";
}

// With the playlist in songOrder instead of the songs folder, the agent changed the code so that it avoid me having to write repeated indexing over and over again

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

Shuffle.addEventListener("click", () => {
  shufflePlaylist();
});

// Added code so that when you click on the shuffle button it will randomise the playlist

function nextSong() {
  index = (index + 1) % songOrder.length;
  loadData(index);
  playSong();
}

// The previous code was used assuming that the index was still 1-based. This uses it using the new 0-base

function shufflePlaylist() {
  const currentSong = songOrder[index];
  const upcomingSongs = songOrder.filter((_, songIndex) => songIndex !== index);

  for (let i = upcomingSongs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [upcomingSongs[i], upcomingSongs[j]] = [upcomingSongs[j], upcomingSongs[i]];
  }

  songOrder = [...songOrder.slice(0, index), currentSong, ...upcomingSongs];

  // The shuffle method was changed from using the index to pick random songs to using the Fisher-Yates shuffle. This way it will shuffle the entire order of the songs instead of picking out just one song. Additionally, the song currently playing will still continue to play, acting like a true shuffler instead of the index randomly picking out a song to play.

  if (Audio.paused && content.classList.contains("paused")) {
    playSong();
  }
}

// The song would keep restarting every time the shuffle button was pressed, so I had the agent help me here to make sure the song kept playing even when you shuffle

Audio.addEventListener("ended", () => {
  nextSong();
});

// Simplified the ending code
