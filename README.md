# Iterra-GO

A professional web application for doTERRA wellness advocates to manage their business and provide a seamless funnel to their personal doTERRA sites.

## Features

- **Member Authentication**: Secure login and registration system for doTERRA associates
- **Personal Site Redirect**: Seamless redirection to each associate's personal doTERRA website
- **Admin Dashboard**: Complete content management system for site administrators
- **User Management**: Admin tools to manage associate accounts
- **Responsive Design**: Mobile-friendly interface using Bootstrap 5
- **Security**: Built-in security features including rate limiting, session management, and password hashing

## Technology Stack

- **Backend**: Node.js with Express.js
- **Template Engine**: EJS (Embedded JavaScript)
- **Styling**: Bootstrap 5 with custom CSS
- **Data Storage**: File-based JSON storage (easily upgradable to database)
- **Security**: Helmet.js, bcryptjs, express-rate-limit, express-session

## Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm (comes with Node.js)

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/HealthyLifestyle111/Iterra-GO.git
cd Iterra-GO
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Edit the `.env` file with your configuration:
```env
PORT=3000
NODE_ENV=development
SESSION_SECRET=your_secure_random_string
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:3000`

### Production Deployment on Render

1. **Push to GitHub**: Ensure your code is pushed to GitHub

2. **Create a Render Account**: Sign up at [render.com](https://render.com)

3. **Create a New Web Service**:
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file

4. **Configure Environment Variables** in Render Dashboard:
   - `SESSION_SECRET`: Generate a strong random string
   - `ADMIN_USERNAME`: Your admin username
   - `ADMIN_PASSWORD`: Your secure admin password
   - `NODE_ENV`: Set to `production`

5. **Deploy**: Click "Create Web Service" and wait for deployment

6. **Access Your App**: Your app will be available at `https://your-app-name.onrender.com`

### First Time Setup

1. **Create Admin Account**: After deployment, you'll need to manually create an admin user or use the registration form and then manually update the user's role to 'admin' in the `data/users.json` file.

2. **Add Initial Content**: Login as admin and navigate to `/admin/content` to customize your site content.

## Usage

### For Associates (Members)

1. **Register**: Navigate to the registration page and fill in your details including your doTERRA member number and personal site URL
2. **Login**: Use your credentials to access your dashboard
3. **Access Your Site**: Click "Visit My Site" to be redirected to your personal doTERRA website
4. **Update Profile**: Keep your information up-to-date in the profile section

### For Administrators

1. **Login**: Use admin credentials to access the admin dashboard
2. **Manage Users**: Add, edit, or remove user accounts
3. **Manage Content**: Update homepage and about page content
4. **Monitor Activity**: View user statistics and recent registrations

## File Structure

```
Iterra-GO/
├── data/                   # JSON data storage
│   ├── users.json         # User accounts
│   └── content.json       # Site content
├── middleware/            # Express middleware
│   └── auth.js           # Authentication middleware
├── models/               # Data models
│   └── dataStore.js     # Data access layer
├── public/              # Static files
│   ├── css/
│   │   └── style.css   # Custom styles
│   └── js/
│       └── main.js     # Client-side JavaScript
├── routes/             # Route handlers
│   ├── index.js       # Main routes
│   ├── auth.js        # Authentication routes
│   └── admin.js       # Admin routes
├── views/             # EJS templates
│   ├── auth/         # Authentication pages
│   ├── admin/        # Admin pages
│   ├── index.ejs     # Home page
│   ├── about.ejs     # About page
│   ├── dashboard.ejs # User dashboard
│   ├── 404.ejs       # 404 error page
│   └── error.ejs     # Error page
├── .env.example      # Environment variables template
├── .gitignore        # Git ignore rules
├── package.json      # Dependencies and scripts
├── render.yaml       # Render deployment config
├── server.js         # Application entry point
└── README.md         # This file
```

## Security Features

- Password hashing with bcryptjs
- Session-based authentication
- CSRF protection through session management
- Rate limiting to prevent abuse
- Helmet.js for HTTP headers security
- Input validation with express-validator
- Secure cookie settings for production

## Content Management

Administrators can update site content through the admin panel:

- **Home Page**: Title, subtitle, hero text, and feature cards
- **About Page**: Title and content
- **User Management**: Add, edit, or remove users

## Customization

### Changing Colors

Edit `/public/css/style.css` and modify the CSS variables:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  /* Add your custom colors */
}
```

### Adding New Content Sections

1. Update the data model in `/models/dataStore.js`
2. Add routes in `/routes/admin.js`
3. Create views in `/views/admin/`

## Support

For issues or questions, please open an issue on GitHub or contact the repository owner.

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.