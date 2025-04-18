import jwt from 'jsonwebtoken';

const userAuth= async (req,res,next)=>{
    console.log(req.body)
    const {token}= req.headers;
    if(!token){
        return res.json({success:false,message:'Unauthorized user, Login again'})
    }
    try{
        const tokenDecode= jwt.verify(token,process.env.JWT_SECRET)

        // Initialize req.body if it's undefined spent eternity on this
        if(!req.body) {
            req.body = {};
        }

        if(tokenDecode.id){
            req.body.userId=tokenDecode.id;
        }else{
            return res.json({success:false,message:'Unauthorized user'})
        }
        next();
    }catch(error){
        console.log(error)
        return res.json({success:false,message:error.message})
    }
    
}

export default userAuth;