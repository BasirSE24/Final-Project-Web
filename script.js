// jQuery Setup 
$(document).ready(function(){
  console.log("jQuery is ready!");
});

// Form Validation 
$('form').on('submit', function(e){
  e.preventDefault();
  const input = $(this).find('input').first();
  const value = input.val().trim();
  if(!value){
    showToast("Please fill in this field!");
    return;
  }
  if($(this).attr('id')==='subscribeForm' || $(this).closest('#popupForm').length){
    showToast(`Thank you for subscribing: ${value}`);
  } else {
    showToast(`Your favorite player: ${value}`);
  }
  input.val('');
});

//  Accordion 
$('.accordion-header').click(function(){
  const content = $(this).next();
  if($(this).hasClass('active')){
    $(this).removeClass('active');
    content.css('max-height','0');
  } else {
    $('.accordion-header').removeClass('active');
    $('.accordion-content').css('max-height','0');
    $(this).addClass('active');
    content.css('max-height', content.prop('scrollHeight') + 'px');
  }
});

//  Popup 
$('#openPopup').click(()=>$('#popupForm').fadeIn());
$('#closePopup').click(()=>$('#popupForm').fadeOut());
$(window).click(function(e){
  if(e.target.id==='popupForm') $('#popupForm').fadeOut();
});

//  Color & Theme 
$('#colorChangeBtn').click(function(){
  const colors = ['#ff6b6b','#4ecdc4','#45b7d1','#96ceb4','#feca57','#ff9ff3'];
  const color = colors[Math.floor(Math.random()*colors.length)];
  $('body').css('background-color', color);
});

//  Date & Time 
function updateDateTime(){
  const now = new Date();
  const options = {year:'numeric',month:'long',day:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit'};
  $('#datetime').text(`Current Date & Time: ${now.toLocaleString('en-US',options)}`);
}
setInterval(updateDateTime,1000);
updateDateTime();

function showGreeting(){
  const hour = new Date().getHours();
  let msg='';
  if(hour<12) msg='🌅 Good morning, football fan!';
  else if(hour<18) msg='☀️ Good afternoon! Ready for a match?';
  else msg='🌙 Good evening! Catch the highlights?';
  $('<p class="text-center fw-bold mt-3 fs-4 text-primary">'+msg+'</p>').prependTo('body');
}
showGreeting();

//  Top Players 
const topPlayers = [
  {name:"Vinícius Jr",club:"Real Madrid",goals:18},
  {name:"Jude Bellingham",club:"Real Madrid",goals:15},
  {name:"Harry Kane",club:"Bayern Munich",goals:30},
  {name:"Leroy Sané",club:"Bayern Munich",goals:12},
];
const playersContainer = $('<div class="container text-center my-4"><h3 class="mb-3">⭐ Top Players This Season</h3></div>');
topPlayers.forEach(p=>{
  playersContainer.append(`<div class="player-item p-2">${p.name} (${p.club}) — Goals: ${p.goals}</div>`);
});
$('.container .row:first').parent().append(playersContainer);

// Button Sound 
const sound = new Audio('./public/sound/click.mp3');
$('button,.btn').click(()=>{sound.currentTime=0; sound.play().catch(()=>{});});

//  Easter Egg 
$(document).keydown(function(e){
  if(e.key.toLowerCase()==='f'){
    const msg=$('<div class="toast-message show">⚽ Football Mode Activated!</div>');
    $('body').append(msg);
    setTimeout(()=>msg.remove(),2500);
  }
});

//  Day/Night Mode 

const themeToggle = $(`
  <button class="btn theme-toggle" aria-label="Toggle dark/light mode">
    <span class="icon">🌙</span> <span class="label">Night Mode</span>
  </button>
`);
$('body').append(themeToggle);

function setTheme(isNight) {
  if (isNight) {
    $('body').addClass('night-theme');
    themeToggle.find('.icon').text('☀️');
    themeToggle.find('.label').text('Day Mode');
    localStorage.setItem('theme', 'night');
  } else {
    $('body').removeClass('night-theme');
    themeToggle.find('.icon').text('🌙');
    themeToggle.find('.label').text('Night Mode');
    localStorage.setItem('theme', 'day');
  }
}

// Load saved theme
setTheme(localStorage.getItem('theme') === 'night');

// Toggle on click
themeToggle.click(() => {
  setTheme(!$('body').hasClass('night-theme'));
});

//  Search & Autocomplete 
const playersList=["Vinícius Jr","Jude Bellingham","Harry Kane","Leroy Sané","Cristiano Ronaldo","Manuel Neuer","Toni Kroos","Joshua Kimmich"];
$('#searchInput').on('input',function(){
  const query=$(this).val().toLowerCase();
  const suggestionBox=$('#suggestions').empty();
  if(query){
    playersList.filter(p=>p.toLowerCase().includes(query)).forEach(p=>suggestionBox.append(`<div>${p}</div>`));
  }
});
$('#suggestions').on('click','div',function(){
  $('#searchInput').val($(this).text());
  $('#suggestions').empty();
});

//  Highlight Search 
$('#searchInput').on('input',function(){
  const term=$(this).val().toLowerCase();
  $('#playerList li').each(function(){
    const text=$(this).text();
    if(term && text.toLowerCase().includes(term)){
      $(this).html(text.replace(new RegExp('('+term+')','gi'),"<mark>$1</mark>"));
    } else $(this).text(text);
  });
});

//  Scroll Progress 
$(window).scroll(function(){
  const scrolled=$(this).scrollTop() / ($(document).height() - $(window).height()) *100;
  $('#scrollProgress').css('width',scrolled+'%');
});

// Animated Counter 
$('.counter').each(function(){
  const $this=$(this);
  const target=+$this.data('target');
  $({countNum:0}).animate({countNum:target},{
    duration:2500,
    easing:"swing",
    step:function(){$this.text(Math.floor(this.countNum));},
    complete:function(){$this.text(this.countNum);}
  });
});

//  Toast Function 
function showToast(message){
  const toast=$('<div class="toast-message"></div>').text(message);
  $('body').append(toast);
  setTimeout(()=>toast.addClass('show'),100);
  setTimeout(()=>{toast.removeClass('show'); setTimeout(()=>toast.remove(),500)},3000);
}

//  Lazy Load Images 
function lazyLoad(){
  $('img[data-src]').each(function(){
    const img=$(this);
    if(img.offset().top<$(window).scrollTop()+$(window).height() && !img.attr('src')){
      img.attr('src',img.data('src')).hide().fadeIn(800);
    }
  });
}
$(window).scroll(lazyLoad);
lazyLoad();
// Player data for modal
const playerData = {
  vinicius: {
    name: "Vinícius Jr",
    club: "Real Madrid",
    position: "Left Winger",
    nationality: "Brazilian",
    description:
      "Vinícius Jr is known for his blistering pace, dazzling dribbles, and crucial goals for Real Madrid and Brazil.",
  },
  bellingham: {
    name: "Jude Bellingham",
    club: "Real Madrid",
    position: "Midfielder",
    nationality: "English",
    description:
      "A midfield star with maturity beyond his years, Jude Bellingham combines vision, strength, and leadership.",
  },
  kane: {
    name: "Harry Kane",
    club: "Bayern Munich",
    position: "Striker",
    nationality: "English",
    description:
      "Kane is one of the best goal scorers in the world, known for his finishing, playmaking, and consistency.",
  },
  sane: {
    name: "Leroy Sané",
    club: "Bayern Munich",
    position: "Winger",
    nationality: "German",
    description:
      "Sané is an explosive winger who uses his speed and skill to break defenses and create chances.",
  },
  ronaldo: {
    name: "Cristiano Ronaldo",
    club: "Al-Nassr",
    position: "Forward",
    nationality: "Portuguese",
    description:
      "One of the greatest of all time, Ronaldo is known for his athleticism, leadership, and unmatched goal-scoring record.",
  },
  neuer: {
    name: "Manuel Neuer",
    club: "Bayern Munich",
    position: "Goalkeeper",
    nationality: "German",
    description:
      "Neuer revolutionized goalkeeping with his sweeper-keeper style and remains a cornerstone for club and country.",
  },
};

// Modal behavior
document.querySelectorAll(".more-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const key = e.target.dataset.player;
    const player = playerData[key];
    if (player) {
      document.getElementById("playerModalLabel").textContent = player.name;
      document.getElementById("playerDetails").innerHTML = `
        <p><strong>Club:</strong> ${player.club}</p>
        <p><strong>Position:</strong> ${player.position}</p>
        <p><strong>Nationality:</strong> ${player.nationality}</p>
        <p>${player.description}</p>
      `;
      const modal = new bootstrap.Modal(document.getElementById("playerModal"));
      modal.show();
    }
  });
});

// Search Functionality
document.getElementById("playerSearch").addEventListener("input", function () {
  const searchValue = this.value.toLowerCase();
  document.querySelectorAll(".player-item").forEach((card) => {
    const playerName = card.dataset.name;
    if (playerName.includes(searchValue)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});






