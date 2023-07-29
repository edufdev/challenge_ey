import { MongoClient } from 'mongodb';

const secrets = {
  db: {
    name: 'challenge',
    protocol: 'mongodb+srv',
    host: 'cluster0.ks6wx2e.mongodb.net',
    user: 'ofuentesm4',
    password: 'eduardo123',
    col: 'usuarios',
  },
};

const uri = `${secrets.db.protocol}://${secrets.db.user}:${secrets.db.password}@${secrets.db.host}/${secrets.db.name}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { email, newUsername, newPassword } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Correo electrónico no proporcionado' });
    }

    await client.connect();
    const db = client.db(secrets.db.name);
    const collection = db.collection(secrets.db.col);

    // Primero, verifica si el usuario existe en la base de datos
    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualiza el nombre de usuario si se proporcionó uno nuevo
    if (newUsername) {
      await collection.updateOne({ email }, { $set: { name: newUsername } });
    }

    // Actualiza la contraseña si se proporcionó una nueva
    if (newPassword) {
      await collection.updateOne({ email }, { $set: { password: newPassword } });
    }

    return res.status(200).json({ message: 'Datos actualizados correctamente' });
  } catch (error) {
    console.error('Error al actualizar los datos del usuario:', error);
    return res.status(500).json({ error: 'Error al actualizar los datos del usuario' });
  } finally {
    client.close();
  }
}
