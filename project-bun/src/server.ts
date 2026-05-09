const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const products = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Mouse' }
];

const server = Bun.serve({
  port: 3001,

  fetch(request) {
    const startTime = Date.now();

    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    console.log(`[${new Date().toLocaleTimeString()}] ${method} ${path}`);

    let response: Response;

    if (path === '/' && method === 'GET') {
      response = new Response(
        '<h1>Halaman Utama Bun</h1><p>Selamat datang di server Bun dan TypeScript.</p>',
        {
          headers: { 'Content-Type': 'text/html' }
        }
      );
    }

    else if (path === '/about' && method === 'GET') {
      response = new Response(
        '<h1>Tentang Kami</h1><p>Ini adalah contoh routing manual menggunakan Bun dan TypeScript.</p>',
        {
          headers: { 'Content-Type': 'text/html' }
        }
      );
    }

    else if (path === '/api/users' && method === 'GET') {
      response = new Response(JSON.stringify(users), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    else if (path === '/api/users' && method === 'POST') {
      response = new Response(
        JSON.stringify({ message: 'User berhasil dibuat melalui Bun' }),
        {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    else if (path === '/products' && method === 'GET') {
      response = new Response(JSON.stringify(products), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    else if (path === '/products' && method === 'POST') {
      response = new Response(
        JSON.stringify({ message: 'Produk berhasil dibuat melalui Bun' }),
        {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    else if (path.startsWith('/users/') && method === 'GET') {
      const id = Number(path.split('/')[2]);
      const user = users.find((item) => item.id === id);

      if (user) {
        response = new Response(JSON.stringify(user), {
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        response = new Response(
          JSON.stringify({ message: 'User tidak ditemukan' }),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }
    }

    else {
      response = new Response(
        '<h1>404 - Halaman Tidak Ditemukan</h1><p>Route yang Anda akses tidak tersedia.</p>',
        {
          status: 404,
          headers: { 'Content-Type': 'text/html' }
        }
      );
    }

    const endTime = Date.now();
    console.log(`Lama eksekusi: ${endTime - startTime} ms`);

    return response;
  }
});

console.log(`Server Bun berjalan di http://localhost:${server.port}`);