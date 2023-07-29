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

  const userData = req.body;

  try {
    await client.connect();
    console.log('Conexión a la base de datos establecida.');

    const db = client.db(secrets.db.name);
    const collection = db.collection(secrets.db.col);

    const result = await collection.insertOne(userData);
    console.log('Usuario agregado correctamente:', result.insertedId);

    return res.status(200).json({ message: 'Usuario agregado correctamente.' });
  } catch (error) {
    console.error('Error al agregar el usuario:', error);
    return res.status(500).json({ error: 'Error al agregar el usuario.' });
  } finally {
    client.close();
  }
}
