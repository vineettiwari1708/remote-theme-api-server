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
$github_base = 'https://raw.githubusercontent.com/yourusername/your-repo/main/data/';

// STEP 4: Define asset filenames
$css_filename = 'styles.css';
$js_filename  = 'script.js';
$config_filename = 'config.json';

// STEP 5: Compose raw file URLs
$css_url = $github_base . $css_filename;
$js_url  = $github_base . $js_filename;
$config_url = $github_base . $config_filename;

// STEP 6: Fetch config.json content and encode safely for JS
$config_content = file_get_contents($config_url);
if ($config_content === false) {
    $config_content = '{}'; // fallback empty object if fetch fails
}

// Escape JSON for embedding in JS safely
$config_json_js = json_encode(json_decode($config_content));

// Optional logging
file_put_contents(__DIR__ . '/access.log', date('c') . " - $key - {$_SERVER['REMOTE_ADDR']}\n", FILE_APPEND);

// STEP 7: Output JS that injects the remote assets AND embeds config
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

    // Embed config.json as a global variable
    window.REMOTE_CONFIG = <?php echo $config_json_js; ?>;

    // Optional debug log
    console.log('Injected remote CSS, JS, and config.json for key: <?php echo $key; ?>');
})();
<?php
