let newsList = $(".news-list");

if (window.navigator.onLine) {
  let length = localStorage.length;
  for (let i = 0; i < length; i++) {
    let tempItem = localStorage.getItem(i + "news");
    console.log(tempItem);
    if (tempItem) {
      tempItem = JSON.parse(tempItem);
      newsList.append(
        "<li class='news-list-item'>" +
          "<div class='news-list-item-content'>" +
          "<div class='item-data-text'>" +
          tempItem.title +
          "</div>" +
          "<div class='item-user-data'>" +
          "<div class='item-user-data-email'>" +
          tempItem.email +
          "</div>" +
          "<div class='item-user-data-text'>" +
          tempItem.text +
          "</div>" +
          "</div>" +
          "</div>" +
          "</li>"
      );
    }
  }

  for (let i = 0; i < length; i++) {
    let tempItem = localStorage.getItem(i + "news");
    if (tempItem) {
      localStorage.removeItem(i + "news");
      i--;
    }
  }
} else {
  $.ajax({
    url: "http://localhost:3000/news-routes",
    type: "GET",
    success: function(res) {
      console.log(res);
    }
  })();
}
