//Get Elements
const player=document.querySelector('.player');
const video=player.querySelector('.viewer');
const progress=player.querySelector('.progress');
const progressBar=player.querySelector('.progress__filled');
const toggle=player.querySelector('.toggle');
const ranges=player.querySelectorAll('.player__slider');
const skipButtons=player.querySelectorAll('[data-skip]');
const fullscreen=player.querySelector('.fullscreen');
//Create functions

function togglePlay(){
  if(video.paused){
    video.play();
  }else{
    video.pause();
  }
}

function updateButton(){
  const icon=this.paused?'►':'❚ ❚'
  toggle.textContent=icon;
}

function skip(){
  video.currentTime+=parseFloat(this.dataset.skip);
}

function updateRange(){
  video[this.name]=this.value;
}

function updateProgress(){
  const percent=(video.currentTime/video.duration)*100;
  progressBar.style.flexBasis=`${percent}%`;
}

function scrub(e){
  const scrubTime=(e.offsetX/progress.offsetWidth)*video.duration;
  video.currentTime=scrubTime;
}

function makeFullscreen(){
  video.webkitRequestFullScreen();
}

//Hook up event listeners
video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate',updateProgress);
progress.addEventListener('click',scrub);
toggle.addEventListener('click',togglePlay);
skipButtons.forEach(skipButton => skipButton.addEventListener('click',skip));
ranges.forEach(range => range.addEventListener('change',updateRange));
fullscreen.addEventListener('click',makeFullscreen);

let mousedown=false;
progress.addEventListener('mousemove',(e)=> mousedown && scrub(e));
progress.addEventListener('mousedown',()=>mousedown=true);
progress.addEventListener('mouseup',()=>mousedown=false);
