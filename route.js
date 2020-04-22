const router = require("express").Router();
const scrapper = require("./scrapper");

router.get("/", scrapper);
router.get("/stats", scrapper);
router.get("/regione", scrapper);
router.get("/province", scrapper);

module.exports = router;
