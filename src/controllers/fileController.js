const upload = require("../config/multer");
const prisma = require("../config/prisma");
require("dotenv").config();

function uploadGet(req, res) {
    res.render("upload-form", { folderId: req.params.folderId});
}

const uploadPost = [
    upload.single("uploadedFile"),

    async (req, res) => {
        try {
            await prisma.file.create({
                data: {
                    name: req.body.name,
                    storedName: req.file.filename,
                    path: req.file.path,
                    size: req.file.size,
                    userId: req.user.id,
                    folderId: Number(req.params.folderId)
                },
            });
            console.log("File added to database");
            res.redirect("/storage/folder/" + req.params.folderId);
        } catch (error) {
            console.log(error.message);
            res.redirect("/");
        }
    },
];

async function fileDetailsGet(req, res) {
    try {
        const file = await prisma.file.findUnique({
            where: { id: Number(req.params.fileId) },
        })
        res.render("file-details", { file: file });
    }
    catch (error) {
        console.log(error.message);
        res.redirect("/");
    }
}

async function fileDownloadGet(req, res) {
    try {
        const { path } = await prisma.file.findUnique({
            where: { id: Number(req.query.fileId) },
            select: { path: true },
        })
        res.sendFile(process.env.PROJECT_ROOT_ABS_PATH + path);
    }
    catch (error) {
        console.log(error.message);
        res.redirect("/");
    }
}

async function fileDeleteGet(req, res) {
    try {
        const file = await prisma.file.delete({
            where: { id: Number(req.query.fileId) }
        });
        console.log("File deleted, id: " + file.id);
        res.redirect("/storage/folder/" + file.folderId);
    }
    catch (error) {
        console.log(error.message);
        res.redirect("/");
    }
}

async function fileRenamePost(req, res) {
    try {
        const file = await prisma.file.update({
            where: { id: Number(req.query.fileId) },
            data: { name: req.body.name }
        });
        console.log("FileName updated, id: " + file.id);
        res.redirect("/storage/folder/" + file.folderId + "/" + file.id);
    }
    catch (error) {
        console.log(error.message);
        res.redirect("/");
    }
}

module.exports = {
    uploadGet,
    uploadPost,
    fileDetailsGet,
    fileDownloadGet,
    fileDeleteGet,
    fileRenamePost
};
