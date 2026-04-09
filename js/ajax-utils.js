(function (global) {
  const ajaxUtils = {};

  function getRequestObject() {
    if (window.XMLHttpRequest) {
      return new XMLHttpRequest();
    }
    throw new Error("Ajax is not supported!");
  }

  ajaxUtils.sendGetRequest = function (requestUrl, responseHandler, isJsonResponse) {
    const request = getRequestObject();
    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
        if (isJsonResponse) {
          responseHandler(JSON.parse(request.responseText));
        } else {
          responseHandler(request.responseText);
        }
      }
    };

    request.open("GET", requestUrl, true);
    request.send(null);
  };

  global.$ajaxUtils = ajaxUtils;
})(window);
