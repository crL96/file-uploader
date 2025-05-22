const upload = require("../config/multer");
const prisma = require("../config/prisma");
require("dotenv").config();
const cloudinary = require("../config/cloudinary");
const http = require("http");
const { body, validationResult } = require("express-validator");

function uploadGet(req, res) {
    res.render("upload-form", { folderId: req.params.folderId});
}

const validateUpload = [
    body("uploadedFile").custom((value, { req }) => {
        const maxSize = 1 * 1024 * 1024; //10MB

        if (req.file.size > maxSize) return false;
        return true;
    }).withMessage("File size exceeds 10 MB. Please select a smaller file")
]

const uploadPost = [
    upload.single("uploadedFile"),
    validateUpload,

    async (req, res) => {
        //Check if validation passed
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("upload-form", {
                errors: errors.array(),
                folderId: req.params.folderId,
            });
        }

        cloudinary.uploader
            .upload_stream(
                {
                    // Options
                    resource_type: "raw",
                    public_id: req.file.originalname,
                    folder: "file-uploader/"+ req.user.id + "/" + req.params.folderId,
                },
                // Callback
                async (error, response) => {
                    try {
                        if (error) throw error;

                        await prisma.file.create({
                            data: {
                                name: req.file.originalname,
                                storedName: response.display_name,
                                path: response.url,
                                size: req.file.size,
                                userId: req.user.id,
                                folderId: Number(req.params.folderId),
                            },
                        });
                        console.log("File uploaded to cloud and added to database");
                        res.redirect("/storage/folder/" + req.params.folderId);
                    } catch (error) {
                        console.log(error.message);
                        res.redirect("/");
                    }
                }
            )
            .end(req.file.buffer);
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
        const { path, storedName } = await prisma.file.findUnique({
            where: { id: Number(req.query.fileId) },
            select: { path: true, storedName: true },
        })
        const externalReq = http.request(path, function(externalRes) {
            res.setHeader("content-disposition", "attachment; filename=" + storedName );
            externalRes.pipe(res);
        });
        externalReq.end();
    }
    catch (error) {
        console.log(error.message);
        res.redirect("/");
    }
}

async function fileDeletePost(req, res) {
    try {
        const file = await prisma.file.delete({
            where: { id: Number(req.query.fileId) }
        });

        cloudinary.uploader.destroy(`file-uploader/${file.userId}/${file.folderId}/${file.storedName}`, { resource_type: "raw" });

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
    fileDeletePost,
    fileRenamePost
};
