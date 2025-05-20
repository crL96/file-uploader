const upload = require("../config/multer");
const prisma = require("../config/prisma");

function uploadGet(req, res) {
    res.render("upload-form");
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
                },
            });
            console.log("File added to database");
            res.redirect("/");
        } catch (error) {
            console.log(error.message);
            res.redirect("/upload");
        }
    },
];

module.exports = {
    uploadGet,
    uploadPost,
};
