(function () {
  let allCategories = [];

  function getRandomCategoryShortName(categories) {
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex].short_name;
  }

  $dc.loadMenuCategories = function () {
    $ajaxUtils.sendGetRequest(
      $data.categoriesUrl,
      function (categories) {
        allCategories = categories;
        $dc.loadHome(); // load home with categories stored
      },
      true
    );
  };

  document.addEventListener("click", function (event) {
    if (event.target.id === "specials-tile") {
      if (allCategories.length === 0) return;
      const randomCat = getRandomCategoryShortName(allCategories);
      $dc.loadMenuItems(randomCat);
    }
  });

  // Load home on page load
  document.addEventListener("DOMContentLoaded", $dc.loadMenuCategories);
})();
