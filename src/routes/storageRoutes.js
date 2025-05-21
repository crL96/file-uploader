const router = require("express").Router();
const auth = require("../middleware/auth");
const fileController = require("../controllers/fileController");
const folderController = require("../controllers/folderController");

router.get("/", auth.checkAuthentication, folderController.storageRootGet);

router.get("/:folderId/upload", auth.checkFolderOwnership, fileController.uploadGet);
router.post("/:folderId/upload", auth.checkFolderOwnership, fileController.uploadPost);

router.get("/:folderId/rename-folder", auth.checkFolderOwnership, folderController.renameFolderGet);
router.post("/:folderId/rename-folder", auth.checkFolderOwnership, folderController.renameFolderPost);

router.get("/new-folder", auth.checkAuthentication, folderController.newFolderGet);
router.post("/new-folder", auth.checkAuthentication, folderController.newFolderPost);

router.get("/:folderId", auth.checkFolderOwnership, folderController.openFolderGet);

module.exports = router;