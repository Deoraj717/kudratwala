import jwt from 'jsonwebtoken';

const getUserIdFromToken = function(token) {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded._id; // Adjust according to your JWT payload structure
  } catch (err) {
    console.error('Token verification failed:', err);
    return null;
  }
}

export {getUserIdFromToken};