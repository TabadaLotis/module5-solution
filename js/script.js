(function () {
  let allCategories = [];

  function getRandomCategoryShortName(categories) {
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex].short_name;
  }

  function chooseRandomCategory() {
    if (allCategories.length === 0) {
      console.error("Categories are still loading!");
      return;
    }
    const randomCat = getRandomCategoryShortName(allCategories);
    $dc.loadMenuItems(randomCat);
  }

  document.addEventListener("DOMContentLoaded", function () {
    // First, load categories
    $ajaxUtils.sendGetRequest(
      $data.categoriesUrl,
      function (categories) {
        allCategories = categories;

        // Once categories are loaded, set up the "Specials" tile click handler
        const specialsTile = document.querySelector("#specials-tile");

        if (specialsTile) {
          specialsTile.addEventListener("click", function (event) {
            event.preventDefault();
            chooseRandomCategory();  // Call random category selection
          });
        } else {
          console.error("Specials tile not found!");
        }
      },
      true
    );

    // Also load home page when the DOM is ready
    $dc.loadHome();
  });
})();
