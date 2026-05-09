import * as http from 'node:http';

const PORT = 3000;

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const products = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Mouse' }
];

const server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    const startTime = Date.now();

    const url = req.url || '/';
    const method = req.method || 'GET';

    console.log(`[${new Date().toLocaleTimeString()}] ${method} ${url}`);

    if (url === '/' && method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <h1>Halaman Utama</h1>
        <p>Selamat datang di server Node.js dan TypeScript.</p>
      `);
    }

    else if (url === '/about' && method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <h1>Tentang Kami</h1>
        <p>Ini adalah contoh routing manual sederhana menggunakan Node.js dan TypeScript.</p>
      `);
    }

    else if (url === '/api/users' && method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(users));
    }

    else if (url === '/api/users' && method === 'POST') {
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        message: 'User berhasil dibuat melalui Node.js'
      }));
    }

    else if (url === '/products' && method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(products));
    }

    else if (url === '/products' && method === 'POST') {
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        message: 'Produk berhasil dibuat melalui Node.js'
      }));
    }

    else if (url.startsWith('/users/') && method === 'GET') {
      const id = Number(url.split('/')[2]);
      const user = users.find((item) => item.id === id);

      if (user) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          message: 'User tidak ditemukan'
        }));
      }
    }

    else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(`
        <h1>404 - Halaman Tidak Ditemukan</h1>
        <p>Route yang Anda akses tidak tersedia.</p>
      `);
    }

    const endTime = Date.now();
    console.log(`Lama eksekusi: ${endTime - startTime} ms`);
  }
);

server.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});