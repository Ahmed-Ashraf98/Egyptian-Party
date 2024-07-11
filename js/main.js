// * ============================ [ Elements ] ===================================

const sideBar = $("#sideBar");
const heroWrapper = $(".hero-wrapper");

// * =================================[ Settings ]====================================

const animationInSec = 500;
const maxMsgChars = 100;

// * ==================================[ App Start ]===================================

$(document).ready(function() {
  $(`#signerOne+.signer-details`).slideToggle(animationInSec); // when page load, open the first signer box
});

// * =============================[ Singers Toggles ]==========================================

let signerName = $(".signer-name");
signerName.on("click",function(event){ // on click on signer box
    let eleId = event.target.id;
    $(`:not(#${eleId})+.signer-details`).slideUp(animationInSec); // hide all elements
    $(`#${eleId}+.signer-details`).slideToggle(animationInSec); // show / hide current element
});

// * =============================[ Timer ]==========================================

// Set the date we're counting down to
let countDownDate = new Date("Apr 12, 2027 10:37:59").getTime();

// Update the count down every 1 second
let updateCountDown = setInterval(function() {

  // Get today's date and time
  const timeNow = new Date().getTime();

  // Find the distance between time now and the count down date
  let distance = countDownDate - timeNow;
    
  // Time calculations for days, hours, minutes and seconds
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in elements

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

$("#message").on("input",function(){
    let vlaueLen = this.value.length; // get current value length for the message input
    $("#msgRemainChars").text(`${ maxMsgChars - (vlaueLen) }`) // update the remaining characters 
});

// * =============================[ SideBar ]================================================


let windowIsSmall = () => window.innerWidth < 555; // check if the window width is less than 555px or not
let sideBarIsOpen = () => sideBar[0].offsetWidth != 0; // check if the side bar is open or not

function toggleSideBar(pixelNum,itemLP=32,animationSec=animationInSec){
  // This function takes three params:
  /*
  - pixelNum ==> the number of pixels for width of sidebar and margin-left of Hero section
  - itemPL ==> is the padding left of the <li> in the sidebar menu
  - animationSec ==> the number of seconds to run the animations
  */
  sideBar.stop().animate({width:`${pixelNum}px`},animationSec)
  heroWrapper.stop().animate({marginLeft:`${pixelNum + 10}px`},animationSec);
  $("#sideBar .menu li").stop().animate({paddingLeft:`${itemLP}px`},animationSec)
}

$("#closeBtn").on("click",function(){ 
    // when click on the close button in the sidebar, close the side-bar by making the width is Zero 
    toggleSideBar(0);
});


$("#sideBarOpenBtn").on("click",function(){
  // When click on the open button in the Hero section, 
  // in Small Window ==> open the side-bar by making width is 100 and padding-left of items is 8
  // in Large Window ==> open the side-bar by making width is 200 and padding-left of items is 32 (the default)
  if(windowIsSmall()){
    toggleSideBar(100,8);
  }
  toggleSideBar(200);
});


$(window).on("resize",function() {
// when resizing the window and side-bar was opend:
  // in Small Window ==> open the side-bar by making width is 100 and padding-left of items is 8
  // in Large Window ==> open the side-bar by making width is 200 and padding-left of items is 32 (the default)
  if(window.innerWidth < 555 && sideBarIsOpen() ){
    toggleSideBar(100,8);
  }else if(window.innerWidth > 555 && sideBarIsOpen() ){
    toggleSideBar(200,32,100);
  }
});