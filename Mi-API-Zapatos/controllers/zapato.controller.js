import { createZapato } from "../services/zapato.service";


//mensaje de salud
app.get('/no', (req,res) => {
  res.json({ ok:true, message:'API Zapatos OK' });
});


// Endpoint para crear un zapato
app.post('/zapatos', async (req, res) => { 
   const zapato= createZapato(req.body);
    if (zapato!==null) { 
    return res.status(201).json({ ok: true, data: zapato });
  } else {
    error= new Error('Error creando el zapato');
    return res.status(400).json({ ok: false, error: error.message });
  }
});


//obtener todos los zapatos
app.get('/zapatos', async (req, res) => {
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
});



// Endpoint para obtener un zapato por su ID
app.get('/zapatos/:id', async (req, res) => {
  try {
    const item = await Zapato.findById(req.params.id);
    if (!item) return res.status(404).json({ ok:false, error:'No encontrado' });
    return res.json({ ok:true, data:item });
  } catch (error) {
    return res.status(400).json({ ok:false, error:error.message });
  }
});

// Endpoint para actualizar un zapato
app.put('/zapatos/:id', async (req, res) => {
  try {
    const update = req.body;
    const item = await Zapato.findByIdAndUpdate(req.params.id, update, { new:true, runValidators:true });
    if (!item) return res.status(404).json({ ok:false, error:'No encontrado' });
    return res.json({ ok:true, data:item });
  } catch (error) {
    return res.status(400).json({ ok:false, error:error.message });
  }
});


// 🗑️ DELETE /zapatos/:id → Elimina un zapato por su id
app.delete('/zapatos/:id', async (req, res) => {
  try {
    const item = await Zapato.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ ok:false, error:'No encontrado' });
    return res.json({ ok:true, data:item });
  } catch (error) {
    return res.status(400).json({ ok:false, error:error.message });
  }
});