import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import excuteQuery from './db';
import moment from 'moment';

export async function createUser({ pseudo, email, password }) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex');
    const user = {
        id: uuidv4(),
        createdAt: moment().format( 'YYYY-MM-DD HH:mm:ss'),
        pseudo,
        email,
        hash,
        salt,
    };

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO users (id, createdAt, pseudo, email, hash, salt) VALUES(?, ?, ?, ?, ?, ?)',
            values: [user.id, user.createdAt.toString(), user.pseudo, user.email, user.hash, user.salt],
        });
        console.log( result );
    } catch ( error ) {
        console.log( error );
    }
    console.log(user);
    return user;
}

// Here you should lookup for the user in your DB
export async function findUser({ email, pseudo }) {
    try {
        const result = await excuteQuery({
            query: 'SELECT * FROM users WHERE email = ? AND pseudo = ?',
            values: [ email, pseudo ],
        });
        console.log(result[0]);
        return result[0];
        
    } catch (error) {
        console.log(error);
    }
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export async function validatePassword(user, inputPassword) {
    const inputHash = crypto
        .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
        .toString('hex');
    const passwordsMatch = user.hash === inputHash;
    return passwordsMatch;
}
