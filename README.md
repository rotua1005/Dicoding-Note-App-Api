<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Submission: Integrasi Notes App dengan RESTful API</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            color: #333;
        }

        header {
            background-color: #007bff;
            color: #fff;
            padding: 20px;
            text-align: center;
        }

        h1 {
            font-size: 2em;
            margin-bottom: 20px;
        }

        section {
            padding: 20px;
            margin: 20px auto;
            max-width: 800px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
            font-size: 1.5em;
            margin-bottom: 15px;
            color: #007bff;
        }

        ul {
            list-style-type: disc;
            margin-left: 20px;
        }

        code {
            background-color: #f8f9fa;
            padding: 2px 5px;
            border-radius: 3px;
            font-family: Consolas, monospace;
        }

        a {
            color: #007bff;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <header>
        <h1>Submission: Integrasi Notes App dengan RESTful API</h1>
    </header>
    <section>
        <h2>Kriteria</h2>
        <ol>
            <li><strong>Pertahankan Kriteria Submission Sebelumnya:</strong> Pastikan proyek yang telah Anda bangun masih memenuhi seluruh kriteria dari submission sebelumnya.</li>
            <li><strong>Memanfaatkan RESTful API sebagai Sumber Data:</strong> Aplikasi harus memanfaatkan RESTful API yang telah kami sediakan sebagai sumber data. RESTful API yang digunakan adalah <a href="https://notes-api.dicoding.dev/v2" target="_blank" rel="noopener noreferrer">notes-api.dicoding.dev/v2</a>.</li>
            <li><strong>Menggunakan webpack sebagai Module Bundler:</strong> Pengembangan aplikasi Notes App harus menggunakan webpack sebagai module bundler.</li>
            <li><strong>Menggunakan Fetch API:</strong> Menggunakan Fetch API untuk melakukan Asynchronous JavaScript Request dalam berinteraksi dengan API.</li>
            <li><strong>Memiliki Indikator Loading:</strong> Anda diwajibkan untuk menampilkan indikator loading saat melakukan proses request HTTP dalam menunggu hasilnya.</li>
        </ol>
    </section>
    <section>
        <h2>Run Server</h2>
        <ol>
            <li>First, install webpack-dev-server by running the following command:
                <pre><code>npm install webpack-dev-server --save-dev</code></pre>
            </li>
            <li>After installing webpack-dev-server, start the server by running:
                <pre><code>npm run start-dev</code></pre>
            </li>
            <li>Once the server is running, you can access your project at <a href="http://localhost:8080/" target="_blank" rel="noopener noreferrer">http://localhost:8080/</a></li>
        </ol>
    </section>
    <footer>
        <p>Author: Rotua Eka Wati Br. Sitorus</p>
    </footer>
</body>
</html>
