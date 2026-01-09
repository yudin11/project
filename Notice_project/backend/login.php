<?php
header('Content-Type: application/json');
require_once 'config.php';

// Get raw input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if ($data === null && !empty($input)) {
    sendJSON(['success' => false, 'message' => 'Invalid JSON: ' . json_last_error_msg()]);
}

if (!$data) {
    sendJSON(['success' => false, 'message' => 'Invalid request']);
}

$userType = $data['userType'] ?? '';
$userId = $data['userId'] ?? '';
$password = $data['password'] ?? '';

if (empty($userType) || empty($userId) || empty($password)) {
    sendJSON(['success' => false, 'message' => 'All fields are required']);
}

// Sanitize inputs
$userType = htmlspecialchars($userType);
$userId = htmlspecialchars($userId);

// Query the database based on user type
$table = $userType === 'admin' ? 'admins' : 'students';

if ($userType === 'admin') {
    $sql = "SELECT id, full_name, user_id, password, user_type 
            FROM $table 
            WHERE user_id = ?";
} else {
    $sql = "SELECT id, full_name, user_id, password, user_type, faculty, semester 
            FROM $table 
            WHERE user_id = ?";
}

$stmt = $conn->prepare($sql);

if (!$stmt) {
    sendJSON(['success' => false, 'message' => 'Database error: ' . $conn->error]);
}

$stmt->bind_param('s', $userId);
if (!$stmt->execute()) {
    sendJSON(['success' => false, 'message' => 'Query error: ' . $stmt->error]);
}

$result = $stmt->get_result();

if ($result->num_rows === 0) {
    sendJSON(['success' => false, 'message' => 'User not found']);
}

$user = $result->fetch_assoc();

// Verify password
if (!password_verify($password, $user['password'])) {
    sendJSON(['success' => false, 'message' => 'Invalid password']);
}

// Generate token
$token = generateToken($user['id'], $userType);

// Return success response with user data
sendJSON([
    'success' => true,
    'message' => 'Login successful',
    'user' => [
        'id' => $user['id'],
        'userId' => $user['user_id'],
        'fullName' => $user['full_name'],
        'userType' => $user['user_type'],
        'faculty' => $user['faculty'] ?? '',
        'semester' => $user['semester'] ?? ''
    ],
    'token' => $token
]);

$stmt->close();
$conn->close();
?>
