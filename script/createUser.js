import bcrypt from 'bcrypt';
import { User } from './models/index.js';

const createUser = async () => {
    const motDePasse = '12345678?';
    const motDePasseHash = await bcrypt.hash(motDePasse, 10);

    await User.create({
        nom: 'Amira',
        email: 'amira.chouaref@gmail.com',
        motDePasse: motDePasseHash,
        RoleId: 1,
    });

    console.log('Utilisateur créé avec succès');
};

createUser();
