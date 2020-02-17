let useLocalStorage = true;

let storage = window.indexedDB.open("fans-feedback", 1);
storage.onupgradeneeded = function() {
  let db = storage.result;
  let fansDB = db.createObjectStore("fans-db", {
    keyPath: "email",
    autoIncrement: true
  });
  alert("hello");
};

storage.onsuccess = function() {
  let db = storage.result;
  let tx = db.transaction("fans-db", "readwrite");
  let store = tx.objectStore("fans-db");
};

function isOnline() {
  return window.navigator.onLine;
}

class StorageElement {
  constructor(email, text, date) {
    this.email = email;
    this.text = text;
    this.date = date;
  }
}

class LocalStorageElement extends StorageElement {
  constructor(email, text, date) {
    super(email, text, date);
  }

  setItem() {
    localStorage.setItem(localStorage.length + "fans", JSON.stringify(this));
    feedbackList.append(
      "<div>" +
        "<li class='fan-feedbacks-list-item'>" +
        "<div class='feedback-user-data-text'>" +
        this.text +
        "</div>" +
        "<div class='feedback-user-data'>" +
        "<div class='feedback-user-data-email'>" +
        this.email +
        "</div>" +
        "<div>" +
        this.date.getDate() +
        ":" +
        0 +
        (this.date.getMonth() + 1) +
        ":" +
        this.date.getFullYear() +
        "</div>" +
        "</div>" +
        "</li>" +
        "</div>"
    );
  }
}

class IndexedDBElement extends StorageElement {
  constructor(email, text, date) {
    super(email, text, date);
  }

  setItem() {
    let db = storage.result;
    let tx = db.transaction("fans-db", "readwrite");
    let store = tx.objectStore("fans-db");
    store.put(this);
  }
}

function drawLocal() {
  let length = localStorage.length;
  for (let i = 0; i < length; i++) {
    let tempItem = localStorage.getItem(i + "fans");
    if (tempItem) {
      tempItem = JSON.parse(tempItem);
      feedbackList.append(
        "<div>" +
          "<li class='fan-feedbacks-list-item'>" +
          "<div class='feedback-user-data-text'>" +
          tempItem.text +
          "</div>" +
          "<div class='feedback-user-data'>" +
          "<div class='feedback-user-data-email'>" +
          tempItem.email +
          "</div>" +
          "<div>" +
          tempItem.date +
          "</div>" +
          "</div>" +
          "</li>" +
          "</div>"
      );
    }
  }

  for (let i = 0; i < length; i++) {
    let tempItem = localStorage.getItem(i + "fans");
    if (tempItem) {
      localStorage.removeItem(i + "fans");
      i--;
    }
  }
}

let feedbackList = $(".fan-feedbacks-list");
let date = new Date();

if (isOnline()) {
  drawLocal();
}

$(".cta-button").click(function(e) {
  e.preventDefault();
  const textVal = $("#exampleFormControlTextarea1").val();
  const emailVal = $("#exampleFormControlInput1").val();

  const emailRegEx = /([a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+)/;

  if (!emailVal) {
    alert("There is no email!");
  } else if (!emailVal.match(emailRegEx)) {
    alert("Wrong email!");
  } else if (!textVal) {
    alert("There is no text!");
  } else if (isOnline()) {
    let tempObj;
    if (useLocalStorage) {
      tempObj = new LocalStorageElement(emailVal, textVal, date);
    } else {
      tempObj = new IndexedDBElement(emailVal, textVal, date);
    }

    tempObj.setItem();
    $("#exampleFormControlTextarea1").val("");
    $("#exampleFormControlInput1").val("");
  } else {
    $.ajax({
      url: "http://localhost:3000/fans-routes",
      data: JSON.parse({
        email: emailVal,
        text: textVal,
        date: date
      }),
      type: "POST",
      success: function(res) {
        console.log(res);
      }
    });
  }
});
