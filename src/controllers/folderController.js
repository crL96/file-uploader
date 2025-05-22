const prisma = require("../config/prisma");
const cloudinary = require("../config/cloudinary");

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
        res.redirect("/storage/folder/" + req.params.folderId);
    } catch (error) {
        console.log(error.message);
        res.redirect("/");
    }
}

async function deleteFolderPost(req, res) {
        try {
            const deleteFilesInFolder = prisma.file.deleteMany({
                where: { folderId: Number(req.params.folderId) },
            });
            const deleteFolder = prisma.folder.delete({
                where: { id: Number(req.params.folderId) },
            });

            //Delete records in database
            await prisma.$transaction([deleteFilesInFolder, deleteFolder]);
            res.redirect("/storage");

            //Delete all files in folder
            await cloudinary.api.delete_resources_by_prefix(
                `file-uploader/${req.user.id}/${req.params.folderId}`,
                { resource_type: "raw" }
            );
            //Deletes the empty folder (cant delete non-empty folders)
            await cloudinary.api.delete_folder(
                `file-uploader/${req.user.id}/${req.params.folderId}`,
                { resource_type: "raw" }
            );
            console.log("Deleted folder and its files");
        } catch (error) {
            console.log(error.message);
            res.redirect("/");
        }
    }

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
    deleteFolderPost
}