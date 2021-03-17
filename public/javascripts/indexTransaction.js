const select = document.querySelector("select");
let selectCategory = select.id.substring(3);

target = document.getElementById(`${selectCategory}`);
console.log(target.id);
target.selected = true;
