import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';

const secrets = {
  db: {
    name: 'challenge',
    protocol: 'mongodb+srv',
    host: 'cluster0.ks6wx2e.mongodb.net',
    user: 'ofuentesm4',
    password: 'eduardo123',
    col: 'usuarios',
  },
  jwtSecret: 'your_secret_key_here', // Reemplaza 'your_secret_key_here' con una clave secreta segura
  jwtExpiration: '1h', // Tiempo de expiración del token, por ejemplo: '1h' para 1 hora, '7d' para 7 días, etc.
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

  const { email, password } = req.body;

  try {
    await client.connect();
    console.log('Conexión a la base de datos establecida.');

    const db = client.db(secrets.db.name);
    const collection = db.collection(secrets.db.col);

    const user = await collection.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar el token JWT
    const token = jwt.sign({ email: user.email }, secrets.jwtSecret, { expiresIn: secrets.jwtExpiration });
    

    return res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return res.status(500).json({ error: 'Error al iniciar sesión.' });
  } finally {
    client.close();
  }
}
