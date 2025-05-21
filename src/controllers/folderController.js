const prisma = require("../config/prisma");
const { body, validationResult } = require("express-validator");

async function storageRootGet(req, res) {
    const folders = await prisma.folder.findMany({
        where: { userId: req.user.id}
    })

    res.render("storage-root", { folders: folders })
}

async function newFolderPost(req, res) {
    try {
        await prisma.folder.create({
            data: {
                name: req.body.name,
                userId: req.user.id,
            }
        })
        console.log("New folder created for user with id: " + req.user.id);
        res.redirect("/storage");
    } catch (error) {
        console.log(error.message);
        res.redirect("/");
    }
}

function newFolderGet(req, res) {
    res.render("new-folder");
}

function renameFolderGet(req, res) {
    res.render("rename-folder", { folderId: req.params.folderId });
}

async function renameFolderPost(req, res) {
    try {
        await prisma.folder.update({
            where: { id: Number(req.params.folderId) },
            data: { name: req.body.name }
        })
        res.redirect("/storage/" + req.params.folderId);
    } catch (error) {
        console.log(error.message);
        res.redirect("/");
    }
}

function deleteFolderGet(req, res) {
    res.render("delete-folder", {folderId: req.params.folderId });
}

const validateDeleteFolder = [
    body("confirm").custom(value => {
        return (value === "DELETE")
    }).withMessage("Incorrect delete confirmation")
]

const deleteFolderPost = [
    validateDeleteFolder,

    async (req, res) => {
        try {
            //Check if validation passed
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).render("delete-folder", {
                    errors: errors.array(),
                    folderId: req.params.folderId,
                });
            }

            const deleteFilesInFolder = prisma.file.deleteMany({
                where: { folderId: Number(req.params.folderId) }
            })
            const deleteFolder = prisma.folder.delete({
                where: { id: Number(req.params.folderId) }
            })
            await prisma.$transaction([deleteFilesInFolder, deleteFolder]);
            console.log(deleteFilesInFolder);
            console.log((deleteFolder));
            res.redirect("/storage");
        } catch (error) {
            console.log(error.message);
            res.redirect("/");
        }
    }

];

async function openFolderGet(req, res) {
    try {
        const folder = await prisma.folder.findUnique({
            where: { id: Number(req.params.folderId) },
            include: { files: true }
        })
        res.render("storage-folder", { folder: folder });
    } catch (error) {
        console.log(error.message);
        res.redirect("/");
    }
}

module.exports = {
    storageRootGet,
    newFolderGet,
    newFolderPost,
    openFolderGet,
    renameFolderGet,
    renameFolderPost,
    deleteFolderGet,
    deleteFolderPost
}