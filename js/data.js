(function (global) {
  const data = {};

  data.categoriesUrl = "https://fake-restaurant-api.herokuapp.com/categories";
  data.menuItemsUrl = "https://fake-restaurant-api.herokuapp.com/menu-items?category=";

  global.$data = data;
})(window);
