import MediaPlayer from "./MediaPlayer.js";
import AutoPlay from "./plugins/AutoPlay.js";
import AutoPause from "./plugins/AutoPause.js";

const video = document.querySelector("video")
const buttonPlayPause = document.querySelector("#playPause")
const buttonMuteUnmute = document.querySelector("#muteUnmute")
const player = new MediaPlayer({ 
  elem: video,
  plugins: [new AutoPlay(), new AutoPause()]
});

buttonPlayPause.onclick = () => {
  player.togglePlayPaused();
  buttonPlayPause.classList.toggle("pausedMode");

} 
buttonMuteUnmute.onclick = () => {
  player.toggleMuteUnmute();
  buttonMuteUnmute.classList.toggle("muteMode");
 }

if("serviceWorker" in navigator) {
  navigator.serviceWorker.register("../sw.js").catch(error => {
    console.log(error.message);
  });
}