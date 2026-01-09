# Installation & Setup Guide

## System Requirements

- **PHP**: Version 7.0 or higher
- **MySQL**: Version 5.7 or higher  
- **Server**: Apache, Nginx, or IIS
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)

## Installation Methods

### Method 1: Using Apache/Nginx (Recommended)

#### Step 1: Place Files
```
htdocs/ (Apache root)
├── campus-chronicle-simple/
    ├── index.html
    ├── admin-dashboard.html
    ├── student-dashboard.html
    ├── signup.html
    ├── css/
    ├── js/
    └── php/
```

#### Step 2: Create Database
```bash
# Using MySQL command line
mysql -u root -p < php/database-schema.sql

# Or in phpMyAdmin:
# 1. Create new database "campus_chronicle"
# 2. Execute contents of php/database-schema.sql
```

#### Step 3: Configure Connection
Edit `php/config.php`:
```php
define('DB_HOST', 'localhost');     // Your MySQL server
define('DB_USER', 'root');          // MySQL username
define('DB_PASS', 'password');      // MySQL password
define('DB_NAME', 'campus_chronicle');
```

#### Step 4: Insert Test Data (Optional)
```bash
mysql -u root -p campus_chronicle < php/sample-data.sql

# Or execute in phpMyAdmin > SQL tab
```

#### Step 5: Access Application
```
http://localhost/campus-chronicle-simple/
```

---

### Method 2: Using PHP Built-in Server

#### Step 1: Create Database
```bash
mysql -u root -p < php/database-schema.sql
mysql -u root -p campus_chronicle < php/sample-data.sql
```

#### Step 2: Configure Database
Edit `php/config.php` with your MySQL credentials

#### Step 3: Start Server
```bash
# Navigate to project directory
cd campus-chronicle-simple

# Start PHP server
php -S localhost:8000

# Server will run at http://localhost:8000
```

#### Step 4: Access Application
```
http://localhost:8000
```

---

### Method 3: Using Docker (Advanced)

#### Step 1: Create Dockerfile
```dockerfile
FROM php:7.4-apache
RUN docker-php-ext-install mysqli
RUN a2enmod rewrite
COPY . /var/www/html
WORKDIR /var/www/html
```

#### Step 2: Create docker-compose.yml
```yaml
version: '3'
services:
  web:
    build: .
    ports:
      - "8000:80"
    volumes:
      - .:/var/www/html
    links:
      - db
  db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: campus_chronicle
    ports:
      - "3306:3306"
    volumes:
      - ./php/database-schema.sql:/docker-entrypoint-initdb.d/init.sql
```

#### Step 3: Run Docker
```bash
docker-compose up -d
# Access: http://localhost:8000
```

---

## Database Setup Details

### Creating Database Manually

#### Using phpMyAdmin:
1. Open phpMyAdmin (usually at http://localhost/phpmyadmin)
2. Click "New" to create new database
3. Database name: `campus_chronicle`
4. Click "Create"
5. Select database, go to "SQL" tab
6. Copy-paste contents of `php/database-schema.sql`
7. Click "Go"
8. Optionally add test data from `php/sample-data.sql`

#### Using MySQL Command Line:
```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE campus_chronicle;
USE campus_chronicle;

# Copy-paste contents of php/database-schema.sql
# Then exit
exit
```

#### Using File Import:
```bash
# Single command
mysql -u root -p campus_chronicle < /path/to/database-schema.sql

# Add sample data
mysql -u root -p campus_chronicle < /path/to/sample-data.sql
```

### Database Structure

**students table:**
```
id (primary key)
user_id (unique)
full_name
password (hashed)
user_type
faculty
semester
created_at
updated_at
```

**admins table:**
```
id (primary key)
user_id (unique)
full_name
password (hashed)
user_type
faculty
created_at
updated_at
```

**notices table:**
```
id (primary key)
title
content
category
faculty
semester
created_at
updated_at
```

---

## Configuration Details

### php/config.php

```php
define('DB_HOST', 'localhost');     // Database host
define('DB_USER', 'root');          // Database username
define('DB_PASS', '');              // Database password (empty if none)
define('DB_NAME', 'campus_chronicle'); // Database name
```

**Common Database Hosts:**
- `localhost` - Same machine
- `127.0.0.1` - Localhost IP
- `db` - Docker container name
- `hostname.com` - Remote server

---

## User Setup

### Add Student Account

Via phpMyAdmin SQL tab:
```sql
INSERT INTO students (user_id, full_name, password, faculty, semester) 
VALUES (
  'newstudent',
  'Student Name',
  '$2y$10$slYQmyNdGzin7olVg.KfeOzTJP8/pPFSDKCwK8f0j6DvOOJL6vRhO',
  'Computer Science',
  '3rd'
);
```

**Note:** The password hash above is for "student123"

### Add Admin Account

```sql
INSERT INTO admins (user_id, full_name, password, faculty) 
VALUES (
  'newadmin',
  'Admin Name',
  '$2y$10$slYQmyNdGzin7olVg.KfeOzTJP8/pPFSDKCwK8f0j6DvOOJL6vRhO',
  'Computer Science'
);
```

### Generate Password Hashes

Create `hash.php`:
```php
<?php
echo password_hash('your-password', PASSWORD_DEFAULT);
?>
```

Run: `php hash.php` and use the output in INSERT statements

---

## Testing the Installation

### 1. Verify Database Connection
Create `test-db.php`:
```php
<?php
require_once 'php/config.php';
if ($conn->connect_error) {
    echo "Connection failed: " . $conn->connect_error;
} else {
    echo "Database connected successfully!";
}
?>
```

Access: `http://localhost/campus-chronicle-simple/test-db.php`

### 2. Test Login
1. Navigate to `http://localhost/campus-chronicle-simple/`
2. Enter test credentials:
   - ID: student1
   - Password: student123
   - Role: Student
3. Click Login
4. Should redirect to student-dashboard.html

### 3. Test Student Features
- View notices
- Filter by category
- Filter by faculty
- Filter by semester
- View notice details
- Logout

### 4. Test Admin Features
1. Login as admin
   - ID: admin1
   - Password: admin123
   - Role: Admin
2. Create new notice
3. Edit notice
4. Delete notice
5. Verify in database

### 5. Test Signup
1. Navigate to signup.html
2. Create new student account
3. Try to login with new account
4. Verify in database

---

## Troubleshooting

### Error: "Database connection failed"

**Cause:** MySQL not running or wrong credentials

**Solution:**
```bash
# Check MySQL status
# On Windows:
sc query MySQL80

# On Linux:
sudo systemctl status mysql

# Start MySQL:
# On Windows:
net start MySQL80

# On Linux:
sudo systemctl start mysql
```

### Error: "Table doesn't exist"

**Cause:** Database schema not imported

**Solution:**
```bash
mysql -u root -p campus_chronicle < php/database-schema.sql
```

### Error: "CORS error" or "Mixed content"

**Cause:** HTTPS/HTTP mismatch

**Solution:**
- Use same protocol everywhere
- Or add CORS headers to PHP files:
```php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
```

### Error: "File not found"

**Cause:** Wrong file paths or server configuration

**Solution:**
- Check file paths are correct
- Verify files exist in right directories
- Restart web server

### Error: "Login always fails"

**Cause:** Password hash mismatch or user not found

**Solution:**
```bash
# Check if user exists
mysql -u root -p -e "SELECT * FROM campus_chronicle.students;"

# Verify password hash
php -r "echo password_hash('student123', PASSWORD_DEFAULT);"
```

### Error: "Notices not loading"

**Cause:** Database query error or empty table

**Solution:**
```bash
# Check if notices table has data
mysql -u root -p -e "SELECT * FROM campus_chronicle.notices;"

# Insert sample data
mysql -u root -p campus_chronicle < php/sample-data.sql
```

---

## Performance Optimization

### 1. Enable Query Caching
```php
// In config.php
$conn->set_charset("utf8mb4");
$conn->query("SET SESSION query_cache_type = ON;");
```

### 2. Add Database Indexes
Already included in database-schema.sql:
```sql
INDEX `idx_category` (`category`)
INDEX `idx_faculty` (`faculty`)
INDEX `idx_semester` (`semester`)
```

### 3. Optimize PHP
```php
// In config.php
ini_set('display_errors', 0);
error_reporting(E_ALL);
```

### 4. Minify CSS/JS (Production)
- Use CSS minifier for style.css
- Minify inline JavaScript
- Remove console.logs()

---

## Deployment to Production

### 1. Security Checklist
- [ ] Change DB_PASS in config.php
- [ ] Remove sample-data.sql from server
- [ ] Enable HTTPS
- [ ] Disable error display
- [ ] Add CORS restrictions
- [ ] Use environment variables for config

### 2. Update config.php
```php
// Use environment variables
define('DB_HOST', getenv('DB_HOST'));
define('DB_USER', getenv('DB_USER'));
define('DB_PASS', getenv('DB_PASS'));
define('DB_NAME', getenv('DB_NAME'));
```

### 3. Create .htaccess (Apache)
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [QSA,L]
```

### 4. Enable HTTPS
- Get SSL certificate
- Update links from http:// to https://
- Configure server to redirect HTTP to HTTPS

---

## Need Help?

1. Check browser console (F12) for JavaScript errors
2. Check browser network tab for API response codes
3. Check PHP error logs
4. Run database verification queries
5. Verify file permissions (chmod 755 for directories)
6. Test with simple curl command:
   ```bash
   curl -X POST http://localhost:8000/php/get-notices.php
   ```

---

## Next Steps

After successful setup:
1. Customize colors in css/style.css
2. Add your college logo
3. Add more test users
4. Create sample notices
5. Set up regular backups
6. Monitor error logs
7. Consider adding email notifications
8. Implement search functionality
