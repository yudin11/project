# Quick Start Guide

## 5-Minute Setup

### Step 1: Import Database
```bash
# Using command line
mysql -u root -p < php/database-schema.sql

# Or manually:
1. Open phpMyAdmin or MySQL Workbench
2. Create new database: campus_chronicle
3. Copy-paste contents of php/database-schema.sql
4. Execute
```

### Step 2: Update Database Config
Open `php/config.php` and set:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', 'your_password');
define('DB_NAME', 'campus_chronicle');
```

### Step 3: Start Server
```bash
# Navigate to project directory
cd campus-chronicle-simple

# Start PHP server
php -S localhost:8000

# Or if using Apache, place in htdocs and access via:
# http://localhost/campus-chronicle-simple/
```

### Step 4: Create Test User
Open phpMyAdmin and run:
```sql
-- Create Student (password: student123)
INSERT INTO students (user_id, full_name, password, faculty, semester) 
VALUES ('student1', 'Test Student', '$2y$10$slYQmyNdGzin7olVg.KfeOzTJP8/pPFSDKCwK8f0j6DvOOJL6vRhO', 'Computer Science', '3rd');

-- Create Admin (password: admin123)
INSERT INTO admins (user_id, full_name, password, faculty) 
VALUES ('admin1', 'Test Admin', '$2y$10$slYQmyNdGzin7olVg.KfeOzTJP8/pPFSDKCwK8f0j6DvOOJL6vRhO', 'Computer Science');
```

### Step 5: Access Application
```
Login Page: http://localhost:8000/
```

## Test Credentials

**Student Account:**
- User ID: `student1`
- Password: `student123`

**Admin Account:**
- User ID: `admin1`
- Password: `admin123`

## Features to Try

### As Student
1. Login with student credentials
2. Filter notices by faculty, semester, category
3. View notice details
4. Try different filters

### As Admin
1. Login with admin credentials
2. Click "Add New Notice"
3. Fill form and save
4. Edit/delete existing notices
5. Filter and search notices

## Common Issues

**PHP: Database connection failed**
- Check MySQL is running
- Verify credentials in config.php
- Ensure database exists

**JavaScript: Cannot fetch notices**
- Open browser console (F12)
- Check network tab for PHP errors
- Verify get-notices.php returns JSON

**Login: Invalid credentials**
- Verify user exists in database
- Check password hash is correct
- Clear browser cache

## Next Steps

- Customize colors in css/style.css
- Add more faculties in database
- Deploy to your web server
- Add email notifications
- Implement search functionality

---
For detailed instructions, see README.md
