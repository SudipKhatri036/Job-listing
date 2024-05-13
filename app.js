"use strict";
const filterCatContainer = document.getElementById("filtered-cat");
const filteredCategory = document.getElementById("category");
const contentContainer = document.getElementById("content-container");
const filterBtnContainer = document.querySelector(".filter-btn-container");
const crossBtns = document.querySelectorAll("h4 button.cross-btn");
const clearBtn = document.querySelector(".clear-btn");
let filteredBtnArr = [];
//---------- Show List Of Jobposting ----------
function renderJobListing(lists) {
  contentContainer.innerHTML = "";
  return lists
    .map((list) => {
      return `<div class="card-container ${list.featured ? "featured" : ""}">
          <div class="job-details">
            <img src="${list.logo}" alt="${list.company} logo" />
            <div class="details">
              <div class="company-info flex">
                <h3>${list.company}</h3>
                <div class="stat">
                ${list.new ? `<p class="stat-new">new!</p>` : ""}
                 ${
                   list.featured ? `<p class="stat-featured">featured</p>` : ""
                 } 
                </div>
              </div>
              <h2>${list.position}</h2>
              <div class="flex listed-date">
                <p>${list.postedAt}</p>
                <span class="round-dot"></span>
                <p>${list.contract}</p>
                <span class="round-dot"></span>
                <p>${list.location}</p>
              </div>
            </div>
          </div>
          <hr />
          <div class="filter-btn-container">
                 ${renderBtn(list.role, list.level, list.languages, list.tools)}
          </div>
        </div>`;
    })
    .join("");
}

// Code To Render btn in listing div
function renderBtn(role, level, languages, tools) {
  // Initialize an array to store HTML strings of filter buttons
  const filterBtnsHTML = [];

  // Create filter button for the role
  const roleBtnHTML = `<button class="btn filter-btn"  data-role="${role}">${role}</button>`;
  filterBtnsHTML.push(roleBtnHTML);

  const leveBtnlHTML = `<button class="btn filter-btn"  data-level="${level}">${level}</button>`;
  filterBtnsHTML.push(leveBtnlHTML);
  // Create filter buttons for each language
  languages.forEach((language) => {
    const languageBtnHTML = `<button class="btn filter-btn"  data-language="${language}">${language}</button>`;
    filterBtnsHTML.push(languageBtnHTML);
  });

  // Create filter buttons for each tool
  tools.forEach((tool) => {
    const toolBtnHTML = `<button class="btn filter-btn"  data-tool="${tool}">${tool}</button>`;
    filterBtnsHTML.push(toolBtnHTML);
  });

  // Join all filter button HTML strings into a single string and return
  return filterBtnsHTML.join("");
}

contentContainer.innerHTML = renderJobListing(jobData);
const cardContainers = document.querySelectorAll(".card-container");
const filterBtns = document.querySelectorAll(".filter-btn-container button");

// Function for removing filter
function removeFilter(el) {
  const btnFilters = document.querySelectorAll(".filter-btn");
  el.remove();

  const elText = el.innerText.trim();
  // Getting index of h4 elements in array
  const idx = filteredBtnArr.findIndex((item) => {
    return item === elText;
  });

  // Removing the clicked filters btn from Array
  filteredBtnArr.splice(idx, 1);
  filterListItems();

  // removing active class from matched condition
  btnFilters.forEach((btn) => {
    if (btn.innerText === elText) {
      btn.classList.remove("active");
    }
  });

  if (filteredBtnArr.length === 0) {
    filterCatContainer.style.display = "none";
  }
}

// Rendering filter button function
function renderFilteredButtons(textData) {
  if (filteredBtnArr.includes(textData)) return;

  filterCatContainer.style.display = "flex";
  const h4El = document.createElement("h4");
  h4El.classList.add("btn");
  h4El.innerHTML = ` ${textData}
  <button class="cross-btn">
    <img src="./images/icon-remove.svg" alt="Remove logo" />
  </button>`;
  filteredCategory.append(h4El);
  filteredBtnArr.push(textData);

  // Attach event listeners to remove buttons in the filtered category
  const removeButton = h4El.firstElementChild;
  removeButton.addEventListener("click", () => removeFilter(h4El));
}

function filterListItems() {
  for (let i = 0; i < cardContainers.length; i++) {
    cardContainers[i].classList.add("hide");
  }

  const arr = [...new Set(filteredBtnArr)];

  for (let j = 0; j < cardContainers.length; j++) {
    const roles = cardContainers[j].querySelectorAll("[data-role]");
    const levels = cardContainers[j].querySelectorAll("[data-level]");
    const langs = cardContainers[j].querySelectorAll("[data-language]");
    const tools = cardContainers[j].querySelectorAll("[data-tool]");

    const listItems = pushItemsToArray([roles, levels, langs, tools]);

    const doesInclude = arr.every((item) => {
      return listItems.includes(item);
    });

    if (doesInclude) {
      cardContainers[j].classList.remove("hide");
    }
  }
}
// Helper Functions
function pushItemsToArray(arr) {
  const arrayOfTexts = [];

  for (let i = 0; i < arr.length; i++) {
    arr[i].forEach((item) => {
      arrayOfTexts.push(item.innerText);
    });
  }

  return arrayOfTexts;
}

// Evenet Listener for all filter btn in main container
filterBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const clickedBtn = e.currentTarget;
    const dataObjKeys = Object.keys(clickedBtn.dataset);

    const tagsEl = document.querySelectorAll(`[data-${dataObjKeys}]`);

    tagsEl.forEach((tag) => {
      if (tag.innerText === clickedBtn.innerText) {
        tag.classList.add("active");
      }
    });

    renderFilteredButtons(clickedBtn.innerText);
    filterListItems();
  });
});

// Code For function of clear Btn
clearBtn.addEventListener("click", () => {
  filteredBtnArr = [];
  filteredCategory.innerHTML = "";
  filterCatContainer.style.display = "none";
  document.querySelectorAll(".card-container").forEach((card) => {
    card.classList.remove("hide");
  });
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
});
