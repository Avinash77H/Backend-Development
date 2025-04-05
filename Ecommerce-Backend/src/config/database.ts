import "reflect-metadata";
import {DataSource} from 'typeorm'
import * as dotenv from 'dotenv'

dotenv.config();

export const AppDataSource = new DataSource({
  type:'postgres',
  host:'localhost',
  port:Number(process.env.DB_PORT || "8888"),
  username:process.env.DB_USERNAME,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME,
  synchronize:true,
  logging:false,
  entities:["./src/entity/**/*.ts"],
  subscribers: []
})