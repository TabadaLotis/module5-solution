(function (global) {
  const dc = {};

  function insertHtml(selector, html) {
    document.querySelector(selector).innerHTML = html;
  }

  function insertProperty(string, propName, propValue) {
    const propToReplace = "{{" + propName + "}}";
    return string.replace(new RegExp(propToReplace, "g"), propValue);
  }

  function showLoading(selector) {
    const html = "<div>Loading...</div>";
    insertHtml(selector, html);
  }

  dc.loadHome = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest("snippets/home-snippet.html", function (homeHtml) {
      insertHtml("#main-content", homeHtml);
    }, false);
  };

  dc.loadMenuCategories = function () {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest($data.categoriesUrl, buildAndShowCategoriesHTML, true);
  };

  dc.loadMenuItems = function (categoryShort) {
    showLoading("#main-content");
    // Fix for correctly adding ".json" at the end to fetch menu items
    $ajaxUtils.sendGetRequest($data.menuItemsUrl + categoryShort + ".json",
      buildAndShowMenuItemsHTML,
      true);
  };

  function buildAndShowCategoriesHTML(categories) {
    let finalHtml = "<h2>Categories</h2><ul>";
    categories.forEach(function (category) {
      finalHtml += "<li>" + category.name + "</li>";
    });
    finalHtml += "</ul>";
    insertHtml("#main-content", finalHtml);
  }

  function buildAndShowMenuItemsHTML(menuItems) {
    let finalHtml = "<h2>Items</h2><ul>";
    menuItems.forEach(function (item) {
      finalHtml += "<li>" + item.name + "</li>";
    });
    finalHtml += "</ul>";
    insertHtml("#main-content", finalHtml);
  }

  global.$dc = dc;
})(window);
