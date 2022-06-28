const express = require('express');
const router = express.Router();
const multer = require('multer');
const moment = require('moment');
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/images/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}_${moment()}_${file.originalname}.jpg`);
  },
});

const upload = multer({ storage });

const menuController = require('./../controllers/menu.controllor');

const cpUpload = upload.single('fileData');

router.post('/save', menuController.save);

router.post('/upload', cpUpload, menuController.uploadMenuPhoto);

router.get('/', menuController.findAll);

router.get('/subset', menuController.findAllSubSet);

router.get('/sales', menuController.findAllSale);

router.get('/:id', menuController.findOne);

router.delete('/delete/:id', menuController.destroy);

router.put('/favorite/:id/:fav', menuController.addFavorite);

module.exports = router;
