const fieldset = document.querySelector("fieldset");
fieldsetid = fieldset.id.substring(3);

target = document.getElementById(`${fieldsetid}`);
target.checked = true;
