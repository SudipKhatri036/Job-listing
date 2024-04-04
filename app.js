const filterCatContainer = document.getElementById("filtered-cat");
const filteredCategory = document.getElementById("category");
const contentContainer = document.getElementById("content-container");
const filterBtnContainer = document.getElementById("filter-btn-container");

//---------- Show List Of Jobposting ----------
function renderJobListing(lists) {
  return lists
    .map((list) => {
      return `<div class="card-container">
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
          <div id="filter-btn-container">
                 ${renderBtn(list.role, list.languages, list.tools)}
          </div>
        </div>`;
    })
    .join("");
}
function renderBtn(role, languages, tools) {
  const tagsArr = [role, ...(languages || []), ...(tools || [])];
  let tagsHTML = tagsArr
    .map((tags) => {
      return `<button class="btn filter-btn">${tags}</button>`;
    })
    .join("");
  return tagsHTML;
}

let jobsData = renderJobListing(jobData);
contentContainer.innerHTML = jobsData;

const filterBtns = document.querySelectorAll("#filter-btn-container button");

let filteredBtnArr = [];

filterBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const clickedBtn = e.currentTarget.textContent;

    filterCatContainer.style.display = "flex";
    const filterBtnHTML = `<h4 class="btn">
            ${clickedBtn || ""}
            <button class="cross-btn">
              <img src="./images/icon-remove.svg" alt="Remove logo" />
            </button>
          </h4>`;

    filteredBtnArr.push(filterBtnHTML);

    filteredBtnArr = [...new Set(filteredBtnArr)];
    let uniqueBtnHTML;
    if (filteredBtnArr.length < 1) {
      return;
    } else {
      // filteredBtnArr.shift();
      for (uniqueBtn of filteredBtnArr) {
        // if (uniqueBtn) {
        //   return;
        // }
        uniqueBtnHTML += `${uniqueBtn}`;
      }
    }

    // const filteredBtns = document.querySelectorAll("#category h4");

    // for (btn of filteredBtns) {
    //   if (btn.textContent === clickedBtn) {
    //     console.log("I was entered");
    //     console.log("I was entered");
    //     return;
    //   }
    // }
    filteredCategory.innerHTML = uniqueBtnHTML;
  });
});

document.querySelector(".clear-btn").addEventListener("click", () => {
  filteredBtnArr = [];
  filteredCategory.innerHTML = "";
  filterCatContainer.style.display = "none";
});

const crossBtns = document.querySelectorAll(".btn .cross-btn");

crossBtns.forEach((crossBtn) => {
  crossBtn.addEventListener("click", (e) => {
    console.log(e.currentTarget.parent);
  });
});
