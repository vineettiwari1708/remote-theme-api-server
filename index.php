<?php
header("Access-Control-Allow-Origin: *");

$valid_keys = ['demo-key-123', 'customer-key-456'];
$key = $_GET['key'] ?? '';
$asset = basename($_SERVER['REQUEST_URI']);

if (!in_array($key, $valid_keys)) {
    http_response_code(403);
    echo 'Invalid API key';
    exit;
}

if (strpos($asset, 'styles.css') !== false) {
    header('Content-Type: text/css');
    readfile(__DIR__ . '/data/styles.css');
    exit;
}

if (strpos($asset, 'script.js') !== false) {
    header('Content-Type: application/javascript');
    readfile(__DIR__ . '/data/script.js');
    exit;
}

if (strpos($asset, 'config') !== false || strpos($asset, 'data') !== false) {
    header('Content-Type: application/json');
    echo file_get_contents(__DIR__ . '/data/config.json');
    exit;
}

http_response_code(404);
echo 'Not Found';
