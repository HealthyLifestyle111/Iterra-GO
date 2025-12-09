const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize users file if it doesn't exist
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

async function createAdminUser() {
  console.log('\n=== Iterra-GO Admin Setup ===\n');
  
  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  
  // Check if admin already exists
  const adminExists = users.some(u => u.role === 'admin');
  if (adminExists) {
    console.log('An admin user already exists.');
    rl.question('Do you want to create another admin? (yes/no): ', async (answer) => {
      if (answer.toLowerCase() !== 'yes' && answer.toLowerCase() !== 'y') {
        console.log('Setup cancelled.');
        rl.close();
        return;
      }
      await promptAdminDetails();
    });
  } else {
    await promptAdminDetails();
  }
}

function promptAdminDetails() {
  return new Promise((resolve) => {
    rl.question('Admin Username: ', (username) => {
      rl.question('Admin Email: ', (email) => {
        rl.question('Admin Password: ', (password) => {
          rl.question('First Name: ', (firstName) => {
            rl.question('Last Name: ', (lastName) => {
              createAdmin(username, email, password, firstName, lastName);
              resolve();
            });
          });
        });
      });
    });
  });
}

async function createAdmin(username, email, password, firstName, lastName) {
  try {
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    
    // Check if username exists
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
      console.log('\nError: Username already exists!');
      rl.close();
      return;
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newAdmin = {
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: 'admin',
      doterraSiteUrl: '',
      memberNumber: '',
      createdAt: new Date().toISOString(),
      active: true
    };
    
    users.push(newAdmin);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    
    console.log('\n✓ Admin user created successfully!');
    console.log(`\nLogin with:`);
    console.log(`  Username: ${username}`);
    console.log(`  Password: [the password you entered]\n`);
    
    rl.close();
  } catch (error) {
    console.error('\nError creating admin user:', error.message);
    rl.close();
  }
}

createAdminUser();
