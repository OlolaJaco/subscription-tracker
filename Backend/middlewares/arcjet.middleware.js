import { aj, isSpoofed } from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 5 }); // Deduct 5 tokens from the bucket
    
    console.log("Arcjet decision", decision);
    
    
    if (decision.isDenied()) {
    
      if (decision.reason.isRateLimit()) {
    
        res.writeHead(429, { "Content-Type": "application/json" });
    
        res.end(JSON.stringify({ error: "Too Many Requests" }));
    
      } else if (decision.reason.isBot()) {
    
        res.writeHead(403, { "Content-Type": "application/json" });
    
        res.end(JSON.stringify({ error: "No bots allowed" }));
    
      } else {
    
        res.writeHead(403, { "Content-Type": "application/json" });
    
        res.end(JSON.stringify({ error: "Forbidden" }));
    
      }
    
    } else if (decision.results.some(isSpoofed)) {
    
      res.writeHead(403, { "Content-Type": "application/json" });
    
      res.end(JSON.stringify({ error: "Forbidden" }));
    
    } else {
    
      res.writeHead(200, { "Content-Type": "application/json" });
    
      res.end(JSON.stringify({ message: "Hello World" }));
    
    }
  } catch (error) {
    console.log(`Arcjet Middleware Error: ${error.message}`);
    next(error);
  }
}

export default arcjetMiddleware;