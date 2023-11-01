const inputbox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");

const myBtn = document.getElementById("myBtn");

const alertInfo = document.getElementById("alertInfo");
alertInfo.classList.add("hide");

function addTask() {
  let i = 1;
  if (inputbox.value === "") {
    alertInfo.classList.remove("hide");
    myBtn.addEventListener("click", function () {
      i += 1;
      if (i == 2) {
        alertInfo.classList.add("anim");
        i = 0;
        console.log(i);
        setTimeout(() => {
          if (i == 0) {
            alertInfo.classList.remove("anim");
          }
          console.log("World!");
        }, 500);
      }
    });
  } else {
    myBtn.addEventListener("click", function () {
      i = 0;
      alertInfo.classList.remove("anim");
    });

    alertInfo.classList.add("hide");

    listcontainer.classList.remove("hide");
    const li = document.createElement("li");
    li.innerHTML = inputbox.value;
    listcontainer.appendChild(li);
    const span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    saveData();
  }
  inputbox.value = "";
}

function saveData() {
  const tasks = Array.from(listcontainer.querySelectorAll("li"));
  const data = tasks.map((task) => task.outerHTML).join("");
  localStorage.setItem("data", data);

  const manyList = document.querySelectorAll("li").length;
  localStorage.setItem("numList", manyList);
}

function showTask() {
  const data = localStorage.getItem("data");
  const numList = localStorage.getItem("numList");
  if (data) {
    listcontainer.innerHTML = data;
    listcontainer.classList.remove("hide");
  } else if (numList == 0) {
    console.log("list kosong");
    listcontainer.classList.add("hide");
  }
}
showTask();

listcontainer.addEventListener("click", function (e) {
  saveData();
  const numList = localStorage.getItem("numList");
  console.log(numList);
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    console.log("list terhapus");
    saveData();
    if (numList == 1) {
      console.log("list kosong");
      listcontainer.classList.add("hide");
    }
  }
});
