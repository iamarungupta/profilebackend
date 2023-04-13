const express=require('express');
const bcrypt = require('bcrypt');
const User = require('./model/usermodel');
// const bodyParser = require('body-parser');
const cors=require('cors');

const app=express();
app.use(cors());
app.use(express.json());




//const router = require('./routes/register');
// Use the login and register routes as middleware//
//app.use('/register', router);
app.post('/register', async (req, res) => {
  console.log(req.body)
    try {
      const { firstName, lastName, email, password } = req.body;
      // Check if user with same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User with the same email already exists' });
      }
      // Create new user
      console.log("above fname")
  
      console.log(req.body.firstName)
  
      const salt = await bcrypt.genSalt(10);
      console.log("salt okk")
  
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log("hash okk")
  
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword
      });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error registering user' });
    }
  });
  
  // Login user
  app.post('/login', async (req, res) => {
    try {
      console.log(req.body);
      const { email, password } = req.body;
      // Check if user with email exists
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error logging in user' });
    }
  });
  
  
  // Endpoint for updating user profile details
  app.put('/profile', async (req, res) => {
      const { firstName, lastName, email, image, links } = req.body;
    
      try {
        // Find the user by email and update the profile details
        const user = await User.findOneAndUpdate({ email }, { firstName, lastName, image, links }, { new: true });
        res.json({ message: 'User profile updated successfully', user });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user profile' });
      }
    });
    
  
    // Endpoint for updating user password
  app.put('/password', async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
  
    try {
      // Find the user by email and update the password
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User with the given email does not exist' });
      }
      const isPasswordCorrect = await user.comparePassword(oldPassword);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid password' });
      }
      user.password = newPassword;
      await user.save();
      res.json({ message: 'User password updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating user password' });
    }
  });
  
  
  
  
  
  
  
  
  
  


app.listen(4000,  function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", 4000);
   


});
