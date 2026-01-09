-- Campus Chronicle Database Schema

-- Create Database
CREATE DATABASE IF NOT EXISTS `campus_chronicle`;
USE `campus_chronicle`;

-- Students Table
CREATE TABLE `students` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` VARCHAR(50) NOT NULL UNIQUE,
  `full_name` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `user_type` VARCHAR(20) NOT NULL DEFAULT 'student',
  `faculty` VARCHAR(100) NOT NULL,
  `semester` VARCHAR(10),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admins Table
CREATE TABLE `admins` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` VARCHAR(50) NOT NULL UNIQUE,
  `full_name` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `user_type` VARCHAR(20) NOT NULL DEFAULT 'admin',
  `faculty` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Notices Table
CREATE TABLE `notices` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `faculty` VARCHAR(100) NOT NULL,
  `semester` VARCHAR(10) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_category` (`category`),
  INDEX `idx_faculty` (`faculty`),
  INDEX `idx_semester` (`semester`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample Data (Optional)
-- INSERT INTO students (user_id, full_name, password, faculty, semester) 
-- VALUES ('student1', 'John Doe', '$2y$10$...hashed_password...', 'Computer Science', '3rd');

-- INSERT INTO admins (user_id, full_name, password, faculty) 
-- VALUES ('admin1', 'Admin User', '$2y$10$...hashed_password...', 'Admin');

-- INSERT INTO notices (title, content, category, faculty, semester) 
-- VALUES ('Sample Notice', 'This is a sample notice', 'Announcement', 'All', 'All');
