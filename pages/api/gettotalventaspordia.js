// pages/api/gettotalventaspordia.js

import { MongoClient } from 'mongodb';

const secrets = {
  db: {
    name: 'challenge',
    protocol: 'mongodb+srv',
    host: 'cluster0.ks6wx2e.mongodb.net',
    user: 'ofuentesm4',
    password: 'eduardo123',
    col: 'ventas',
  },
};

const uri = `${secrets.db.protocol}://${secrets.db.user}:${secrets.db.password}@${secrets.db.host}/${secrets.db.name}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    await client.connect();
    console.log('Conexión a la base de datos establecida.');

    const db = client.db(secrets.db.name);
    const collection = db.collection(secrets.db.col);

    // Perform the aggregation to get the total sales per day
    const totalVentasPorDia = await collection
      .aggregate([
        {
          $project: {
            servicio: 1,
            fecha: {
              $dateFromString: {
                dateString: '$fecha',
                format: '%m-%d-%Y',
              },
            },
          },
        },
        {
          $group: {
            _id: '$fecha',
            total: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } }, // Sort the results by date in ascending order
      ])
      .toArray();

    console.log('Total de ventas por día:', totalVentasPorDia);

    // Get the list of unique services
    const uniqueServices = Array.from(new Set(totalVentasPorDia.map((item) => item.servicio)));

    return res.status(200).json({ totalVentasPorDia, uniqueServices });
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
    return res.status(500).json({ error: 'Error al obtener las ventas.' });
  } finally {
    client.close();
  }
}
