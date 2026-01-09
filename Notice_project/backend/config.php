<?php
// Set error handling
error_reporting(E_ALL);
ini_set('display_errors', 0);
header('Content-Type: application/json');

// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'campus_chronicle');

// Create connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection
if ($conn->connect_error) {
    sendJSON(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
}

// Set charset to UTF-8
$conn->set_charset("utf8");

// Global function to send JSON response
function sendJSON($data) {
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

// Global function to generate JWT token
function generateToken($userId, $userType) {
    // Simple token generation (in production, use proper JWT)
    $token = bin2hex(random_bytes(32));
    return $token;
}

// Error handler for fatal errors
set_error_handler(function($errno, $errstr, $errfile, $errline) {
    sendJSON([
        'success' => false,
        'message' => 'Error: ' . $errstr,
        'file' => $errfile,
        'line' => $errline
    ]);
});
?>
