// config/firebase-admin.ts

import admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

const serviceAccount = require('../src/serviceAccount.json') as ServiceAccount; // Ajusta la ruta si está en otra carpeta

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;
