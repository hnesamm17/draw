let draw = document.querySelector("canvas");
let drp = document.querySelector(".drop");
let bpen = document.querySelector(".pen");
let beraser = document.querySelector(".eraser");

let pen = true;
let eraser = false;
let fill = "#000";

let clear = false;
let sizeeraser = 30;

let ctx = draw.getContext("2d");
draw.width = draw.getBoundingClientRect().width;
draw.height = draw.getBoundingClientRect().height;
//-------------^^^^ variables ^^^^-------------

function active_button(name) {
  pen = eraser = false;
  switch (name) {
    case "pen":
      pen = true;
      break;
    case "eraser":
      eraser = true;
      break;
    default:
      pen = true;
      break;
  }
  document.querySelectorAll("button").forEach((e) => {
    e.id = "";
  });
  document.querySelector(`.${name}`).id = "active-btn";
}
draw.addEventListener("mousemove", (e) => {
  drp.style.top = e.clientY + "px";
  drp.style.left = e.clientX + "px";
  if (eraser && clear)
    ctx.clearRect(e.clientX - 20, e.clientY - 20, sizeeraser, sizeeraser);
});
draw.addEventListener("mouseleave", (e) => {
  drp.style.top = "5%";
  drp.style.left = "58%";
});

bpen.addEventListener("click", () => {
  if (!pen) {
    active_button("pen");
  }
});
beraser.addEventListener("click", () => {
  if (!eraser) {
    active_button("eraser");
  }
});
draw.addEventListener("mousedown", (e) => {
  if (pen) {
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
    ctx.strokeStyle = fill;
  }
  if (eraser) {
    ctx.clearRect(e.clientX - 20, e.clientY - 20, sizeeraser, sizeeraser);
    clear = true;
  }
});

draw.addEventListener("mouseup", (e) => {
  if (pen) {
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.closePath();
  }
  if (eraser) {
    clear = -false;
  }
});
//choose color

document.querySelector(".color").oninput = () => {
  fill = document.querySelector(".color").value;
  ctx.strokeStyle = fill;
};
//----------
// choose size line
document.querySelector(".size").oninput = () => {
  ctx.lineWidth = document.querySelector(".size").value;
};
//------------
document.querySelector(".sizee").onchange = () => {
  let val = document.querySelector(".sizee").value;
  if (/^[2-9]\d$/.test(val)) {
    sizeeraser = Number(val);
  } else {
    alert("you should choose a number bigger 19!!");
  }
};
//
//------------caler all
document.querySelector(".ca").onclick = () => {
  ctx.clearRect(0,0,draw.width,draw.height);
};
//

