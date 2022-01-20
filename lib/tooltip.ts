export function initializeTooltips() {
  // console.log("initializeTooltips");
  clearTooltip();
  const elArr = document.querySelectorAll("[data-tooltip]");

  elArr[0] &&
    elArr.forEach((el) => {
      el.addEventListener("mouseover", () => handleMouseOver(el));
    });
}

function handleMouseOver(el: Element) {
  const dataset = el.getAttribute("data-tooltip");

  createTooltip(dataset);

  document.onmousemove = updateTooltipPosition;

  el.addEventListener("mouseout", function () {
    clearTooltip();

    document.onmousemove = null;

    el.removeEventListener("mouseout", this);
  });
}

function updateTooltipPosition(e: MouseEvent) {
  // tooltip width = 120px;
  const t: HTMLParagraphElement = document.querySelector(".tooltip");

  if (!t) return;

  // margin left
  if (window.innerWidth - e.clientX < 120) {
    t.style.left = e.clientX - 120 + "px";

    // normal
  } else {
    t.style.left = e.clientX + "px";
  }

  t.style.top = e.clientY + 10 /* just under the cursor */ + "px";
}

export function createTooltip(text: string) {
  // console.log("createTooltip");
  clearTooltip();

  const t = document.createElement("p");

  t.classList.add("tooltip");

  t.innerText = text;

  document.body.appendChild(t);

  return t;
}

export function updateTooltip(text: string) {
  const t: HTMLParagraphElement = document.querySelector(".tooltip");

  if (t) t.innerText = text;
}

export function clearTooltip() {
  // console.log("clearTooltip");
  const t: HTMLParagraphElement = document.querySelector(".tooltip");

  if (t) t.remove();
}
