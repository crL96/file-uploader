const router = require("express").Router();
const auth = require("../middleware/auth");
const fileController = require("../controllers/fileController");
const folderController = require("../controllers/folderController");

// Middleware
router.use(auth.checkAuthentication);
router.use("/:folderId", auth.checkFolderOwnership);

// Routes
router.get("/", folderController.storageRootGet);

router.get("/:folderId/upload", fileController.uploadGet);
router.post("/:folderId/upload", fileController.uploadPost);

router.get("/:folderId/rename-folder", folderController.renameFolderGet);
router.post("/:folderId/rename-folder", folderController.renameFolderPost);

router.get("/:folderId/delete-folder", folderController.deleteFolderGet);
router.post("/:folderId/delete-folder", folderController.deleteFolderPost);

router.get("/new-folder", folderController.newFolderGet);
router.post("/new-folder", folderController.newFolderPost);

router.get("/:folderId", folderController.openFolderGet);

module.exports = router;