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
var num_sec_val = Number(sec_val);

var termBtn = document.getElementById('term-btn');
var resBtn = document.getElementById('restart-btn');
var relBtn = document.getElementById('reload-btn');

var alarm = document.getElementById('alarm');

var active = false;
var term = true;
var restart = false;

var percent = 0;

var p = (Number(form.clientWidth) * 0.05).toString() + "px";

form.style.padding = p;

function timer(i, interval){
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
    if(i <= 0){
      counter.innerHTML = "Time's Up";
      console.log(alarm.value);
      if(alarm.value == 'Default'){
        console.log("Default selected");
        var audio = new Audio('Glockenspiel.mp3');
        audio.play();
      }
      else if(alarm.value == 'Pacman'){
        console.log("Pacman selected");
        var audio = new Audio('Pacman-death-sound.mp3');
        audio.play();
      }
      else if(alarm.value == 'Trombone'){
        console.log("Trombone selected");
        var audio = new Audio('Trombone.mp3');
        audio.play();
      }
      clearInterval(interval);
    }
    if(restart == true){
      console.log("Clearing...")
      clearInterval(interval);
    }
  }
}

function runFlasher(){
  restart = false;
  if(num_sec_val < 1000 && num_sec_val > 0 && sec_val.trim() != '' && Number.isInteger(num_sec_val) == true){
    form.style.display = "none";
    //window.location.href += "#flasher";
    counter.style.display = "flex";
    counter.style.width = window.innerWidth.toString() + "px";
    counter.style.height = window.innerHeight.toString() + "px";
    flasher.style.display = "flex";
    flasher.style.opacity = "";
    flasher.style.width = window.innerWidth.toString() + "px";
    flasher.style.height = window.innerHeight.toString() + "px";
    if(display_val.trim()!=''){
      topbar.style.padding = "20px";
      topbar.style.display = "block";
      topbar.innerHTML = "<p>" + display_val + "</p>"
    }
    termBtn.style.display = "block";
    resBtn.style.display = "block";
    resBtn.style.right = ((10 * 2) + Number(termBtn.clientWidth)).toString() + "px";
    active = true;
    var i = num_sec_val * 1000;
    var interval = setInterval(function(){timer(i, interval); i-=100;}, 100);
  }
  else if(num_sec_val >= 1000 | num_sec_val <= 0 | sec_val.trim() == '' | Number.isInteger(num_sec_val) != true){
    alert("Please enter a valid number of seconds (an integer larger than 0 & smaller than 1000)")
  }

}

disInput.addEventListener('input', e=>{
  display_val = document.getElementById('display').value;
})

sec.addEventListener('input', e=>{
  sec_val = document.getElementById('seconds').value;
  num_sec_val = Number(sec_val);
})

submit.addEventListener('click', e=>{
  runFlasher();
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

resBtn.addEventListener('click', e => {
  restart = true; 
  //
  setTimeout(function(){
    flasher.style.opacity = "1"; 
    flasher.style.animationPlayState = "paused"; 
    runFlasher();
  }, 1000);
})

relBtn.addEventListener('click', e => {
  window.location.href = "https://evebej.github.io/Countdown/";
})

window.addEventListener('resize', function(event) {
  flasher.style.width = window.innerWidth.toString() + "px";
  flasher.style.height = window.innerHeight.toString() + "px";
  counter.style.width = window.innerWidth.toString() + "px";
  counter.style.height = window.innerHeight.toString() + "px";
}, true);
