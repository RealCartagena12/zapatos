const Zapato = require('./models/Zapato');

export const createZapato = async (data) => {
    try {
    const { brand, model, size, color, price } = data;
    const stock = typeof data.stock === 'number' ? data.stock : 0;
    const tags = Array.isArray(data.tags) ? data.tags : [];
    const nuevo = await Zapato.create({ brand, model, size, color, price, stock, tags });
    return nuevo;
    } catch (error) {
        return null;
    }
};

