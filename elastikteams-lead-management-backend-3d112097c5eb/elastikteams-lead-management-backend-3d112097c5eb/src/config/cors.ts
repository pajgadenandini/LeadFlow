import { CorsOptions } from 'cors';


  export const corsOptions: CorsOptions = {
    origin: '*', // Allow requests only from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add more methods if needed
    allowedHeaders: ['Content-Type', 'Authorization'], // Adjust headers as necessary
    credentials: true, // Allow cookies in cross-origin requests
  };