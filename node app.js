const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const path = require('path'); // Import the path module

// Initialize Express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from your specific folder
app.use(express.static(path.join('C:/Users/hhhhh/OneDrive/Desktop/CPPL')));

// Connect to MySQL Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Use your MySQL username
    password: 'Lopes#2004', // Use your MySQL password
    database: 'mydatabase'
});

// Establish the connection
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Signup route

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body; // Use 'name' instead of 'username'
    // Check if the user already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            return res.send('User already exists.');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err, result) => {
            if (err) throw err;

            // Redirect to the login page after successful signup
            res.redirect('login.html'); // Ensure your login page path is correct
        });
    });
});

// Login route
app.post('/login', (req, res) => { // Ensure there is a leading '/' here
    const { email, password } = req.body;
    // Find user by email
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.send('No user found with this email.');
        }

        const foundUser = results[0];

        // Compare password
        const validPassword = await bcrypt.compare(password, foundUser.password);
        if (validPassword) {
           // res.send('Logged in successfully.');
            res.redirect('home.html');
        } else {
            res.send('Incorrect password.');
        }
    });
});

// Listen on port 3000
app.listen (3000,()=> {
    console.log('Server started on port 3000.');
});
    