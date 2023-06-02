import express from 'express';
import fs from 'fs';

const DEFAULT_PORT = 3000;

const app = express();

app.get('/', async (req, res) => {
  res.write('<h1>Welcome</h1>');

  try {
    const data = await fs.promises.readFile('package.json', 'utf8');
    const jsonData = JSON.parse(data);
    res.write('<h2>JSON text:</h2>');
    res.write(`<pre>${JSON.stringify(jsonData, null, 2)}</pre>`);
  } catch (err) {
    console.error(err);
  } finally {
    res.end();
  }
});

const port = process.env.PORT || DEFAULT_PORT;
if (process.env.NODE_ENV === 'development') {
  console.log('development mode');
} else {
  console.log('production mode');
}

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port} in ${process.env.NODE_ENV} mode`);
});
