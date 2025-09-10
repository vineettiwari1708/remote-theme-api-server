<?php
header('Content-Type: application/javascript');
header("Access-Control-Allow-Origin: *");

// STEP 1: Allowed license keys
$valid_keys = ['demo-key-123', 'client-key-456'];
$key = $_GET['key'] ?? '';

if (!in_array($key, $valid_keys)) {
    http_response_code(403);
    echo "console.error('Invalid API key');";
    exit;
}

// STEP 2: GitHub raw base URL (change to your repo)
$github_base = 'https://raw.githubusercontent.com/yourusername/your-repo/main/data/';

// STEP 3: Asset file names
$css_url    = $github_base . 'styles.css';
$js_url     = $github_base . 'script.js';
$config_url = $github_base . 'config.json';

// STEP 4: Optional logging
file_put_contents(__DIR__ . '/access.log', date('c') . " | Key: $key | IP: " . $_SERVER['REMOTE_ADDR'] . "\n", FILE_APPEND);

// STEP 5: Output JavaScript
?>
(function () {
    // Inject CSS
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '<?php echo $css_url; ?>';
    document.head.appendChild(link);

    // Inject JS
    var script = document.createElement('script');
    script.src = '<?php echo $js_url; ?>';
    document.body.appendChild(script);

    // Load config.json via fetch
    fetch('<?php echo $config_url; ?>')
        .then(function (response) {
            if (!response.ok) throw new Error("Config fetch failed");
            return response.json();
        })
        .then(function (config) {
            window.RemoteConfig = config;
            console.log("Remote config loaded:", config);

            // Example: display message from config
            if (config.message) {
                var msgBox = document.createElement('div');
                msgBox.style = "background:#222;color:#fff;padding:10px;text-align:center;";
                msgBox.textContent = config.message;
                document.body.prepend(msgBox);
            }
        })
        .catch(function (err) {
            console.warn("Could not load config.json:", err);
        });
})();
<?php
