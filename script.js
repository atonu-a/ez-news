const API = "pub_ca8bfa7ba99b44c980c77e7eeced67f0";
const BASE_URL = " https://newsdata.io/api/1/latest";

async function news(query) {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API}&q=${query}`);
    const data = await response.json();
    console.log(data);
    bindData(data.results);
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

function bindData(results) {
  const cardsContainer = document.querySelector("#card-container");
  const newsTemplate = document.querySelector("#template-news-card");

  cardsContainer.innerHTML = "";
  results.forEach((result) => {
    if (!result.image_url) return;
    const cardsClone = newsTemplate.content.cloneNode(true);
    fillData(cardsClone, result);
    cardsContainer.appendChild(cardsClone);
  });
}

function fillData(cardsClone, result) {
  let newsImg = cardsClone.querySelector("#news-img");
  let newsTitle = cardsClone.querySelector("#news-title");
  let newsSource = cardsClone.querySelector("#news-source");
  let newsDesc = cardsClone.querySelector("#news-desc");

  newsImg.src = result.image_url;
  newsTitle.innerText = result.title;

  newsDesc.innerText = result.description;

  let date = new Date(result.pubDate).toLocaleString("en-US", {
    timeZone: "Asia/Dhaka",
  });

  newsSource.innerHTML = `${result.source_name} • ${date}`;

  cardsClone.firstElementChild.addEventListener("click", () => {
    window.open(result.link, "_blank");
  });
}

let sports = document.querySelector("#sports");
sports.addEventListener("click", () => {
  news("sports");
});
let finance = document.querySelector("#finance");
finance.addEventListener("click", () => {
  news("finance");
});
let education = document.querySelector("#education");
education.addEventListener("click", () => {
  news("education");
});

let curSlct = null;

function onNavItemClick(id) {
  news(id);
  let navItem = document.getElementById(id);

  curSlct?.classList.remove("active");
  curSlct = navItem;
  curSlct.classList.add("active");
}

let input = document.querySelector(".news-input");
const search = document.querySelector("#search-btn");

search.addEventListener("click", () => {
  const query = input.value;
  if (!query) return;

  news(query);
  curSlct?.classList.remove("active");
  curSlct = null;
});

window.addEventListener("load", () => {
  news("USA");
});

function reload() {
  window.location.reload();
}

const menuBtn = document.getElementById("menu-btn");
const navContent = document.getElementById("nav-content");

menuBtn.addEventListener("click", () => {
  navContent.classList.toggle("hidden");
  navContent.classList.toggle("flex");
});
