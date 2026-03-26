import arcjet from "@arcjet/node";
import aj from "../lib/arcjet.js"
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next)=>{
    try {
        const decision = await aj.protect(req);
        if (decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).json({messasge:"rate limit exceeded. try after some time"})
            }
         else if (decision.reason.isBot()){
 return res.status(403).json({messasge:"bot accesee denied"})
        }else{
 return res.status(403).json({messasge:"access denied due to policy security"})
        }
        }

        // check for bot
        if (decision.results.some(isSpoofedBot)){
            return res.status(403).json({
                error:"spoofed bot detected",
                messasge:"maliciouse bot activity detected",

            })
        }
        next()
    } catch (error) {
        console.log("arcjet protection error",error)
        next()
    }
}