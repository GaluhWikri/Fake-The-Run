require('dotenv').config();
const express = require('express');
const midtransClient = require('midtrans-client');
const cors = require('cors');

const app = express();
const port = 3001; // Port untuk backend

app.use(cors());
app.use(express.json());

// Inisialisasi Midtrans Snap
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

// Server key is loaded from .env file

// Endpoint untuk membuat transaksi
app.post('/api/create-transaction', async (req, res) => {
  try {
    const { route_name } = req.body;
    const transaction_details = {
      order_id: `gpx-download-${Date.now()}`,
      gross_amount: 10000, // Harga Rp 10.000
    };

    const item_details = [{
      id: `gpx-${Date.now()}`,
      price: 10000,
      quantity: 1,
      name: route_name || 'GPX File Download',
    }];

    const transaction = await snap.createTransaction({
      transaction_details,
      item_details,
    });

    res.json({ token: transaction.token });

  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
