const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATA_DIR = path.join(__dirname, '../data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize users file if it doesn't exist
if (!fs.existsSync(USERS_FILE)) {
  const initialUsers = [];
  fs.writeFileSync(USERS_FILE, JSON.stringify(initialUsers, null, 2));
}

// Initialize content file if it doesn't exist
if (!fs.existsSync(CONTENT_FILE)) {
  const initialContent = {
    homePage: {
      title: 'Welcome to Iterra-GO',
      subtitle: 'Your Gateway to doTERRA Success',
      heroText: 'Build your doTERRA business with professional tools and guidance',
      features: [
        {
          title: 'Member Portal',
          description: 'Access your personalized doTERRA site and manage your business',
          icon: 'user'
        },
        {
          title: 'Business Tools',
          description: 'Professional tools to help grow your doTERRA business',
          icon: 'briefcase'
        },
        {
          title: 'Consulting Services',
          description: 'Expert guidance for building a successful essential oils business',
          icon: 'chart-line'
        }
      ]
    },
    aboutPage: {
      title: 'About Iterra-GO',
      content: 'Iterra-GO is your comprehensive platform for building and managing your doTERRA business. We provide the tools, resources, and support you need to succeed as a doTERRA wellness advocate.'
    }
  };
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(initialContent, null, 2));
}

class DataStore {
  // User operations
  static getUsers() {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  }

  static saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  }

  static findUserByUsername(username) {
    const users = this.getUsers();
    return users.find(u => u.username.toLowerCase() === username.toLowerCase());
  }

  static findUserById(id) {
    const users = this.getUsers();
    return users.find(u => u.id === id);
  }

  static async createUser(userData) {
    const users = this.getUsers();
    
    // Check if user already exists
    if (this.findUserByUsername(userData.username)) {
      throw new Error('Username already exists');
    }

    const newUser = {
      id: Date.now().toString(),
      username: userData.username,
      email: userData.email,
      password: await bcrypt.hash(userData.password, 10),
      doterraSiteUrl: userData.doterraSiteUrl || '',
      memberNumber: userData.memberNumber || '',
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      role: userData.role || 'associate',
      createdAt: new Date().toISOString(),
      active: true
    };

    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  }

  static async updateUser(id, updates) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === id);
    
    if (index === -1) {
      throw new Error('User not found');
    }

    // If password is being updated, hash it
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    users[index] = { ...users[index], ...updates, updatedAt: new Date().toISOString() };
    this.saveUsers(users);
    return users[index];
  }

  static deleteUser(id) {
    const users = this.getUsers();
    const filtered = users.filter(u => u.id !== id);
    this.saveUsers(filtered);
  }

  static async validateUser(username, password) {
    const user = this.findUserByUsername(username);
    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return null;
    }

    return user;
  }

  // Content operations
  static getContent() {
    const data = fs.readFileSync(CONTENT_FILE, 'utf8');
    return JSON.parse(data);
  }

  static saveContent(content) {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2));
  }

  static updateContent(section, data) {
    const content = this.getContent();
    content[section] = { ...content[section], ...data };
    this.saveContent(content);
    return content;
  }
}

module.exports = DataStore;
