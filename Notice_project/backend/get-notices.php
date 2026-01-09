<?php
header('Content-Type: application/json');
require_once 'config.php';

$sql = "SELECT id, title, content, category, faculty, semester, created_at as date 
        FROM notices 
        ORDER BY created_at DESC";

$result = $conn->query($sql);

if (!$result) {
    sendJSON(['success' => false, 'message' => 'Database error: ' . $conn->error]);
}

$notices = [];
while ($row = $result->fetch_assoc()) {
    $notices[] = $row;
}

sendJSON([
    'success' => true,
    'notices' => $notices
]);

$conn->close();
?>
