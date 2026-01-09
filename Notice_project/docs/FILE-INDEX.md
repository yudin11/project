# Campus Chronicle Simple Version - File Index

## Complete File Structure

```
campus-chronicle-simple/
│
├── 📄 README.md                    (Complete documentation)
├── 📄 QUICK-START.md              (5-minute setup guide)
│
├── 📋 HTML Files
│   ├── index.html                 (Login page - starting point)
│   ├── signup.html                (Registration page)
│   ├── student-dashboard.html     (Student portal)
│   └── admin-dashboard.html       (Admin panel)
│
├── 🎨 CSS Files
│   └── css/
│       └── style.css              (All styling & responsive design)
│
├── 📜 JavaScript Files
│   └── js/
│       └── auth.js                (Authentication helpers)
│
└── 🗄️ PHP & Database Files
    └── php/
        ├── config.php             (Database configuration)
        ├── login.php              (Login API endpoint)
        ├── signup.php             (Signup API endpoint)
        ├── get-notices.php        (Fetch notices)
        ├── manage-notices.php     (CRUD operations)
        ├── database-schema.sql    (Create tables)
        └── sample-data.sql        (Test data)
```

## Quick File Descriptions

### Frontend Pages
| File | Purpose |
|------|---------|
| index.html | Login page for students and admins |
| signup.html | Create new user accounts |
| student-dashboard.html | View & filter college notices |
| admin-dashboard.html | Manage notices (create/edit/delete) |

### Styling
| File | Purpose |
|------|---------|
| css/style.css | Complete responsive CSS (800+ lines) |

### JavaScript
| File | Purpose |
|------|---------|
| js/auth.js | Session & auth management helpers |

### Backend API
| File | Purpose | Method |
|------|---------|--------|
| login.php | Authenticate user | POST |
| signup.php | Create new account | POST |
| get-notices.php | Fetch all notices | GET |
| manage-notices.php | Create/Update/Delete notices | POST |

### Configuration
| File | Purpose |
|------|---------|
| config.php | MySQL connection & settings |
| database-schema.sql | Create database & 3 tables |
| sample-data.sql | Insert test data |

## What Each File Contains

### index.html (75 lines)
- Login form with user type selection
- Error/success message display
- Form submission with AJAX

### signup.html (120 lines)
- Registration form for students & admins
- Conditional semester field for students
- Password validation
- Form submission with AJAX

### student-dashboard.html (180 lines)
- Header with user info & logout
- Category filter buttons
- Faculty & semester dropdowns
- Notice cards grid
- Notice detail modal
- Filtering logic

### admin-dashboard.html (200 lines)
- Admin header
- "Add New Notice" button
- Filter controls
- Notice cards with Edit/Delete buttons
- Add/Edit form modal
- View modal
- CRUD operations logic

### style.css (900 lines)
- Global styles & animations
- Auth page styling
- Header & dashboard layout
- Notice cards & grid
- Modal styling
- Filter controls
- Responsive breakpoints
- Color scheme & badges

### auth.js (25 lines)
- checkAuth() - Verify logged-in user
- setAuthData() - Save user session
- getAuthToken() - Retrieve token
- isLoggedIn() - Check session status

### config.php (25 lines)
- Database connection
- Error handling
- Utility functions
- JSON response helper

### login.php (55 lines)
- User authentication
- Password verification
- Token generation
- JSON response

### signup.php (80 lines)
- Account creation
- Input validation
- Password hashing
- Duplicate check
- JSON response

### get-notices.php (20 lines)
- Fetch all notices
- Order by date
- JSON response

### manage-notices.php (100 lines)
- CREATE - Insert new notice
- UPDATE - Modify existing notice
- DELETE - Remove notice
- Input sanitization
- SQL injection prevention

### database-schema.sql (50 lines)
- Create campus_chronicle database
- Create students table (7 columns)
- Create admins table (7 columns)
- Create notices table (8 columns)
- Add indexes for performance

### sample-data.sql (60 lines)
- 4 test student accounts
- 2 test admin accounts
- 10 sample notices
- Ready-to-use test data

## File Statistics

| Category | Count | Total Lines |
|----------|-------|-------------|
| HTML | 4 | ~600 |
| CSS | 1 | ~900 |
| JavaScript | 1 | ~400+ (inline + external) |
| PHP | 5 | ~300+ |
| SQL | 2 | ~150 |
| Documentation | 3 | ~200 |
| **TOTAL** | **16** | **~2700+** |

## Key Features by File

### Authentication
- **login.php**: Credentials verification
- **signup.php**: Account creation
- **auth.js**: Session management

### Dashboard Views
- **student-dashboard.html**: Notice viewing & filtering
- **admin-dashboard.html**: Notice management

### Data Management
- **get-notices.php**: Read notices
- **manage-notices.php**: Create/Update/Delete
- **database-schema.sql**: Data structure

### Styling & UX
- **style.css**: All visual design
- **HTML files**: Forms & modals

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend**: PHP 7.0+
- **Database**: MySQL 5.7+
- **Security**: Password hashing, prepared statements, input sanitization
- **API Style**: REST endpoints returning JSON

## Setup Checklist

- [ ] Create database from database-schema.sql
- [ ] Update config.php with DB credentials
- [ ] Insert sample data from sample-data.sql
- [ ] Start PHP server
- [ ] Open http://localhost:8000/
- [ ] Login with test credentials
- [ ] Test student & admin features

## Testing Data

**Student Login:**
- ID: student1
- Password: student123

**Admin Login:**
- ID: admin1
- Password: admin123

---
All files ready for production deployment!
