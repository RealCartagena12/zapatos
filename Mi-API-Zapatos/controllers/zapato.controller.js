const Zapato = require('../models/Zapato.js');


// Endpoint de health 
const healthCheck = (req, res) => {
  try {
  res.json({ ok: true, message: 'API de Zapatos funcionando correctamente' });
}catch (error) {
  res.status(500).json({ ok: false, error: error.message });
}
};

//Crear Zapato
const createZapato = async (req, res) => {
  try {
    const zapato = await Zapato.create(req.body);
    res.status(201).json({ ok: true, data: zapato });
  }catch (error) {
    res.status(400).json({ ok: false, error: error.message });
  }
};  


// obtener todos los zapatos 
const getZapatos = async (req, res) => {
  try {
    const { brand, model, color, size, minPrice, maxPrice } = req.query;
    const q = {};
    console.log(req.query);
    if (brand) q.brand = new RegExp(`^${brand}`, 'i');
    if (model) q.model = new RegExp(model, 'i');
    if (color) q.color = new RegExp(color, 'i');
    if (size)  q.size  = Number(size);
    if (minPrice || maxPrice) q.price = {};
    if (minPrice) q.price.$gte = Number(minPrice);
    if (maxPrice) q.price.$lte = Number(maxPrice);

    const items = await Zapato.find(q).sort({ createdAt: -1 }).limit(100);
    return res.json({ ok: true, data: items });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
};


// Endpoint para obtener un zapato por su ID
const getZapatoById = async (req, res) => {
  try{
     const item = await Zapato.findById(req.params.id);
    if (!item) return res.status(404).json({ ok:false, error:'No encontrado' });
    return res.json({ ok:true, data:item });
  } catch (error) {
    return res.status(400).json({ ok:false, error:error.message });
  }
};




// Endpoint para actualizar un zapato
const updateZapato = async (req, res) => {
  try {
    const item = await Zapato.findByIdAndUpdate(req.params.id, req.body , 
      { new:true, runValidators:true });
    if (!item) return res.status(404).json({ ok:false, error:'No encontrado' });
    res.json({ ok:true, data:item });
  }catch (error) {
    res.status(400).json({ ok:false, error:error.message });
  }
};


// 🗑️ DELETE /zapatos/:id → Elimina un zapato por su id
const deleteZapato = async (req, res) => {
  try {
    const item = await Zapato.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ ok:false, error:'No encontrado' });
    return res.json({ ok:true, data:item });
  } catch (error) {
    return res.status(400).json({ ok:false, error:error.message });
  }
};

module.exports = {
  healthCheck,
  createZapato,
  getZapatos,
  getZapatoById,
  updateZapato,
  deleteZapato
};