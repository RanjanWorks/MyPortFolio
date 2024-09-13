let footerYear = document.getElementById("year");
let navBar = document.getElementById("navbar");
let loader = document.querySelector(".loader");
let main = document.getElementById("main");
let loaderText = document.getElementById("loader-text");
let hamburger = document.querySelector(".hamburger");
let currentYear = new Date().getFullYear();
let logo = document.getElementById("logo");
let submitBtn = document.getElementById("submitBtn");
let form = document.querySelector("form");
footerYear.innerText = currentYear;

let prevScrollpos = window.pageYOffset;
const spinner =
  '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24"><use href="#icon.spinner"></use></svg>';

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
  "nǐ hǎo",
];
let helloIndex = 0;
let isLoded = false;
let helloInterval;

function animateText() {
  helloInterval = setInterval(() => {
    if (helloIndex >= helloArray.length) {
      helloIndex = 0;
      clearInterval(helloInterval);
      setTimeout(() => {
        removeLoader();
      }, 1000);
    }
    loaderText.innerHTML = helloArray[helloIndex];
    helloIndex++;
  }, 100);
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

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.matchMedia({
  "(min-width: 769px)": function () {
    gsap.to(".scroll2", {
      x: "-200%",
      scrollTrigger: {
        trigger: ".scroll2",
        scrub: 1,
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

let tl3 = gsap.timeline();
tl3.to(".overlay-navbar", {
  y: 0,
  duration: 0.3,
});

tl3.from(".overlay-navbar li", {
  y: 15,
  stagger: {
    amount: 0.4,
  },
  ease: "power2.inOut",
  opacity: 0,
});

tl3.pause();

if (window.innerWidth > 768) {
  // Adjust the width as needed
  VanillaTilt.init(document.querySelectorAll(".progress-container"), {
    max: 15,
    speed: 3000,
    glare: true,
  });

  VanillaTilt.init(document.querySelectorAll(".offer-container"), {
    max: 15,
    speed: 3000,
    reverse: true,
  });
}

form.addEventListener("submit", () => {
  submitBtn.innerHTML = `${spinner}`;
  const elements = document.querySelectorAll("#message, #email,#name");
  elements.forEach((element) => {
    element.value = "";
  });
});

let state = false;
hamburger.addEventListener("click", () => {
  if (state) {
    hamburger.classList.remove("active");
    tl3.reverse();
    state = false;
    setTimeout(() => {
      // logo.src = "./images/rlogodark.svg"
    }, 1400);
  } else {
    hamburger.classList.add("active");
    tl3.play();
    // logo.src = "./images/rlogowhite.svg"
    state = true;
  }
});

document.querySelectorAll(".overlay-wrapper li").forEach((li) => {
  li.addEventListener("click", () => {
    hamburger.classList.remove("active");
    tl3.reverse();
    state = false;
    // logo.src = "./images/rlogodark.svg";
  });
});

function downloadCv() {
  let a = document.createElement("a");
  a.href = "./images/cv.pdf";
  a.download = "ranjancv.pdf";
  document.body.append(a);
  a.click();
  a.remove();
}
