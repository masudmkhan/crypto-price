// Document Model
const coinList = document.getElementById("coinList");
const searchBar = document.getElementById("searchBar");
const alertMessage = document.getElementById("alert-message");
const searchWrapper = document.getElementById("searchWrapper");

const showSearchedData =  (value) => {
  const data = JSON.parse(window.localStorage.getItem("data"));
  const filter = filterData(data, value);
  renderTags(filter);
};

// Filter out the specific data
const filterData = (response, text) => {
  let matches = response.data.filter((elem) => {
    const regex = new RegExp(`^${text}`, "gi");
    return elem.name.match(regex) || elem.symbol.match(regex);
  });
  return matches;
};

// Generate HTML
const renderTags = (data) => {
  const htmlString = data
    .map((elem) => {
      return `
              <div class="character">
              <div class="name-price">
              <h2 id="currency-name">${elem.name}</h2>
              <p id="currency-price">$ ${elem.price_usd}</p>
              </div>
              <div class="rank">
              <p id="currency-rank">Rank #${elem.rank}</p>
              </div>
              </div>
              `;
    })
    .join("");
  coinList.innerHTML = htmlString;
};

// Display on screen
const displayOnScreen = () => {
  const coinData = JSON.parse(window.localStorage.getItem("data"));
  coinData ? renderTags(coinData.data) : alerts();
};

document.addEventListener("DOMContentLoaded", displayOnScreen);
searchBar.addEventListener("input", () => showSearchedData(searchBar.value));

const alerts = () =>{
  searchWrapper.style.display = "none";
  alertMessage.style.display = "block"
}