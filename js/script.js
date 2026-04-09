(function () {
  let allCategories = [];

  function getRandomCategoryShortName(categories) {
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex].short_name;
  }

  function chooseRandomCategory() {
    if (allCategories.length === 0) return;
    const randomCat = getRandomCategoryShortName(allCategories);
    $dc.loadMenuItems(randomCat);
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Load categories once and store them
    $ajaxUtils.sendGetRequest(
      $data.categoriesUrl,
      function (categories) {
        allCategories = categories;
      },
      true
    );

    // Load home page
    $dc.loadHome();
  });

  // Handle Specials click
  document.addEventListener("click", function (event) {
    if (event.target.id === "specials-tile") {
      event.preventDefault();
      chooseRandomCategory();
    }
  });
})();
