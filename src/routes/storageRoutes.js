const router = require("express").Router();
const checkAuthentication = require("../middleware/checkAuthentication");
const fileController = require("../controllers/fileController");
const folderController = require("../controllers/folderController");

router.get("/", checkAuthentication, folderController.storageRootGet);

router.get("/upload", checkAuthentication, fileController.uploadGet);
router.post("/upload", checkAuthentication, fileController.uploadPost);

router.get("/new-folder", checkAuthentication, folderController.newFolderGet);
router.post("/new-folder", checkAuthentication, folderController.newFolderPost);

module.exports = router;