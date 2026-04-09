(function (global) {
  const data = {};

  // Use this working API for categories and menu items
  data.categoriesUrl =
    "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
  data.menuItemsUrl =
    "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/";

  global.$data = data;
})(window);
