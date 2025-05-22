const openModalBtn = document.querySelector("#openModalBtn");
const dialog = document.querySelector("#dialog");
const cancelBtn = document.querySelector("#cancelBtn");

openModalBtn.addEventListener("click", () => {
    dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    dialog.close();
});


// Delete dialog
const openDeleteDialogBtn = document.querySelector("#openDelteDialogBtn");
const deleteDialog = document.querySelector("#deleteDialog");
const cancelDeleteBtn = document.querySelector("#cancelDeleteBtn");

openDeleteDialogBtn.addEventListener("click", () => {
    deleteDialog.showModal();
});

cancelDeleteBtn.addEventListener("click", () => {
    deleteDialog.close();
});

const deleteForm = document.querySelector("#deleteForm");
deleteForm.addEventListener("submit", e => {
    const confirmInput = document.querySelector("#confirm");
    
    if (confirmInput.value !== "DELETE") {
        e.preventDefault();
        alert("Incorrect delete confirmation. Try again")
    }
});

