import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from "cors";
import { conectaDatabase } from './database/database.js';
import { usuarioRota } from './app/routes/usuarioRota.js';



const app = express();
app.use(express.json());
app.use(cors());

const porta = process.env.PORT;
app.use('/api/usuarios', usuarioRota);


conectaDatabase()
.then(() => {
    app.listen(porta, () => {
        console.log(`Servidor rodando na porta http://localhost:${porta}`);
    });
})
.catch((erro) => {
    console.log(erro);
    console.log('Erro ao conectar-se com o servidor!');
});
 

