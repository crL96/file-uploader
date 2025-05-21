const router = require("express").Router();
const auth = require("../middleware/auth");
const fileController = require("../controllers/fileController");
const folderController = require("../controllers/folderController");

router.get("/", auth.checkAuthentication, folderController.storageRootGet);

router.get("/upload", auth.checkAuthentication, fileController.uploadGet);
router.post("/upload", auth.checkAuthentication, fileController.uploadPost);

router.get("/new-folder", auth.checkAuthentication, folderController.newFolderGet);
router.post("/new-folder", auth.checkAuthentication, folderController.newFolderPost);

router.get("/:folderId", auth.checkFolderOwnership, folderController.openFolderGet);

module.exports = router;