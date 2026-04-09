(function (global) {
  const dc = {};

  // Helper function to insert HTML content into a given selector
  function insertHtml(selector, html) {
    document.querySelector(selector).innerHTML = html;
  }

  // Helper function to replace a property in a string with a value
  function insertProperty(string, propName, propValue) {
    const propToReplace = "{{" + propName + "}}";
    return string.replace(new RegExp(propToReplace, "g"), propValue);
  }

  // Show "Loading..." message in a given selector
  function showLoading(selector) {
    const html = "<div>Loading...</div>";
    insertHtml(selector, html);
  }

  // Function to load the home page
  dc.loadHome = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest("snippets/home-snippet.html", function (homeHtml) {
      insertHtml("#main-content", homeHtml);
    }, false);
  };

  // Function to load menu categories
  dc.loadMenuCategories = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest($data.categoriesUrl, buildAndShowCategoriesHTML, true);
  };

  // Function to load menu items for a given category
  dc.loadMenuItems = function (categoryShort) {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest($data.menuItemsUrl + categoryShort, buildAndShowMenuItemsHTML, true);
  };

  // Function to build the HTML and show categories on the page
  function buildAndShowCategoriesHTML(categories) {
    let finalHtml = "<h2>Categories</h2><ul>";
    for (let i = 0; i < categories.length; i++) {
      finalHtml += "<li>" + categories[i].name + "</li>";
    }
    finalHtml += "</ul>";
    insertHtml("#main-content", finalHtml);
  }

  // Function to build the HTML and show menu items on the page
  function buildAndShowMenuItemsHTML(menuItems) {
    if (!menuItems.menu_items) {
      console.error("menuItems.menu_items not found", menuItems);
      insertHtml("#main-content", "<div>No menu items found.</div>");
      return;
    }

    let finalHtml = "<h2>Items</h2><ul>";
    menuItems.menu_items.forEach(function (item) {
      finalHtml += "<li>" + item.name + "</li>";
    });
    finalHtml += "</ul>";
    insertHtml("#main-content", finalHtml);
  }

  // Expose the dc object globally
  global.$dc = dc;
})(window);
