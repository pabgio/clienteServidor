import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';


const app = express();
app.use(express.json());
const user = process.env.DB_USER;
const senha = process.env.DB_PASS;
const porta = process.env.PORT;
 

mongoose
    .connect(
        `mongodb+srv://${user}:${senha}@cluster0.qmltksy.mongodb.net/?retryWrites=true&w=majority`).then(() => {
        app.listen(porta, () => {
            console.log(`Servidor rodando na porta http://localhost:${porta}`);
        });
    })
    .catch((erro) => {
        console.log(erro);
        console.log('Erro ao conectar-se com o servidor!');
    });