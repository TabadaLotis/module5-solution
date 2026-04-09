(function () {
  let allCategories = [];

  // Function to select a random category from the loaded categories
  function getRandomCategoryShortName(categories) {
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex].short_name;
  }

  // Function that triggers when the "Specials" tile is clicked
  function chooseRandomCategory() {
    if (allCategories.length === 0) {
      console.error("Categories not loaded yet. Please try clicking again.");
      return;
    }

    const randomCategoryShortName = getRandomCategoryShortName(allCategories);
    $dc.loadMenuItems(randomCategoryShortName);
  }

  // Wait for the DOM to be ready, and then load categories and set up event listeners
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Loading categories...");

    // Fetch the categories from the API
    $ajaxUtils.sendGetRequest(
      $data.categoriesUrl,
      function (categories) {
        allCategories = categories; // Store the categories once they are loaded
        console.log("Categories loaded successfully:", allCategories);

        // Once categories are loaded, enable the Specials tile functionality
        const specialsTile = document.querySelector("#specials-tile");

        if (specialsTile) {
          specialsTile.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default behavior of the link
            console.log("Specials tile clicked!");
            chooseRandomCategory();
          });
        } else {
          console.error("Specials tile not found!");
        }
      },
      true // Indicating that the response should be JSON
    );

    // Load home page with categories (just as initial state)
    $dc.loadHome();
  });

  // Make sure we correctly handle the click event on the Specials tile
  document.addEventListener("click", function (event) {
    const tile = event.target.closest("#specials-tile");

    if (tile) {
      event.preventDefault(); // Prevent default link behavior
      console.log("Specials tile clicked via event listener!");
      chooseRandomCategory();
    }
  });
})();
