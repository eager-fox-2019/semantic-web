var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}
  x[myIndex-1].style.display = "block";
  setTimeout(carousel, 3000);
}

let about = document.getElementById("about");
let member = document.getElementById("member");
let home = document.getElementById("home");

function showHome(){
    about.style.display = "none";
    member.style.display = "none";
    home.style.display = "block";
}

function showMember(){
    about.style.display = "none";
    member.style.display = "block";
    home.style.display = "none";
}

function showAbout(){
    about.style.display = "block";
    member.style.display = "none";
    home.style.display = "none";
}

