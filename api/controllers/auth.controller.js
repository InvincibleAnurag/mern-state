import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const signup = async (req,res, next)=>{
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password: hashedPassword});
    try {
        await newUser.save();
        res.status(201).json("User Created successfully!!");
    } catch (error) {
        next(error);
    }
}

export const signin = async (req,res,next)=> {
    const {email, password} = req.body;
   try {
       const validUser = await User.findOne({email});
       if(!validUser) return next(errorHandler(401,'User not found'));
       const validPassword = bcryptjs.compareSync(password,validUser.password);
       if(!validPassword) return next(errorHandler(401, 'Wrong Credentials!'))
       const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET);
       const {password:pass, ...rest} = validUser._doc;
    //    const pass = validUser._doc.password;
    // const rest = {
    //     email: validUser._doc.email,
    //     name: validUser._doc.name,
    //     age: validUser._doc.age
    //     // and any other properties not explicitly destructured
    //   };

    // validUser._doc = {
    //     email: 'user@example.com',
    //     password: 'hashedpassword',
    //     name: 'John Doe',
    //     age: 30
    //   };
       res.cookie('access_token',token, {httpOnly:true}).status(200).json(rest);

       // Set cookie to expire in 1 hour (3600000 milliseconds)
//       res.cookie('access_token', token, {
//       httpOnly: true,
//       maxAge: 3600000  // 1 hour
//   })

// Set cookie to expire on a specific date and time
// const expirationDate = new Date(Date.now() + 3600000); // 1 hour from now
// res.cookie('access_token', token, {
//   httpOnly: true,
//   expires: expirationDate
// })


// const { password: pass, ...rest } = validUser._doc;
// const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
// const expirationDate = new Date(Date.now() + 3600000); // 1 hour from now

// res.cookie('access_token', token, {
//   httpOnly: true,
//   expires: expirationDate // or use maxAge: 3600000
// })
// .status(200)
// .json(rest);

    }
   catch(error) {
      next(error);
   }
};