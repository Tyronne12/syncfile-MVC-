const express = require('express');
const router = express.Router();
const controller = require("../controllers/userController");

router.get("/", controller.index);
router.post("/api/upload", controller.uploadFile);
router.post("/api/data", controller.fetchData);
router.get("/api/user", controller.fetchUserData);
router.get("/api/logout", controller.logoutUser);
router.get("/api/folders", controller.fetchFolder);
router.post("/api/folders", controller.postFolder);
router.post('/api/register', controller.registerUser);
router.post('/api/upload', controller.uploadFile);
router.get('/api/download/:fileName', controller.downloadFile);
router.get('/api/data', controller.fetchFileData);
router.post('/api/taskcreate', controller.createtask);
router.get('/api/users', controller.fetchAllUsers);
router.get('/api/task', controller.fetchTask);
router.post('/api/changesettings', controller.updateUserProfile);
router.post('/api/task2', controller.fetchTaskData);
router.delete('/api/folders/:folderId', controller.deleteFolder);


module.exports = router;
