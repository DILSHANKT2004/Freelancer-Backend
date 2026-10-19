const rateLimit = require('express-rate-limit');

const apiRateLimiter = rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    standardHeaders:true,
    legacyHeaders: false,
    message:{
        success: false,
        message: "Too many requests from this IP, please try again after some time.",
    },
});

module.exports =  apiRateLimiter ;