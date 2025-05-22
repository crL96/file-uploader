const router = require("express").Router();
const auth = require("../middleware/auth");
const fileController = require("../controllers/fileController");
const folderController = require("../controllers/folderController");

// Middleware
router.use(auth.checkAuthentication);
router.use("/folder/:folderId", auth.checkFolderOwnership);

// Routes
router.get("/", folderController.storageRootGet);

router.post("/folder/:folderId/upload", fileController.uploadPost);

router.post("/folder/:folderId/rename-folder", folderController.renameFolderPost);

router.post("/folder/:folderId/delete-folder", folderController.deleteFolderPost);

router.get("/new-folder", folderController.newFolderGet);
router.post("/new-folder", folderController.newFolderPost);

router.get("/folder/:folderId", folderController.openFolderGet);

router.get("/folder/:folderId/:fileId", fileController.fileDetailsGet);

router.get("/download", auth.checkFileOwnership, fileController.fileDownloadGet);

router.post("/delete", auth.checkFileOwnership, fileController.fileDeletePost);

router.post("/rename-file", auth.checkFileOwnership, fileController.fileRenamePost);

module.exports = router;