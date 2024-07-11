// * ============================ [ Elements ] ===================================
const sideBar = $("#sideBar");
const heroWrapper = $(".hero-wrapper");
// * =================================[ Settings ]====================================
const animationInSec = 500;
const maxMsgChars = 100;
// * ==================================[ App Start ]===================================
$(document).ready(function() {
    $(`#signerOne+.signer-details`).slideToggle(animationInSec);
});
// * =============================[ Singers Toggles ]==========================================

let signerName = $(".signer-name");
signerName.on("click",function(event){
    let eleId = event.target.id;
    console.log(eleId)

    $(`:not(#${eleId})+.signer-details`).slideUp(animationInSec); // hide all elements
    $(`#${eleId}+.signer-details`).slideToggle(animationInSec); // show / hide current
});


// * =============================[ Timer ]==========================================


//Apr 12, 2027 10:37:59
// Set the date we're counting down to
let countDownDate = new Date("Apr 12, 2027 10:37:59").getTime();

// Update the count down every 1 second
let updateCountDown = setInterval(function() {

  // Get today's date and time
  const timeNow = new Date().getTime();

  // Find the distance between now and the count down date
  let distance = countDownDate - timeNow;
    
  // Time calculations for days, hours, minutes and seconds
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"

  $("#timmer .days p").html(days+" d");
  $("#timmer .hours p").html(hours+" h");
  $("#timmer .minutes p").html(minutes+" m");
  $("#timmer .seconds p").html(seconds+" s");
    
  // If the count down is over
  if (distance < 0) {
    clearInterval(updateCountDown);
    $(".timmer-wrapper").css({display:"none"})
    $("#timmer .expMessage").css({display:"block"})
    $("#timmer .expMessage p").text("Expired")
  }
}, 1000);

// * =============================[ Contact Form ]==========================================

$("#message").on("input",function(event){
    let vlaueLen = this.value.length;
    $("#msgRemainChars").text(`${ maxMsgChars - (vlaueLen) }`)
})


// * =============================[ SideBar ]==========================================


let windowIsSmall = () => window.innerWidth < 555;
let sideBarIsOpen = () => sideBar[0].offsetWidth != 0;

function toggleSideBar(pixelNum,itemLP=32,animationSec=animationInSec){
  sideBar.stop().animate({width:`${pixelNum}px`},animationSec)
  heroWrapper.stop().animate({marginLeft:`${pixelNum + 10}px`},animationSec);
  $("#sideBar .menu li").stop().animate({paddingLeft:`${itemLP}px`},animationSec)
}

$("#closeBtn").on("click",function(){
    toggleSideBar(0);
});


$("#sideBarOpenBtn").on("click",function(){
  if(windowIsSmall()){
    toggleSideBar(100,8);
  }
  toggleSideBar(200);
});


$(window).on("resize",function() {

  if(window.innerWidth < 555 && sideBarIsOpen() ){
    toggleSideBar(100,8);
  }else if(window.innerWidth > 555 && sideBarIsOpen() ){
    toggleSideBar(200,32,100);
  }
});