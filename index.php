<?php
// Set correct headers
header('Content-Type: application/javascript');
header("Access-Control-Allow-Origin: *");

// STEP 1: Define your allowed license keys
$valid_keys = [
    'demo-key-123',
    'client-key-456',
    // Add more keys as needed
];

// STEP 2: Get the key from the URL
$key = $_GET['key'] ?? '';

if (!in_array($key, $valid_keys)) {
    http_response_code(403);
    echo "console.error('Invalid API key');";
    exit;
}

// STEP 3: GitHub raw file base URL
// Replace this with your own GitHub repo and branch
$github_base = 'https://raw.githubusercontent.com/yourusername/your-repo/main/';

// STEP 4: Define asset filenames
$css_filename = 'styles.css';
$js_filename  = 'script.js';

// STEP 5: Compose raw file URLs
$css_url = $github_base . $css_filename;
$js_url  = $github_base . $js_filename;

// Optional logging
file_put_contents(__DIR__ . '/access.log', date('c') . " - $key - {$_SERVER['REMOTE_ADDR']}\n", FILE_APPEND);

// STEP 6: Output JS that injects the remote assets
?>
(function () {
    // Inject remote CSS
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = '<?php echo $css_url; ?>';
    document.head.appendChild(css);

    // Inject remote JS
    var js = document.createElement('script');
    js.src = '<?php echo $js_url; ?>';
    document.body.appendChild(js);

    // Optional debug log
    console.log('Injected remote CSS/JS from GitHub for key: <?php echo $key; ?>');
})();
<?php

