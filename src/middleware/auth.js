const prisma = require("../config/prisma");

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/log-in");
    }
}

async function checkFolderOwnership(req, res, next) {
    try {
        const { userId } = await prisma.folder.findUnique({
            where: { id: Number(req.params.folderId) },
            select: { userId: true },
        });
        if (req.isAuthenticated() && req.user.id === userId) {
            next();
        } else {
            res.redirect("/");
        }
    } catch (error) {
        console.log(error.message);
        res.redirect("/");
    }
}

module.exports = {
    checkAuthentication,
    checkFolderOwnership,
};
