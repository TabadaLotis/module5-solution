(function () {
  let allCategories = [];  // Holds all categories after they're loaded

  // Function to select a random category from the categories list
  function getRandomCategoryShortName(categories) {
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex].short_name;
  }

  // Function that is called when the "Specials" tile is clicked
  function chooseRandomCategory() {
    if (allCategories.length === 0) {
      console.error("Categories are still loading! Please try again in a moment.");
      return;
    }

    const randomCategoryShortName = getRandomCategoryShortName(allCategories);
    $dc.loadMenuItems(randomCategoryShortName);  // Load the menu items for the random category
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Load the categories first
    $ajaxUtils.sendGetRequest(
      $data.categoriesUrl,
      function (categories) {
        allCategories = categories;  // Store the categories once they're fetched

        // Once categories are loaded, set up the "Specials" tile click handler
        const specialsTile = document.querySelector("#specials-tile");

        if (specialsTile) {
          specialsTile.addEventListener("click", function (event) {
            event.preventDefault();  // Prevent default link behavior
            chooseRandomCategory();  // Trigger the random category function
          });
        } else {
          console.error("Specials tile not found!");
        }
      },
      true
    );

    // Load the home page with the categories (even before we click specials)
    $dc.loadHome();
  });

  // Handle Specials tile click reliably using closest()
  document.addEventListener("click", function (event) {
    const tile = event.target.closest("#specials-tile");  // Ensures click inside the tile works

    if (tile) {
      event.preventDefault();  // Prevents the default link behavior
      chooseRandomCategory();  // Trigger the random category function
    }
  });
})();
