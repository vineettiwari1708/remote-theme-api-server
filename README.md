# Remote Theme API Server

This is a lightweight PHP server to power remote-controlled WordPress themes via an API key.

## 🔐 Usage

Your WordPress theme sends requests like:

https://yourserver.com/styles.css?key=YOUR_KEY

https://yourserver.com/script.js?key=YOUR_KEY

https://yourserver.com/config.json?key=YOUR_KEY


## 📂 Folder Structure

- `index.php`: Routes incoming requests based on file name and `key`
- `data/`: Stores assets like CSS, JS, JSON
- `.gitignore`: Ignores unnecessary files
- `LICENSE`: MIT License or your choice

## ✅ Valid Keys

Edit `index.php` and add your own API keys to `$valid_keys`.

## 🧪 Example

```html
<link rel="stylesheet" href="https://yourserver.com/styles.css?key=demo-key-123">
<script src="https://yourserver.com/script.js?key=demo-key-123"></script>
