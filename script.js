let allCategories = [];

function getRandomCategoryShortName(categories) {
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex].short_name;
}
$dc.loadMenuCategories = function () {
  $ajaxUtils.sendGetRequest(
    "https://davids-restaurant.herokuapp.com/categories.json",
    function (categories) {
      allCategories = categories;
    }
  );
};

function loadRandomSpecialCategory() {
  if (allCategories.length === 0) {
    console.error("Categories not loaded yet!");
    return;
  }
  const randomCategoryShortName = getRandomCategoryShortName(allCategories);
  $dc.loadMenuItems(randomCategoryShortName);
}

document.addEventListener("DOMContentLoaded", function () {
  $dc.loadMenuCategories();

  const specialsTile = document.querySelector("#specials-tile");
  const specialsTileFallback = document.querySelectorAll(".tile")[1];
  const tileToUse = specialsTile || specialsTileFallback;

  if (tileToUse) {
    tileToUse.addEventListener("click", function (event) {
      event.preventDefault();
      loadRandomSpecialCategory();
    });
  } else {
    console.error("Specials tile not found!");
  }
});
