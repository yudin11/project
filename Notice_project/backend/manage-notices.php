<?php
header('Content-Type: application/json');
require_once 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    sendJSON(['success' => false, 'message' => 'Invalid request']);
}

$method = $data['method'] ?? '';
$title = $data['title'] ?? '';
$content = $data['content'] ?? '';
$category = $data['category'] ?? '';
$faculty = $data['faculty'] ?? '';
$semester = $data['semester'] ?? '';
$id = $data['id'] ?? null;

if ($method === 'CREATE') {
    if (empty($title) || empty($content) || empty($category) || empty($faculty) || empty($semester)) {
        sendJSON(['success' => false, 'message' => 'All fields are required']);
    }

    // Sanitize inputs
    $title = htmlspecialchars($title);
    $content = htmlspecialchars($content);
    $category = htmlspecialchars($category);
    $faculty = htmlspecialchars($faculty);
    $semester = htmlspecialchars($semester);

    $sql = "INSERT INTO notices (title, content, category, faculty, semester) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        sendJSON(['success' => false, 'message' => 'Database error: ' . $conn->error]);
    }

    $stmt->bind_param('sssss', $title, $content, $category, $faculty, $semester);
    
    if (!$stmt->execute()) {
        sendJSON(['success' => false, 'message' => 'Failed to create notice']);
    }

    sendJSON(['success' => true, 'message' => 'Notice created successfully']);
    
} elseif ($method === 'UPDATE') {
    if (!$id || empty($title) || empty($content) || empty($category)) {
        sendJSON(['success' => false, 'message' => 'Missing required fields']);
    }

    // Sanitize inputs
    $title = htmlspecialchars($title);
    $content = htmlspecialchars($content);
    $category = htmlspecialchars($category);
    $faculty = htmlspecialchars($faculty);
    $semester = htmlspecialchars($semester);

    $sql = "UPDATE notices SET title = ?, content = ?, category = ?, faculty = ?, semester = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        sendJSON(['success' => false, 'message' => 'Database error: ' . $conn->error]);
    }

    $stmt->bind_param('sssssi', $title, $content, $category, $faculty, $semester, $id);
    
    if (!$stmt->execute()) {
        sendJSON(['success' => false, 'message' => 'Failed to update notice']);
    }

    sendJSON(['success' => true, 'message' => 'Notice updated successfully']);
    
} elseif ($method === 'DELETE') {
    if (!$id) {
        sendJSON(['success' => false, 'message' => 'Notice ID is required']);
    }

    $sql = "DELETE FROM notices WHERE id = ?";
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        sendJSON(['success' => false, 'message' => 'Database error: ' . $conn->error]);
    }

    $stmt->bind_param('i', $id);
    
    if (!$stmt->execute()) {
        sendJSON(['success' => false, 'message' => 'Failed to delete notice']);
    }

    sendJSON(['success' => true, 'message' => 'Notice deleted successfully']);
    
} else {
    sendJSON(['success' => false, 'message' => 'Invalid method']);
}

$stmt->close();
$conn->close();
?>
