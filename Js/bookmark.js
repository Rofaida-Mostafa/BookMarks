let inputName = document.querySelector("#bookmark_Name");
let inputUrl = document.querySelector("#bookmark_URL");
let button = document.querySelector("#Btn");
let table = document.querySelector("#tableContent");
let closeBtn = document.querySelector("#closeBtn");

button.addEventListener("click", () => {
  add();
});

let bookmarkArray = [];
if (localStorage.getItem("bookmarks") != null) {
  bookmarkArray = JSON.parse(localStorage.getItem("bookmarks"));
  display();
}

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (Add Product) xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//
function add() {
  if (validateData()) {
    let bookmarks = {
      name: capitalize(inputName.value),
      url: inputUrl.value,
    };
    bookmarkArray.push(bookmarks);
    inputUrl.classList.remove("is-valid");
    inputUrl.classList.remove("is-invalid");
    inputName.classList.remove("is-invalid");
    inputName.classList.remove("is-valid");
    dataChanges();
    clearForm();
  } else {
    errorAlert();
  }
}

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (Display Product) xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//

function display() {
  let x = " ";

  for (let i = 0; i < bookmarkArray.length; i++) {
    x += ` <tr class="  text-center">  
        <td class=" p-3">${i + 1}</td>
        <td class="text-black  p-3">${bookmarkArray[i].name}</td>
        <td> <a href="${
          bookmarkArray[i].url
        }" target="_blank" class="btn btn-visit text-white">   
        <i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
    
        <td> <button onclick="deleting(${i})" class="btn delete text-white">
        <i class="fa-solid fa-trash-can"></i> Delete</button> </td></tr>`;
  }
  table.innerHTML = x;
}
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (Data Changes) xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//
function dataChanges() {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkArray));
  display();
}

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (delete Item) xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//

function deleting(index) {
  bookmarkArray.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkArray));
  display();
}
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (close btn) xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//

closeBtn.addEventListener("click", () => {
  let closing = document.querySelector(".alert-box");
  close.classList.add("d-none");
});

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (capitalize) xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//

function capitalize(word) {
  let wordSplitting = word.split("");
  wordSplitting[0] = wordSplitting[0].toUpperCase();
  return wordSplitting.join("");
}

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (clear Form) xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//

function clearForm() {
  inputName.value = "";
  inputUrl.value = "";
}

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (input Validate) xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//

function validateData() {
  return (
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(
      inputUrl.value
    ) && /^\w{3,}(\s+\w+)*$/.test(inputName.value)
  );
}

let close = document.querySelector(".alert-box");
function errorAlert() {
  if (
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(
      inputUrl.value
    ) &&
    /^\w{3,}(\s+\w+)*$/.test(inputName.value)
  ) {
    close.classList.add("d-none");
    close.classList.remove("d-block");
  } else {
    close.classList.add("d-block");
    close.classList.remove("d-none");
  }
}
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (class Validate) xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//

inputName.addEventListener("input", () => {
  if (/^\w{3,}(\s+\w+)*$/.test(inputName.value)) {
    inputName.classList.add("is-valid");
    inputName.classList.remove("is-invalid");
  } else {
    inputName.classList.add("is-invalid");
    inputName.classList.remove("is-valid");
  }
});

inputUrl.addEventListener("keyup", () => {
  if (
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(
      inputUrl.value
    )
  ) {
    inputUrl.classList.add("is-valid");
    inputUrl.classList.remove("is-invalid");
  } else {
    inputUrl.classList.add("is-invalid");
    inputUrl.classList.remove("is-valid");
  }
});
