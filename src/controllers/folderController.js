const prisma = require("../config/prisma");

async function storageRootGet(req, res) {
    const folders = await prisma.folder.findMany({
        where: { userId: req.user.id}
    })

    res.render("storage-root", { folders: folders })
}

module.exports = {
    storageRootGet
}