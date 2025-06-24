import express, { Application } from 'express';
import authRouter from './routes/auth.routes';
import cors from 'cors'
import profileRouter from './routes/profile.routes';
import folderRouter from './routes/folder.routes';
import notesRouter from './routes/notes.routes';
import swaggerUi from 'swagger-ui-express';
import fs from "fs"
import YAML from "yaml"

const app: Application = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true}))

const swaggerFile:any = fs.readFileSync('./src/config/swaggerDocs.yaml', 'utf8');
const swaggerDocument = YAML.parse(swaggerFile);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/folder', folderRouter);
app.use('/api/note', notesRouter);

app.get('/', (req, res) => {
  res.send('Notes App API is running!');
});

export default app;
