(function (global) {
  const data = {};

  data.categoriesUrl =
    "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
  data.menuItemsUrl =
    "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/";

  global.$data = data;
})(window);
