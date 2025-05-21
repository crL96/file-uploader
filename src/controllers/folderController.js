const prisma = require("../config/prisma");

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
}