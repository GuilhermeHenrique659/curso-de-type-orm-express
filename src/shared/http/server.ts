import { connection } from '@shared/typeorm';
import 'reflect-metadata'
import app from './app';

connection.initialize().then( () => {
    const server = app.listen(3333, () => {
        console.log("Server start in port 3333!");
    })
})

