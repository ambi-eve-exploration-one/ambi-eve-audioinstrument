const content = document.querySelector(".content");
const Playimage = document.querySelector(".music-image img");
const musicName = document.querySelector(".music-title .name");
const musicArtist = document.querySelector(".music-title .artist");
const Audio = document.querySelector(".main-song");
const playBtn = document.querySelector(".play-pause .play");
const playBtnIcon = document.querySelector(".play-pause img");
const Shuffle = document.querySelector("#shuffle");
const nextBtn = document.querySelector("#skip");
const playlistEl = document.querySelector(".playlist");
const progressBar = document.querySelector(".progress-bar");
const progressDetails = document.querySelector(".progress-details");

let songOrder = [...songs];
let index = 0;

function renderQueue() {
  if (!playlistEl) return;

  playlistEl.innerHTML = "";

  songOrder.slice(index).forEach((song, position) => {
    const queueItem = document.createElement("li");
    queueItem.textContent = `${song.name} — ${song.artist}`;

    if (position === 0) {
      queueItem.classList.add("current");
    }

    playlistEl.appendChild(queueItem);
  });
}

// With help from the AI agent in Visual Studio Code, I changed the original code to include 0 as an index instead of 1. This allows the playback order to come from the songOrder instead of the original array whilst keeping a copy of the playlist. I've also had help in making sure that the queue would show within the website through renderQueue, that way users can actively see the order of songs with what'll play next

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
  renderQueue();
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
  renderQueue();

  if (Audio.paused && content.classList.contains("paused")) {
    playSong();
  }
}

// The song would keep restarting every time the shuffle button was pressed, so I had the agent help me here to make sure the song kept playing even when you shuffle

Audio.addEventListener("ended", () => {
  nextSong();
});

// Simplified the ending code

Audio.addEventListener("timeupdate", (e) => {
  const initialTime = e.target.currentTime;
  const finalTime = e.target.duration;
  let BarWidth = (initialTime / finalTime) * 100;
  progressBar.style.width =
    BarWidth + "%"; /**The code for the progress bar moving*/

  progressDetails.addEventListener("click", (e) => {
    let progressValue = progressDetails.clientWidth;
    let clickedOffsetX = e.offsetX;
    let MusicDuration =
      Audio.duration; /**The code to change the position of the progress bar by clicking on the bar itself */

    Audio.currentTime = (clickedOffsetX / progressValue) * MusicDuration;
  });

  Audio.addEventListener("loadeddata", () => {
    let finalTimeData = content.querySelector(".final");

    let AudioDuration = Audio.duration;
    let finalMinutes = Math.floor(AudioDuration / 60);
    let finalSeconds = Math.floor(AudioDuration % 60);
    if (finalSeconds < 10) {
      finalSeconds = "0" + finalSeconds;
    }
    finalTimeData.innerText =
      finalMinutes +
      ":" +
      finalSeconds; /**The code to show the final time of the song in the timer */
  });

  let currentTimeData = content.querySelector(".current");
  let currentTime = Audio.currentTime;
  let currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);
  if (currentSeconds < 10) {
    currentSeconds = "0" + currentSeconds;
  }

  currentTimeData.innerText = currentMinutes + ":" + currentSeconds;
});

//The progress bar, progress details and time update is a modified version of https://www.youtube.com/watch?v=3jFsdp9qkjs&t=1204s
