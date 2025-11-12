
const router = require('express').Router();

const {
        healthCheck, 
        createZapato,
        getZapatos,
        getZapatoById,
        updateZapato,
        deleteZapato,
 } = require("../controllers/zapato.controller");


router.get('/', healthCheck);
router.post('/zapatos', createZapato);
router.get('/zapatos', getZapatos);
router.get('/zapatos/:id', getZapatoById);
router.put('/zapatos/:id', updateZapato);
router.delete('/zapatos/:id', deleteZapato);

module.exports = router;
