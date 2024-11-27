import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const secret_key = process.env.ACCESS_TOKEN_SECRET

const jwtoptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([ (req) => {
        // Extract token from cookies
        return req.cookies['accessToken'];
      }]),
    secretOrKey:secret_key
}



const strategy  = new JwtStrategy(jwtoptions,async (jwt_payload,done)=>{
    try {
        const user = await User.findById(jwt_payload._id)
        if(!user){
            return done(null,false)
        }

        return done(null,user)
    } catch (error) {
        console.log("strategy error")
        return done(error,false)
    }
})

export default strategy;
