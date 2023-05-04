import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();


export const conectaDatabase = async () => {
    try {
        // const user = process.env.DB_USER;
        // const senha = process.env.DB_PASS;
        //const porta = process.env.PORT;
        await mongoose.connect(
            `mongodb://localhost:27017`,
        );
        console.log('Conectado ao banco de dados!');
    } catch (erro) {
        console.log(erro);
        console.log('Erro ao conectar-se com o servidor!');
        setTimeout (conectaDatabase, 5000);
    }
};