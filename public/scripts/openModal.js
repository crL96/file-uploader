const openModalBtn = document.querySelector("#openModalBtn");
const dialog = document.querySelector("#dialog");
const cancelBtn = document.querySelector("#cancelBtn");

openModalBtn.addEventListener("click", () => {
    dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    dialog.close();
});
