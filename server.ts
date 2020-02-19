import App from './App';
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
dotenv.config();
import Api from './api'
import express, { Request, Response, NextFunction } from "express"


//function that will check all the passed .env variables are set
//if any is missing then it will terminate the server
((names) => {
    let shouldExit = false
    for (let i = 0; i < names.length; i++) {
        if (!process.env[names[i]]) {
            shouldExit = true
            console.log(`Missing ${names[i]} in .env`)
        }
    }
    if (shouldExit) {
        console.log('****************** Server Terminates ******************')
        process.exit(0)
    }
})([
    'DB_URL',
    'BASE_URL', 
    'PORT',
    'SERVER_NAME',
    // 'EMAIL_HOST',
    // 'EMAIL_USERNAME',
    // 'EMAIL_PASSWORD',
    // 'EMAIL_SENDER'
    // AUTH_SECRET
])




const app = new App()

app.initializeApp([
    //middlewares
    morgan('dev'),
    bodyParser.json()
], [
    //routes
    { path: '/api', requestHandler: Api },
    // {path: '/uploads',requestHandler: express.static(__dirname + '/uploads')},
    // {path: '/*', requestHandler: function(req: Request, res: Response, next: NextFunction){
    //     res.sendFile(__dirname + '/reactBuild/index.html');
    //   }}
])


app.listen(parseInt(process.env.PORT || '5000'))
console.log(`${process.env.SERVER_NAME} Server Started on Port ${process.env.PORT}`)