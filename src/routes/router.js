const router = require('express').Router()
const jwt = require('../middlewares/jwt')
const control = require('../controllers/controller')


// const jwt = require('../middlewares/jwt')
// const multer = require('../middlewares/multer')

router.get("/", (req, res) => {
    res.status(200).json({ Message: "Bem vindo !" })
})


router.post("/login", control.login)
router.post("/createUser", control.createUser)
router.post("/editUser", control.editUser) // ! vou ver se uso ainda

router.post("/createPlan", jwt.verifyToken, control.createPlan)
router.get("/getPlans", jwt.verifyToken, control.getPlans)
router.put("/updatePlan", jwt.verifyToken, control.updatePlan)
router.post("/deleteIten", jwt.verifyToken, control.deleteIten)

router.post("/createTerm", jwt.verifyToken, control.createTerm)
router.get("/getTerms", jwt.verifyToken, control.getTerms)
router.post("/updateTerm", jwt.verifyToken, control.updateTerm)

router.get("/getRamais", jwt.verifyToken, control.getRamais)
router.post("/createRamal", jwt.verifyToken, control.createRamal)
router.post("/updateRamal", jwt.verifyToken, control.updateRamal)

router.get("/getSites", jwt.verifyToken, control.getSites)
router.post("/createSite", jwt.verifyToken, control.createSite)
router.put("/updateSite", jwt.verifyToken, control.updadeSite)

router.get("/getDoctor", jwt.verifyToken, control.getDoctor)
router.post("/createDoctor", jwt.verifyToken, control.createDoctor)
router.put("/updateDoctor", jwt.verifyToken, control.updateDoctor)


module.exports = router