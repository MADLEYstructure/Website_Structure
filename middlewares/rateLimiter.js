/**

Rate Limiter Middleware
5 requests per minute per IP
*/

const rateLimitMap = new Map();

module.exports = (req, res, next) => {
const ip = req.ip;
const now = Date.now();

if (!rateLimitMap.has(ip)) {
rateLimitMap.set(ip, []);
}

const timestamps = rateLimitMap.get(ip).filter(
(time) => now - time < 60 * 1000
);

timestamps.push(now);
rateLimitMap.set(ip, timestamps);

if (timestamps.length > 5) {
return res.status(429).json({
success: false,
error: 'Too many requests',
});
}

next();
};