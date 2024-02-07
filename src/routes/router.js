const router = require('express').Router()
const multer = require('../middlewares/multer')
const control = require('../controllers/controller')


// const jwt = require('../middlewares/jwt')
// const multer = require('../middlewares/multer')

router.get("/", (req, res) => {
    res.status(200).json({Message: "Bem vindo !"})
})

router.post("/createPlan", control.createPlan)
router.get("/getPlans", control.getPlans)
router.post("/updatePlan", control.updatePlan)

router.post("/createDoc", multer.upload.single("file"), control.createDoc)
router.get("/getDocs", control.getDocs)
router.post("/updateDoc", multer.upload.single("file"), control.updateDoc)

module.exports = router