import express from 'express';
import loginRouter from './authentification/login.js'; // Adjust the path as necessary

const app = express();
app.use(express.json());

// ...existing code...

app.use('/api', loginRouter); // Ensure the base URL matches the Postman request

// ...existing code...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
