const searchInput = document.getElementById("search-input")

const showSearchResult = () => {
  let searchWord = searchInput.value;
  console.log(searchWord)
  window.location.href = `https://www.google.com/search?q=${searchWord}`
  searchWord = "";
}

searchInput.addEventListener("keypress", (event) => {
  if (event.code === "Enter") showSearchResult();
})