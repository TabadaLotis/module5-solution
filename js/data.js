(function (global) {
  const data = {};

  data.categoriesUrl =
    "https://davids-restaurant.herokuapp.com/categories.json";
  data.menuItemsUrl =
    "https://davids-restaurant.herokuapp.com/menu_items.json?category=";

  global.$data = data;
})(window);
