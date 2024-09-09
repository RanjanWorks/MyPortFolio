let footerYear = document.getElementById("year");
let navBar = document.getElementById("navbar");
let loader = document.querySelector(".loader");
let main = document.getElementById("main");
let loaderText = document.getElementById("loader-text");
let hamburger = document.querySelector('.hamburger')
let currentYear = new Date().getFullYear();
let logo = document.getElementById('logo')
footerYear.innerText = currentYear;

let prevScrollpos = window.pageYOffset;

window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    navBar.style.top = "0";
    navBar.classList.add("bottom-fade");
  } else {
    navBar.style.top = "-70px";
    navBar.classList.remove("bottom-fade");
  }
  prevScrollpos = currentScrollPos;
  if (window.scrollY === 0) {
    navBar.classList.remove("bottom-fade");
    navBar.style.top = "0";
  }
};

navBar.style.top = "0";

let helloArray = [
  "Hello",
  "नमस्ते ",
  "Bonjour ",
  "Hallo ",
  "Ciao ",
  "Hola",
  "जोहार हो",
];
let helloIndex = 0;
let isLoded = false;
let helloInterval;

function animateText() {
  helloInterval = setInterval(() => {
    if (helloIndex >= helloArray.length) {
      helloIndex = 0;
      clearInterval(helloInterval); 
      setTimeout(()=>{
      removeLoader(); 
      },1000)
    }
    loaderText.innerHTML = helloArray[helloIndex];
    helloIndex++;
  }, 200);
}

function removeLoader() {
  loader.classList.add("disappear");
  document.body.classList.remove("no-scroll");
  AOS.init({
    duration: 1000,
    once: true,
  });
}

window.onload = () => {
    animateText(); 
  document.documentElement.scrollTop = 0;
};

// document.onreadystatechange = function () {
//   if (document.readyState !== "complete") {
//     loader.classList.add("loading"); // Keep loader visible if not loaded
//   } else {
//     animateText(); // Start the animation once the page is fully loaded
//   }
// };


gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.matchMedia({
  // Desktop and tablet screens (width greater than 768px)
  "(min-width: 769px)": function () {
    gsap.to(".scroll2", {
      x: "-200%",
      scrollTrigger: {
        trigger: ".scroll2",
        scrub: 5,
        start: "0% 50%",
      },
    });

    let t12 = gsap.timeline({
      scrollTrigger: {
        trigger: ".offer-segment",
        start: "0% 50%",
        end: "60% 50%",
        scrub: true,
      },
    });

    t12.to(".rounded-div-wrapper", {
      height: 0,
      marginTop: 0,
    });
  },
});


let tl3 = gsap.timeline()
tl3.to(".overlay-navbar",{
  y:0,
  duration: .3,

})

tl3.from(".overlay-navbar li",{
  y: 15,
  stagger: .2,
  opacity: 0,
})

tl3.pause()


let state = false
hamburger.addEventListener('click',()=>{
if(state){
  hamburger.classList.remove('active')
  tl3.reverse()
  state = false
  setTimeout(()=>{
  logo.src = "./images/rlogodark.svg"

  },1400)
}else{
  hamburger.classList.add('active')
  tl3.play()
  logo.src = "./images/rlogowhite.svg"
  state = true

}

})

document.querySelectorAll('.overlay-wrapper li').forEach(li=>{
  li.addEventListener('click',()=>{
    hamburger.classList.remove('active')
    tl3.reverse()
    state = false
    logo.src = "./images/rlogodark.svg"
  

  })
})

function downloadCv() {
  let a = document.createElement('a');
  a.href = './images/cv.png'; // Path to your CV file
  a.download = 'ranjancv.png'; // Name and extension of the file to be downloaded
  document.body.append(a);
  a.click();
  a.remove();
}
