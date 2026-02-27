import { app, BrowserWindow } from "electron";
import path, { dirname } from "node:path";
import { PGlite } from "@electric-sql/pglite";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");
};

app.whenReady().then(async () => {
  createWindow();

  console.log(" ------------ checkpoint A");
  const db = new PGlite();
  console.log(" ------------ checkpoint B");

  await db.exec(`
  CREATE TABLE IF NOT EXISTS todo (
    id SERIAL PRIMARY KEY,
    task TEXT,
    done BOOLEAN DEFAULT false
  );
  INSERT INTO todo (task, done) VALUES ('Install PGlite from NPM', true);
  INSERT INTO todo (task, done) VALUES ('Load PGlite', true);
  INSERT INTO todo (task, done) VALUES ('Create a table', true);
  INSERT INTO todo (task, done) VALUES ('Insert some data', true);
  INSERT INTO todo (task) VALUES ('Update a task');
  `);

  console.log(" ------------ checkpoint C");

  const ret = await db.query(`
  SELECT * from todo WHERE id = 1;
  `);

  console.log(" ------------ checkpoint D");
  console.log(ret.rows);
});
