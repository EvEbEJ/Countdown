var flasher = document.getElementById('flasher');
var counter = document.getElementById('counter');
var topbar = document.getElementById('topbar');
var body = document.getElementById('body');
var form = document.getElementById('form');

var disInput = document.getElementById('display');
var sec = document.getElementById('seconds');
var subBtn = document.getElementById('submit');
var display_val = document.getElementById('display').value;
var sec_val = document.getElementById('seconds').value;

var termBtn = document.getElementById('term-btn');
var relBtn = document.getElementById('reload-btn');

console.log(sec_val)

var active = false;
var term = true;

disInput.addEventListener('input', e=>{
  display_val = document.getElementById('display').value;
})

sec.addEventListener('input', e=>{
  sec_val = document.getElementById('seconds').value;
})

submit.addEventListener('click', e=>{
  if(display_val.trim()==''){
    alert("Please make valid display.")
  }
  else if(sec_val >= 1000 && sec_val <= 0 | sec_val.trim() == ''){
    alert("Please enter a valid number of seconds.")
  }
  else{
    form.style.display = "none";
    window.location.href += "#flasher";
    counter.style.display = "flex";
    counter.style.width = window.innerWidth.toString() + "px";
    counter.style.height = window.innerHeight.toString() + "px";
    flasher.style.display = "flex";
    flasher.style.width = window.innerWidth.toString() + "px";
    flasher.style.height = window.innerHeight.toString() + "px";
    topbar.style.padding = "20px";
    topbar.style.display = "block";
    topbar.innerHTML = "<p>" + display_val + "</p>"
    termBtn.style.display = "block";
    active = true;
    var interval = setInterval(timer, 100);
    var i = sec_val * 1000;

    function timer(){
      if(term != false){
        var seconds = i/1000
        if(i % 1000 == 0){
          counter.innerHTML = seconds;
          if(seconds > 20){
            flasher.style.backgroundColor = "lightgreen";
          }
          else if(seconds <= 20 && seconds > 10){
            flasher.style.backgroundColor = "#ffe814";
          }
          else{
            flasher.style.backgroundColor = "#ff6969";
            flasher.style.animationPlayState = "running";
          }
        }
        console.log(i);
        i -= 100;
        if(i < 0){
          counter.innerHTML = "Time's Up";
          var audio = new Audio('Pacman-death-sound.mp3');
          audio.play();
          clearInterval(interval);
        }
      }
    }
  }
})

termBtn.addEventListener('click', e => {
  if(term == false){
    term = true;
    termBtn.innerHTML = "<i class=\"fas fa-pause\"></i>";
  }
  else if(term == true){
    term = false;
    termBtn.innerHTML = "<i class=\"fas fa-play\"></i>";
  }
})

relBtn.addEventListener('click', e => {
  window.location.href = "https://evebej.github.io/Countdown"
})

window.addEventListener('resize', function(event) {
  flasher.style.width = window.innerWidth.toString() + "px";
  flasher.style.height = window.innerHeight.toString() + "px";
  counter.style.width = window.innerWidth.toString() + "px";
  counter.style.height = window.innerHeight.toString() + "px";
}, true);
