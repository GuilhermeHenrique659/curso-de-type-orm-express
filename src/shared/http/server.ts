import 'reflect-metadata'
import 'dotenv/config'

import { connection } from '@shared/typeorm';
import app from './app';

connection.initialize().then( () => {
    const server = app.listen(3333, () => {
        console.log("Server start in port 3333!");
    })
})

