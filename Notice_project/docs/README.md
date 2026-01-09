# Campus Chronicle - Simple Version

A simplified College Notice Board System built with vanilla JavaScript, HTML, CSS, PHP, and MySQL.

## Features

- **User Authentication**: Login and signup for students and admins
- **Student Portal**: View and filter notices by faculty, semester, and category
- **Admin Panel**: Create, update, and delete notices
- **Responsive Design**: Works on desktop and mobile devices
- **Database Integration**: MySQL backend for persistent data storage

## Project Structure

```
campus-chronicle-simple/
├── index.html                 # Login page
├── signup.html               # Sign up page
├── student-dashboard.html    # Student portal
├── admin-dashboard.html      # Admin panel
├── css/
│   └── style.css            # Main stylesheet
├── js/
│   └── auth.js              # Authentication helpers
└── php/
    ├── config.php           # Database configuration
    ├── login.php            # Login API endpoint
    ├── signup.php           # Sign up API endpoint
    ├── get-notices.php      # Fetch notices endpoint
    ├── manage-notices.php   # Create/update/delete notices endpoint
    └── database-schema.sql  # MySQL database schema
```

## Prerequisites

- PHP 7.0 or higher
- MySQL 5.7 or higher
- Web Server (Apache, Nginx, or built-in PHP server)

## Installation Steps

### 1. Create Database

1. Open MySQL command line or phpMyAdmin
2. Copy the contents of `php/database-schema.sql`
3. Execute the SQL script to create the database and tables

Alternatively, using command line:
```bash
mysql -u root -p < php/database-schema.sql
```

### 2. Configure Database Connection

Edit `php/config.php` and update the database credentials:
```php
define('DB_HOST', 'localhost');    // Your MySQL host
define('DB_USER', 'root');         // Your MySQL username
define('DB_PASS', '');             // Your MySQL password
define('DB_NAME', 'campus_chronicle');
```

### 3. Set Up Web Server

**Option A: Using Apache/Nginx**
- Copy the entire `campus-chronicle-simple` folder to your web root directory
- Access via: `http://localhost/campus-chronicle-simple/`

**Option B: Using PHP Built-in Server**
```bash
# Navigate to the project directory
cd campus-chronicle-simple

# Start PHP built-in server
php -S localhost:8000

# Access via: http://localhost:8000/
```

## Default Users (After Setup)

You can manually add test users to the database:

### Student Account
```sql
INSERT INTO students (user_id, full_name, password, faculty, semester) 
VALUES ('student1', 'John Doe', '$2y$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36gZvWAu', 'Computer Science', '3rd');
```
Password: `password`

### Admin Account
```sql
INSERT INTO admins (user_id, full_name, password, faculty) 
VALUES ('admin1', 'Admin User', '$2y$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36gZvWAu', 'Computer Science');
```
Password: `password`

## Usage

### For Students

1. Go to the login page
2. Select "Student" as user type
3. Enter your User ID and password
4. View notices filtered by faculty, semester, and category
5. Click "View Details" to see full notice content

### For Admins

1. Go to the login page
2. Select "Admin" as user type
3. Enter your admin ID and password
4. Click "Add New Notice" to create a notice
5. Edit existing notices by clicking the "Edit" button
6. Delete notices by clicking the "Delete" button
7. Filter notices using the filter options

## API Endpoints

### POST `/php/login.php`
Login a user

**Request:**
```json
{
  "userType": "student|admin",
  "userId": "user123",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "userId": "student1",
    "fullName": "John Doe",
    "userType": "student",
    "faculty": "Computer Science",
    "semester": "3rd"
  },
  "token": "token_string"
}
```

### POST `/php/signup.php`
Create a new account

**Request:**
```json
{
  "userType": "student|admin",
  "userId": "newuser",
  "fullName": "Full Name",
  "faculty": "Computer Science",
  "semester": "3rd",
  "password": "password123"
}
```

### GET `/php/get-notices.php`
Fetch all notices

**Response:**
```json
{
  "success": true,
  "notices": [
    {
      "id": 1,
      "title": "Notice Title",
      "content": "Notice content...",
      "category": "Exam",
      "faculty": "All",
      "semester": "All",
      "date": "09/01/2026"
    }
  ]
}
```

### POST `/php/manage-notices.php`
Create, update, or delete notices (Admin only)

**Create:**
```json
{
  "method": "CREATE",
  "title": "Notice Title",
  "content": "Notice content...",
  "category": "Exam",
  "faculty": "Computer Science",
  "semester": "3rd"
}
```

**Update:**
```json
{
  "method": "UPDATE",
  "id": 1,
  "title": "Updated Title",
  "content": "Updated content...",
  "category": "Exam",
  "faculty": "Computer Science",
  "semester": "3rd"
}
```

**Delete:**
```json
{
  "method": "DELETE",
  "id": 1
}
```

## File Descriptions

### HTML Files
- **index.html**: Login page with form validation
- **signup.html**: Registration page for new users
- **student-dashboard.html**: Student notice board with filtering options
- **admin-dashboard.html**: Admin panel for managing notices

### CSS
- **style.css**: Complete stylesheet with responsive design and animations

### JavaScript
- **js/auth.js**: Authentication helpers for managing user sessions

### PHP
- **config.php**: Database configuration and connection setup
- **login.php**: User authentication logic
- **signup.php**: User registration logic
- **get-notices.php**: Fetch all notices from database
- **manage-notices.php**: Handle CRUD operations for notices

### Database
- **database-schema.sql**: SQL script for creating database and tables

## Security Notes

1. **Password Hashing**: All passwords are hashed using PHP's `password_hash()` function
2. **Input Sanitization**: User inputs are sanitized using `htmlspecialchars()`
3. **SQL Injection Prevention**: Prepared statements are used for all database queries
4. **CORS**: Add proper CORS headers in production
5. **HTTPS**: Always use HTTPS in production

## Customization

### Add New Notice Categories
Edit the `categories` array in `student-dashboard.html` and `admin-dashboard.html`:
```javascript
const categories = ['Exam', 'Event', 'Announcement', 'Holiday', 'Your-Category'];
```

### Change Color Scheme
Edit CSS variables in `css/style.css`:
```css
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Add New Faculties
Update the faculty options in HTML select elements and database schema.

## Troubleshooting

### Database Connection Error
- Check if MySQL server is running
- Verify database credentials in `php/config.php`
- Ensure the database exists

### Login Fails
- Verify user exists in the database
- Check password is correct
- Clear browser cache and try again

### Notices Not Loading
- Check browser console for errors (F12)
- Verify `get-notices.php` is returning valid JSON
- Ensure database tables have data

### File Not Found Errors
- Verify all files are in correct directories
- Check file paths in HTML (relative paths should work)
- Ensure PHP server is running

## Future Enhancements

- JWT token implementation for better security
- Email notifications for new notices
- Search functionality for notices
- Notice attachments/file uploads
- User profile management
- Admin activity logging
- Notice scheduling for future dates
- Student feedback/comments on notices

## Support

For issues or questions, please check:
1. Browser console (F12) for JavaScript errors
2. Server logs for PHP errors
3. Database connectivity
4. File paths and permissions

## License

This project is open source and available for educational purposes.
