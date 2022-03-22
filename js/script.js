'use strict';



let reload = sessionStorage.getItem('reload');

document.addEventListener("DOMContentLoaded", function() {
  if(!reload){
    console.log('reload')
    sessionStorage.setItem('reload', 1);
    window.location.reload();
}
});


const inputRangeTime= document.querySelector('.track-time');
const inputRangeVolume= document.querySelector('.track-volume');


[inputRangeTime, inputRangeVolume].forEach(function(item) {
  item.addEventListener('input', function() {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value * 100}%, #C4C4C4 ${value * 100}%, #C4C4C4 100%)`
  })
})




const buyNow= document.getElementById('buy-now');
const close= document.querySelector('.close');
const overlay= document.querySelector('.overlay');
  
buyNow.onclick = function(e) {
  e.preventDefault();
  
  overlay.classList.add('active');
}

close.onclick = function(e) {
  e.preventDefault();
  overlay.classList.remove('active');
}

window.addEventListener('click', function(e) {
  let target = e.target;

  if(!target.closest('#booking-tickets') && !target.closest('#buy-now')) {
    overlay.classList.remove('active');
  }
})

const iframeLink= document.getElementsByClassName('iframe-link');
const iframeOverlay= document.querySelector('.iframe-overlay');

for(let i=0; i < iframeLink.length; i++) {
  iframeLink[i].onclick = function(e) {
    e.preventDefault();
    let src = iframeLink[i].getAttribute("href");
    console.log(src);
    document.querySelector('.iframe-overlay iframe').setAttribute('src', src);
    iframeOverlay.classList.add('active');
  }
}



window.addEventListener('click', function(e) {
  let target = e.target;

  if(!target.closest('.iframe-overlay iframe')&& !target.closest('.iframe-link')) {
    iframeOverlay.classList.remove('active');
  }
})







const galleryImg= document.querySelectorAll('.gallery-image');

const galleryImgSrc= [
  'image/gallery/galery-1.jpg',
  'image/gallery/galery-2.jpg',
  'image/gallery/galery-3.jpg',
  'image/gallery/galery-4.jpg',
  'image/gallery/galery-5.jpg',
  'image/gallery/galery-6.jpg',
  'image/gallery/galery-7.jpg',
  'image/gallery/galery-8.jpg',
  'image/gallery/galery-9.jpg',
  'image/gallery/galery6.jpg',
  'image/gallery/galery5.jpg',
  'image/gallery/galery12.jpg',
  'image/gallery/galery11.jpg',
  'image/gallery/galery13.jpg',
  'image/gallery/galery14.jpg',
  ]

function shuffleGallery(arr) {
  arr.sort(function() {
    return Math.random() - 0.5;
  });
}


shuffleGallery(galleryImgSrc);

for (let i=0; i < galleryImg.length; i++) {
  galleryImg[i].setAttribute('src', galleryImgSrc[i]);
  
}


// gallery animation







function slideImages(e) {

  const windowTop = window.scrollY;
  const windowBottom = window.scrollY + window.innerHeight;
  const GalleryOffsetY = document.querySelector('.section-gallery').offsetTop +  document.querySelector('.gallery').offsetTop;
 

  galleryImg.forEach(function(image) {
    const imageTop = GalleryOffsetY + image.offsetTop;
    const imageBottom = GalleryOffsetY + image.offsetTop + image.height;
    const imageMiddle = (imageTop + imageBottom) / 2;
    // The image should slide in if its middle is visible in the window
    if (imageMiddle >= windowTop && imageMiddle <= windowBottom) {
      image.classList.add('active');
    }

    // The image should slide out if entirely above or below visible window
    if ( imageTop > windowBottom) {
      image.classList.remove('active');
    }
  });
}








function galleryImgCheck(e) {
  console.log(e);
}


window.addEventListener('scroll', slideImages);


// adaptive menu


const menuToggle= document.getElementById('menu-toggle');
const body= document.querySelector('body');
  
menuToggle.onclick = function(e) {
  e.preventDefault();

  body.classList.toggle('open-menu');
}

  
  window.addEventListener('click', function(e) {
    let target = e.target;
  
    if(!target.closest('#menu-toggle') && !target.closest('#nav-mobile')) {
      body.classList.remove('open-menu');
    }
  })










// slider Welcome

let currentSlideNun = document.querySelector('.current');

let sliderWelcome = tns({
  container: '#slider',
  items: 1,
  controlsContainer: '.arrows',
  navContainer: '.slider-dots',
  speed: 500,
  mouseDrag: true

});




sliderWelcome.events.on('transitionStart', () => {
  
  document.querySelector('.counter .current').textContent = '0' + sliderWelcome.getInfo().displayIndex;
});









// video player

const videoPlayer = document.querySelector('.center-video');
const videoViewer= videoPlayer.querySelector('.video-viewer');
const timeRange = videoPlayer.querySelector('.track-time');
const playBtn = videoPlayer.querySelector('.play');
const playBigBtn = videoPlayer.querySelector('.bigplay');
const volumeBtn = videoPlayer.querySelector('.volume');
const volumeRange = videoPlayer.querySelector('.track-volume');
const fullscreenBtn = videoPlayer.querySelector('.fullscreen');

const playBtnimg = playBtn.querySelector('img');
const volumeBtnimg = volumeBtn.querySelector('img');
const fullscreenBtnimg = fullscreenBtn.querySelector('img');


let iconSrc = [
  'image/video/play.svg',
  'image/video/pause.svg',
  'image/video/volume.svg',
  'image/video/mute.svg',
  'image/video/fullscreen.svg',
  'image/video/fullscreen_exit.svg',
]

// function

function togglePlay() {
  if(videoViewer.paused) {
    videoViewer.play();
    playBigBtn.classList.add('hidden');
  } else {
    videoViewer.pause();
    playBigBtn.classList.remove('hidden');
  }
}

function updateVideoBtn() {
  if(videoViewer.paused) {
    playBtnimg.setAttribute('src', iconSrc[0]);
    playBigBtn.classList.remove('hidden');
  } else {
    playBtnimg.setAttribute('src', iconSrc[1]);
    playBigBtn.classList.add('hidden');
  }

}

const audioVol = { volume : 0 };
let lastVolume;

function mutedVideo() {

  let valueVolume = volumeRange.value;
  audioVol.volume = valueVolume;

  if (valueVolume != 0) {
    lastVolume = valueVolume;
  }
  console.log(lastVolume)

  if(videoViewer.muted) {
    videoViewer.muted = false;
    volumeBtnimg.setAttribute('src', iconSrc[2]);
    volumeRange.value = lastVolume || 0.5;
    volumeRange.style.background = `linear-gradient(to right, #710707 ${lastVolume * 100}%, #710707 ${lastVolume * 100}%, #C4C4C4 0%, #C4C4C4 100%)`
  } else {
    videoViewer.muted = true;
    volumeBtnimg.setAttribute('src', iconSrc[3]);
    volumeRange.value = 0;
    volumeRange.style.background = `linear-gradient(to right, #710707 0%, #710707 0%, #C4C4C4 0%, #C4C4C4 100%)`
  }

}


function rangeUpdate() {
  videoViewer[this.name] = this.value;
}

function videoTimeProgress() {
  const progressPercent = (videoViewer.currentTime / videoViewer.duration);
  
  timeRange.value = progressPercent;
  timeRange.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progressPercent * 100}%, #C4C4C4 ${progressPercent * 100}%, #C4C4C4 100%)`
}

function scrub(elem) {
  const scrubTime = (elem.offsetX / timeRange.offsetWidth) * videoViewer.duration;
  videoViewer.currentTime = scrubTime;
}

function toggleFullscreen() {
  const fullscreenBtnimg = fullscreenBtn.querySelector('img');

  if(videoPlayer.classList.contains('fullscreen')) {
    document.exitFullscreen();
    videoPlayer.classList.remove('fullscreen');
    fullscreenBtnimg.setAttribute('src', iconSrc[4]);
  } else {
    videoPlayer.requestFullscreen();
    videoPlayer.classList.add('fullscreen');
    fullscreenBtnimg.setAttribute('src', iconSrc[5]);
  }
}

// event listener

videoViewer.addEventListener('click', togglePlay);
videoViewer.addEventListener('play', updateVideoBtn);
videoViewer.addEventListener('pause', updateVideoBtn);
videoViewer.addEventListener('timeupdate', videoTimeProgress);

playBtn.addEventListener('click', togglePlay);
playBigBtn.addEventListener('click', togglePlay);

volumeBtn.addEventListener('click', mutedVideo);

let mousedown = false;

timeRange.addEventListener('change', rangeUpdate);
timeRange.addEventListener('click', scrub);
timeRange.addEventListener('mousemove', (e) => mousedown && scrub(e));
timeRange.addEventListener('mousedown', () => mousedown = true);
timeRange.addEventListener('mouseup', () => mousedown = false);

volumeRange.addEventListener('mousemove', rangeUpdate);
volumeRange.addEventListener('change', () => {
  if (volumeRange.value == 0) {
    mutedVideo();
  } else {
    volumeBtnimg.setAttribute('src', iconSrc[2]);
    videoViewer.muted = false;
    rangeUpdate();
  }
});



fullscreenBtn.addEventListener('click', toggleFullscreen);








let windowTopScroll = window.scrollY;

let videoOffset = document.querySelector('#video').offsetTop;
let videoHeight = document.querySelector('#video').clientHeight;









  document.addEventListener('keydown', function(event){

    if (windowTopScroll < (videoOffset + videoHeight)) {
      if(event.code == 'Space')
        event.preventDefault();
      }
  }); 
  

  

    document.addEventListener('keyup', function(event){
 
    if (windowTopScroll < (videoOffset + videoHeight)) {
      if (event.code == 'Space') {
        togglePlay();
      }
  
      if (event.code == 'KeyM') {
        mutedVideo();
      }
  
      if (event.code == 'KeyF') {
        toggleFullscreen();
      }
    }
  
  });




window.addEventListener('scroll', () => {
  windowTopScroll = window.scrollY;
  if(windowTopScroll > 1000) {
    document.querySelector('#back-to-top').classList.add('visible');
  } else {
    document.querySelector('#back-to-top').classList.remove('visible');
  }
});


// back to top button

function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -50);
    setTimeout(backToTop, 0)
  }
}


document.querySelector('#back-to-top').addEventListener('click', backToTop)



// end


let elementSpeedBackRate = document.createElement('div');

elementSpeedBackRate.classList.add('speed-back-rate');



function playbackRateUp(e) {

  if (e.shiftKey && e.code == 'Comma') {
      videoViewer.playbackRate  = videoViewer.playbackRate + 0.25;
      elementSpeedBackRate.textContent = videoViewer.playbackRate;

      if (!(videoPlayer.querySelector('.speed-back-rate'))) {
        videoPlayer.append(elementSpeedBackRate);
      }
      
       setTimeout(() => elementSpeedBackRate.remove(), 3000);
  }
}

function playbackRateDown(e) {

  if (e.shiftKey && e.code == 'Period') {
      videoViewer.playbackRate  = videoViewer.playbackRate - 0.25;
      elementSpeedBackRate.textContent = videoViewer.playbackRate;

      if (!(videoPlayer.querySelector('.speed-back-rate'))) {
        videoPlayer.append(elementSpeedBackRate);
      }
      
      setTimeout(() => elementSpeedBackRate.remove(), 3000);
  }
}

document.addEventListener('keyup', playbackRateUp);
document.addEventListener('keyup', playbackRateDown);



// slider for video section

const centerVideoList = [
  ['video/video0.mp4','video/poster0.jpg'],
  ['video/video1.mp4','video/poster1.jpg'],
  ['video/video2.mp4','video/poster2.jpg'],
  ['video/video3.mp4','video/poster3.jpg'],
  ['video/video4.mp4','video/poster4.jpg'],
]


let sliderVideo = tns({
  container: '#slider-video',
  items: 2.8,
  gutter: 42,
  autoWidth: true,
  loop: true,
  rewind: false,
  prevButton: '.left.video-arrow',
  nextButton: '.right.video-arrow',
  navContainer: '.dots-video',
  speed: 500,
  mouseDrag: true

});

sliderVideo.events.on('transitionStart', () => {
  videoViewer.setAttribute('src', centerVideoList[sliderVideo.getInfo().displayIndex -1][0]);
  timeRange.value = 0;
   videoViewer.setAttribute('poster', centerVideoList[sliderVideo.getInfo().displayIndex -1][1]);
   playBtnimg.setAttribute('src', iconSrc[0]);

   
});

sliderVideo.events.on('transitionEnd', function () {
  timeRange.value = 0;
  timeRange.style.background = `linear-gradient(to right, #710707 0%, #710707 0%, #C4C4C4 0%, #C4C4C4 100%)`;
});


// iframe youtube

let players = document.querySelectorAll('#slider-video .ytplayer');

for(let i = 0; i < players.length; i++) {
  players[i].setAttribute('id', `player${i}`)
}



let playersVideo = ['player0','player1','player2','player3','player4','player5','player6','player7','player8','player9','player10','player11','player12','player13','player14','player15','player16','player17','player18','player19','player20'];

function onYouTubeIframeAPIReady() {

  for(let i = 0; i < players.length; i++) {

    playersVideo[i] = new YT.Player(players[i].id, {
      height: '',
      width: '',
      videoId: '',
      events: {
        'onStateChange': onPlayerStateChange
      }
    });

  }
  
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
      stopVideo(event.target.id);
      videoViewer.pause();
  }
}

function stopVideo(player_id) {

for(var i=0;i<playersVideo.length;i++){
  if (player_id != playersVideo[i].id)
  playersVideo[i].stopVideo();
}
}



const sliderIframeVideo = document.querySelector('.slider-three-item');

let iframeVideo = document.querySelectorAll('#slider-video iframe');

document.querySelector('.slider-three-item-pagination').addEventListener('click', () => {
  iframeVideo = document.querySelectorAll('#slider-video iframe');
  timeRange.value = 0;
  // for (let item of iframeVideo) {
  //   item.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
  // }
  for(var i=0;i<playersVideo.length;i++){
  
    playersVideo[i].stopVideo();
  }
})


videoViewer.addEventListener('play', () => {

  for(var i=0;i<playersVideo.length;i++){
  
    playersVideo[i].stopVideo();
  }
})
















// tickets form

const prevBtnForm= document.querySelectorAll(".number .prev");
const nextBtnForm= document.querySelectorAll(".number .next");

const ticketForm = document.querySelector('form.choice-ticket');
const typeTicket = ticketForm.querySelectorAll('[name="ticket_type"]');
const basic = ticketForm.querySelector('[name="basic"]');
const senior = ticketForm.querySelector('[name="senior"]');

const formBooking = document.querySelector('.form-booking');
const basicBooking = formBooking.querySelector('[name="basic"]');
const seniorBooking = formBooking.querySelector('[name="senior"]');
const selectTicketType = formBooking.querySelector('.select-ticket-type');

const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let TicketTypeText = formBooking.querySelector('#choice-ticket-type').textContent;
let dateText = formBooking.querySelector('#choice-date').textContent;
let typeTicketValue = ticketForm.querySelector('[name="ticket_type"]:checked').value;
let basicValue = ticketForm.querySelector('[name="basic"]').value;
let seniorValue = ticketForm.querySelector('[name="senior"]').value;
let timeValue;

if (formBooking.querySelector('.select-time').value) {
  timeValue = formBooking.querySelector('.select-time').value;
}



let date = new Date();
let monthNow = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
let dayNow = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();

let dateMinValue = date.getFullYear() + '-' + monthNow + '-' + dayNow;

let dateInputValue = formBooking.querySelector('[name="date"]').value;
let dateInput;

if(dateInputValue == '') {
  dateInput = dateTransform(dateMinValue);
}


let totalPrice = 0;

formBooking.querySelector('[name="date"]').setAttribute('min', dateMinValue);
// function

if(!localStorage.getItem('typeTicketChecked')) {
  ticketsteStorage();
} else {
  setStorage();
}



for(let type of typeTicket) {
  type.addEventListener('input', () => {
    if(type.checked) {
      typeTicketValue = type.value;
      TicketTypeText = type.nextElementSibling.textContent;
      
    }
    calculateTotal();
  })
}


function prevButton() {
  let event = new Event('change');

  this.nextElementSibling.stepDown();
  this.nextElementSibling.dispatchEvent(event);
  
  calculateTotal();
}

function nextButton() {
  let event = new Event('change');

  this.previousElementSibling.stepUp();
  this.previousElementSibling.dispatchEvent(event);

  calculateTotal();
}







function calculateTotal() {
   basicValue = ticketForm.querySelector('[name="basic"]').value;
   seniorValue = ticketForm.querySelector('[name="senior"]').value;
   formBooking.querySelector('#choice-ticket-type').textContent = TicketTypeText;
   totalPrice = typeTicketValue * basicValue + typeTicketValue / 2 * seniorValue;

   ticketsteStorage();

   formBooking.querySelector('.total-value').textContent = totalPrice + ' €';
   ticketForm.querySelector('.total-value').textContent = totalPrice;
}



function ticketsteStorage() {
  localStorage.setItem('typeTicketChecked', ticketForm.querySelector('[name="ticket_type"]:checked').id);
  localStorage.setItem('typeTicketValue', ticketForm.querySelector('[name="ticket_type"]:checked').value);
  localStorage.setItem('basicValue', basicValue);
  localStorage.setItem('seniorValue', seniorValue);
  localStorage.setItem('totalPrice', totalPrice);
  localStorage.setItem('TicketTypeText', TicketTypeText);
  localStorage.setItem('dateInput', dateInput);
  localStorage.setItem('dateInputValue', dateInputValue);
  localStorage.setItem('timeValue', timeValue);


  setStorage();
}


function setStorage() {
  let typeTicketChecked = localStorage.getItem('typeTicketChecked');

  ticketForm.querySelector(`#${typeTicketChecked}[name="ticket_type"]`).checked = true;
  ticketForm.querySelector('[name="basic"]').value = localStorage.getItem('basicValue');
  ticketForm.querySelector('[name="senior"]').value = localStorage.getItem('seniorValue');
  formBooking.querySelector('[name="basic"]').value = localStorage.getItem('basicValue');
  formBooking.querySelector('[name="senior"]').value = localStorage.getItem('seniorValue');
  ticketForm.querySelector('.total-value').textContent = localStorage.getItem('totalPrice');
  formBooking.querySelector('.total-value').textContent = localStorage.getItem('totalPrice') + ' €';
  formBooking.querySelector('.select-ticket-type').value = ticketForm.querySelector('[name="ticket_type"]:checked').value;

  formBooking.querySelector('.count-basic').textContent = localStorage.getItem('basicValue');
  formBooking.querySelector('.count-senior').textContent = localStorage.getItem('seniorValue');

  formBooking.querySelector('.count-total .price-basic').textContent = localStorage.getItem('typeTicketValue');
  formBooking.querySelector('.entry-ticket .price-basic').textContent = localStorage.getItem('typeTicketValue');
  formBooking.querySelector('.count-total .price-senior').textContent = localStorage.getItem('typeTicketValue') / 2;
  formBooking.querySelector('.entry-ticket .price-senior').textContent = localStorage.getItem('typeTicketValue') / 2;

  formBooking.querySelector('.price-basic-total').textContent = localStorage.getItem('typeTicketValue') * localStorage.getItem('basicValue') + ' €';
  formBooking.querySelector('.price-senior-total').textContent = localStorage.getItem('typeTicketValue') / 2 * localStorage.getItem('seniorValue') + ' €';

  dateInputValue = localStorage.getItem('dateInputValue');
  timeValue = localStorage.getItem('timeValue');

  formBooking.querySelector('#choice-ticket-type').textContent = localStorage.getItem('TicketTypeText');
  formBooking.querySelector('#choice-date').textContent = localStorage.getItem('dateInput');
  formBooking.querySelector('[name="date"]').value = localStorage.getItem('dateInputValue');
  formBooking.querySelector('.select-time').value = localStorage.getItem('timeValue');
  if(localStorage.getItem('timeValue')) {
    formBooking.querySelector('#choice-time').textContent = localStorage.getItem('timeValue');
  }

}


function dateTransform(date) {
  let dateParse = new Date(Date.parse(date));
  
  let dateWeekDay = weekday[dateParse.getDay()];
  let dateMonth = monthNames[dateParse.getMonth()];
  
  dateInput = `${dateWeekDay}, ${dateMonth} ${dateParse.getDate()}`;

  return dateInput;

}



// event


for(let prev of prevBtnForm) {
  prev.addEventListener('click', prevButton);
}

for(let next of nextBtnForm) {
  next.addEventListener('click', nextButton);
}



basic.addEventListener('change', function() {
  basicBooking.value = this.value;
})

basicBooking.addEventListener('change', function() {
  basic.value = this.value;
})

senior.addEventListener('change', function() {
  seniorBooking.value = this.value;
})

seniorBooking.addEventListener('change', function() {
  senior.value = this.value;
})

formBooking.querySelector('.select-ticket-type').addEventListener('change', function() {
  if(this.value != 0){
    typeTicketValue = this.value;
    ticketForm.querySelector(`[name="ticket_type"][value="${typeTicketValue}"]`).checked = true;
    TicketTypeText = selectTicketType.options[selectTicketType.selectedIndex].text;
    
    
  }
  calculateTotal();
})

formBooking.querySelector('.select-time').addEventListener('change', function() {
  if(this.value != 0){
    timeValue = this.value;
    console.log(timeValue)
    formBooking.querySelector('#choice-time').textContent = timeValue;
  }
   calculateTotal();
})

formBooking.querySelector('[name="date"]').addEventListener('change', function() {

  dateInputValue = this.value;
  dateText = this.value;
  formBooking.querySelector('[name="date"]').value = dateInputValue;

  formBooking.querySelector('#choice-date').textContent = dateTransform(dateText);

   calculateTotal();
  
});



const nameValidate = /^[a-zA-Zа-яА-Я]+(?:\s+[a-zA-Zа-яА-Я\s]+)*$/;

formBooking.querySelector('[name="name"]').addEventListener('change', function() {
  let nameValue = this.value;
 
  if((nameValidate.test(nameValue)) && (nameValue.length > 2 && nameValue.length < 16)) {
    
    this.closest('.label').classList.remove('invalid');
  } else {
 
    this.closest('.label').classList.add('invalid');

  }

})


const emailValidate = /^[A-Za-z0-9_-]{3,15}@([a-zA-Z_]{4,})+?\.[a-zA-Z]{2,3}$/;

formBooking.querySelector('[name="email"]').addEventListener('change', function() {
  let emailValue = this.value;
 
  if((emailValidate.test(emailValue))) {
    
    this.closest('.label').classList.remove('invalid-email');
  } else {
    
    this.closest('.label').classList.add('invalid-email');
    
  }

})


const phoneValidate = /^(\d[- _():=+]?){1,10}(\s*)?$/;

formBooking.querySelector('[name="phone"]').addEventListener('change', function() {
  let phoneValue = this.value;
  if((phoneValidate.test(phoneValue))) {
    
    this.closest('.label').classList.remove('invalid-phone');
  } else {
    this.closest('.label').classList.add('invalid-phone');
    
  }

})










//  explore slider



function initComparisons() {
  const imgOverlay = document.querySelector(".img-overlay");

    compareImages(imgOverlay);

  function compareImages(img) {
    let slider,
        clicked = 0,
        width,
        height;
    
    width = img.offsetWidth;
    height = img.offsetHeight;
    
    img.style.width = (width / 5 * 3) + "px";
    
    slider = document.querySelector('.separator')

    slider.style.left = (width / 5 * 3) - (slider.offsetWidth / 2) + "px";
  
    slider.addEventListener("mousedown", slideReady);

    window.addEventListener("mouseup", slideFinish);
  
    slider.addEventListener("touchstart", slideReady);

    window.addEventListener("touchstop", slideFinish);

    function slideReady(e) {
      e.preventDefault();
      
      clicked = 1;
      
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }

    function slideFinish() {
      
      clicked = 0;
    }

    function slideMove(e) {
      let pos;
   
      if (clicked == 0) return false;
    
      pos = getCursorPos(e)
   
      if (pos < 0) pos = 0;
      if (pos > width) pos = width;
      
      slide(pos);
    }
    function getCursorPos(e) {
      let a,
          x = 0;

      e = e || window.event;
     
      a = img.getBoundingClientRect();
      
      x = e.pageX - a.left;
      
      x = x - window.pageXOffset;
      return x;
    }
    function slide(x) {
      
      img.style.width = x + "px";
      
      slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    }
  }
}

initComparisons();





// map


mapboxgl.accessToken = 'pk.eyJ1IjoiaG9ybmRyb24iLCJhIjoiY2t1MTM1ZnloMmJrdTJycXRpOWl3ZjlzMiJ9.FWEZ3AlImIx8IQlaw1-fMw';

const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/light-v10',
center: [2.3364, 48.86091],
zoom: 15.7
});

const marker1 = new mapboxgl.Marker({color: '#171717'}).setLngLat([2.3364, 48.86091]).addTo(map);
const marker2 = new mapboxgl.Marker({color: '#757575'}).setLngLat([2.3333, 48.8602]).addTo(map);
const marker3 = new mapboxgl.Marker({color: '#757575'}).setLngLat([2.3397, 48.8607]).addTo(map);
const marker4 = new mapboxgl.Marker({color: '#757575'}).setLngLat([2.3330, 48.8619]).addTo(map);
const marker5 = new mapboxgl.Marker({color: '#757575'}).setLngLat([2.3365, 48.8625]).addTo(map);

        

map.addControl(new mapboxgl.NavigationControl());















let sselfAssessment = `
Ваша оценка - 155 баллов


Привет! Спасибо что проверяешь мою работу, и что заглянул в консоль почитать мои комментарии!
Вроде бы все выполнено, проверял себя по форме, старался чтоб все было так, как нужно.

Единственный момент, иногда глючит слайдер сравнения фотографий при первой загрузке бывает показывает ересь,
на если обновить страницу, то он работает нормально. С чем связан этот баг не знаю. 
Если столкнешься с ним и поймешь почему так происходит, то напиши в комментарии, буду очень признателен.

ДОПОЛНИТЕЛЬНЫЙ ФУНКЦИОНАЛ:

Из улучшений присутствуют две вещи:

1. Кнопка "Discover the Louvre" и ссылки в блоке "VIRTUAL TOUR", которые ведут на google street view, 
теперь открываются в модальном окне, как по мне это гораздо удобнее.

2. Кнопка прокрутки страницы наверх, появляется при скролле, и исчезает при переходе страницы наверх,
 прокрутку постарался сделать плавной.



Отзыв по пунктам ТЗ:
Выполненные пункты:
1) есть возможность перелистывания слайдов влево и вправо кликами по стрелкам 

2) есть возможность перелистывания слайдов влево и вправо свайпами (движениями) мышки 

3) есть возможность перелистывания слайдов кликами по буллетам (квадратики внизу слайдера) 

4) слайды перелистываются плавно с анимацией смещения вправо или влево 

5) перелистывание слайдов бесконечное (зацикленное) 

6) при перелистывании слайдов буллет активного слайда подсвечивается (выделяется стилем) 

7) при перелистывании слайдов кликами или свайпами меняется номер активного слайда 

8) даже при частых кликах или свайпах нет ситуации, когда слайд после перелистывания находится не по центру, нет ситуации, когда видны одновременно два слайда 

9) при клике по самому слайду или кнопке Play в центре слайда, внутри слайда проигрывается видео с YouTube. Никакие изменения с основным видео при этом не происходят 

10) если видео с YouTube проигрывается, клик по кнопке Pause останавливает его проигрывание. Также проигрывание видео останавливается, если кликнуть по другому слайду или кнопке Play в центре другого слайда. В указанной ситуации другое видео должно запуститься, а текущее остановиться. Невозможно проигрывание нескольких YouTube видео одновременно 

11) если внутри слайда проигрывается видео с YouTube, клик по стрелке перелистывания слайдов или клик по буллету останавливает проигрывание видео 

12) есть возможность перелистывания слайдов с видео влево и вправо кликами по стрелкам. Слайды перелистываются по одному, при этом также меняется основное видео 

13) есть возможность перелистывания слайдов кликами по буллетам (кружочки внизу слайдера), при этом также меняется основное видео 

14) слайды перелистываются плавно с анимацией смещения вправо или влево (для смены основного видео анимация смещения не требуется и не проверяется) 

15) перелистывание слайдов бесконечное (зацикленное) 

16) при перелистывании слайдов буллет активного слайда подсвечивается (выделяется стилем) 

17) если основное видео проигрывалось при перелистывании слайдера, проигрывание видео останавливается, прогресс бар сдвигается к началу, иконки "Play" на панели управления и по центру видео меняются на первоначальные 

18) даже при частых кликах по стрелкам нет ситуации, когда слайд после перелистывания находится не по центру, нет ситуации, когда видны одновременно два слайда 

19) при клике по кнопке "Play" слева внизу на панели видео начинается проигрывание видео, иконка кнопки при этом меняется на "Pause", большая кнопка "Play" по центру видео исчезает. Повторный клик на кнопку останавливает проигрывание видео, иконка меняется на первоначальную, большая кнопка "Play" по центру видео снова отображается 

20) при клике по большой кнопке "Play" по центру видео, или при клике по самому видео, начинается проигрывание видео, иконка кнопки "Play" слева внизу на панели видео меняется на "Pause", большая кнопка "Play" по центру видео исчезает. Клик на видео, которое проигрывается, останавливает проигрывание видео, иконка кнопки "Play" слева внизу на панели видео меняется на первоначальную, большая кнопка "Play" по центру видео снова отображается 

21) прогресс-бар отображает прогресс проигрывания видео 

22) перетягивание ползунка прогресс-бара позволяет изменить время с которого проигрывается видео 

23) если прогресс-бар перетянуть до конца, видео останавливается, соответственно, меняется внешний вид кнопок "Play" 

24) при клике на иконку динамика происходит toggle звука и самой иконки (звук включается или выключается, соответственно изменяется иконка) 

25) при перемещении ползунка громкости звука изменяется громкость видео 

26) если ползунок громкости звука перетянуть до 0, звук выключается, иконка динамика становится зачеркнутой 

27) если при выключенном динамике перетянуть ползунок громкости звука от 0, звук включается, иконка громкости перестаёт быть зачёркнутой 

28) при нажатии на кнопку fullscreen видео переходит в полноэкранный режим, при этом видео и панель управления разворачиваются во весь экран. При нажатии на кнопку fullscreen повторно видео выходит из полноэкранного режима. Нажатие на клавишу для выхода из полноэкранного режима Esc не проверяем и не оцениваем 

29) панель управления в полноэкранном режиме визуально выглядит так же, как на макете - кнопки равномерно распределены по всей ширине страницы, относительные размеры между кнопками и ползунками, а также относительные размеры самих кнопок остались прежними 

30) клавиша Пробел — пауза, при повторном нажатии - play 

31) Клавиша M (англ) — отключение/включение звука 

32) Клавиша F — включение/выключение полноэкранного режима 

33) Клавиши SHIFT+, (англ) — ускорение воспроизведения ролика 

34) Клавиши SHIFT+. (англ) — замедление воспроизведения ролика 

35) ползунок можно перетягивать мышкой по горизонтали 

36) ползунок никогда не выходит за границы картины 

37) при перемещении ползунка справа налево плавно появляется нижняя картина 

38) при перемещении ползунка слева направо плавно появляется верхняя картина 

39) при обновлении страницы ползунок возвращается в исходное положение 

40) при прокрутке страницы вниз появление картин секции Galery сопровождается анимацией: изображения плавно поднимаются снизу вверх, увеличиваясь и создавая эффект выплывания. В качестве образца анимации используйте анимацию на сайте Лувра https://www.louvre.fr/ 

41) если прокрутить страницу вверх и затем снова прокручивать вниз, анимация появления картин повторяется 

42) при обновлении страницы, если она к тому моменту была прокручена до секции Galery, анимация картин повторяется 

43) при изменении количества билетов Basic и Senior пересчитывается общая цена за них 

44) у каждого типа билетов своя цена (20 €, 25 €, 40 € для Basic и половина этой стоимости для Senior). При изменении типа билета пересчитывается общая цена за них 

45) при обновлении страницы сохраняется выбранное ранее количество билетов Basic и Senior, выбранный тип билета, общая цена за них 

46) когда при клике по кнопке Buy now открывается форма, она уже содержит данные, указанные на странице сайта - количество билетов, их тип, общая цена за них 

47) когда пользователь выбирает дату в форме слева, она отображается в билете справа 

48) нельзя выбрать дату в прошлом 

49) когда пользователь выбирает время в форме слева, оно отображается в билете справа 

50) время можно выбирать с 9:00 до 18:00 с интервалом в 30 минут 

51) можно изменить тип билета в поле Ticket type слева при этом меняется тип билета, цена билета и общая стоимость билетов справа 

52) можно изменить количество билетов каждого типа в поле слева при этом меняется количество билетов и общая стоимость билетов справа 

53) валидация имени пользователя. Имя пользователя должно содержать от 3 до 15 символов, в качестве символов могут быть использованы буквы английского или русского алфавита в нижнем или верхнем регистре и пробелы 

54) валидация e-mail должна пропукать только адреса вида username@example.com, где: username - имя пользователя, должно содержать от 3 до 15 символов (буквы, цифры, знак подчёркивания, дефис), не должно содержать пробелов; @ - символ собачки; example - домен первого уровня состоит минимум из 4 латинских букв; com - домен верхнего уровня, отделяется от домена первого уровня точкой и состоит минимум из 2 латинских букв 

55) валидация номера телефона: номер содержит только цифры; без разделения или с разделением на две или три цифры; разделение цифр может быть через дефис или пробел; с ограничением по количеству цифр не больше 10 цифр 

56) при попытке ввода в форму невалидного значения выводится предупреждение, например, "номер телефона может содержать только цифры" 

57) в секции Contacts добавлена интерактивная карта 

58) на карте отображаются маркеры, расположение и внешний вид маркеров соответствует макету 

59) стиль карты соответствует макету 

60) Любой собственный дополнительный функционал, улучшающий качество проекта. Например, ночная тема, плавная смена изображений в блоке Tickets, всплывающее окно с информацией про картины и их авторов, кнопка прокрутки страницы вверх, возможность проголосовать за понравившиеся картины с сохранением данных в local storage, всё зависит от вашей фантазии и чувства вкуса. Для удобства проверки выполненный вами дополнительный функционал включите в самооценку, которую выведите в консоль браузера 


`;

console.log(sselfAssessment);
