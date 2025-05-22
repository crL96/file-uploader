// Rename dialog
const openRenameDialogBtn = document.querySelector("#openRenameDialogBtn");
const renameDialog = document.querySelector("#renameDialog");
const cancelRenameBtn = document.querySelector("#cancelRenameBtn");

openRenameDialogBtn.addEventListener("click", () => {
    renameDialog.showModal();
});

cancelRenameBtn.addEventListener("click", () => {
    renameDialog.close();
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

