(function (global) {
  const data = {};

  const corsProxy = "https://cors-anywhere.herokuapp.com/";

  // Original API URLs (keeping them as is)
  data.categoriesUrl = "https://davids-restaurant.herokuapp.com/categories.json";
  data.menuItemsUrl = "https://davids-restaurant.herokuapp.com/menu_items.json?category=";

  // Prepending the CORS Proxy to the API URLs
  global.$data = data;
})(window);
