let useLocalStorage = true;

let storage = window.indexedDB.open("news", 1);
storage.onupgradeneeded = function() {
  let db = storage.result;
  let fansDB = db.createObjectStore("news-db", {
    keyPath: "email",
    autoIncrement: true
  });
  alert("hello");
};

storage.onsuccess = function() {
  let db = storage.result;
  let tx = db.transaction("news-db", "readwrite");
  let store = tx.objectStore("news-db");
};

function isOnline() {
  return window.navigator.onLine;
}

class StorageElement {
  constructor(title, email, text) {
    this.title = title;
    this.email = email;
    this.text = text;
  }
}

class LocalStorageElement extends StorageElement {
  constructor(title, email, text) {
    super(title, email, text);
  }

  setItem() {
    localStorage.setItem(localStorage.length + "news", JSON.stringify(this));
    newsList.append(
      "<div>" +
        "<li class='news-list-item'>" +
        "<div>" +
        this.title +
        "</div>" +
        "<div>" +
        this.email +
        "</div>" +
        "<div>" +
        this.text +
        "</div>" +
        "</li>" +
        "</div>"
    );
  }
}

class IndexedDBElement extends StorageElement {
  constructor(title, email, text) {
    super(title, email, text);
  }

  setItem() {
    let db = storage.result;
    let tx = db.transaction("news-db", "readwrite");
    let store = tx.objectStore("news-db");
    store.put(this);
  }
}

let newsList = $(".news-list");

$(".cta-button").click(function(e) {
  e.preventDefault();

  const textVal = $("#exampleFormControlTextarea1").val();
  const titleVal = $("#title-input").val();
  const emailVal = $("#exampleFormControlInput1").val();

  const emailRegEx = /([a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+)/;

  if (!emailVal) {
    alert("There is no email!");
  } else if (!emailVal.match(emailRegEx)) {
    alert("Wrong email!");
  } else if (!titleVal) {
    alert("There is no title!");
  } else if (!textVal) {
    alert("There is no text!");
  } else if (isOnline()) {
    let tempObj;
    if (useLocalStorage) {
      tempObj = new LocalStorageElement(titleVal, emailVal, textVal);
    } else {
      tempObj = new IndexedDBElement(titleVal, emailVal, textVal);
    }
    tempObj.setItem();
    $("#exampleFormControlTextarea1").val("");
    $("#exampleFormControlInput1").val("");
    alert("Success!");
  } else {
    console.log("hello");
  }
});
