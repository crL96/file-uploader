const upload = require("../config/multer");
const prisma = require("../config/prisma");

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
            res.redirect("/storage/" + req.params.folderId);
        } catch (error) {
            console.log(error.message);
            res.redirect("/");
        }
    },
];

module.exports = {
    uploadGet,
    uploadPost,
};
