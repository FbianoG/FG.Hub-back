const router = require('express').Router()
const multer = require('../middlewares/multer')
const control = require('../controllers/controller')


// const jwt = require('../middlewares/jwt')
// const multer = require('../middlewares/multer')

router.get("/", (req, res) => {
    res.status(200).json({ Message: "Bem vindo !" })
})
router.get("/a", (req, res) => {
    res.status(200).json({ Message: "página 2" })
})

router.post("/createPlan", control.createPlan)
// router.get("/getPlans", control.getPlans)
router.get("/getPlans", async (req, res) => {
    try {
        let plans = await Planos.find({})
        if (plans.length == 0) {
            return res.status(200).json({ message: "Não há planos cadastrados no DataBase!" })
        }
        return res.status(200).json(plans)
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar planos!' });
    }
})
router.post("/updatePlan", control.updatePlan)

router.post("/createDoc", multer.upload.single("file"), control.createDoc)
router.get("/getDocs", control.getDocs)
router.post("/updateDoc", multer.upload.single("file"), control.updateDoc)

module.exports = router