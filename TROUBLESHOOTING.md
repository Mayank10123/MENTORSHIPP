# Deployment Troubleshooting

## Issue: Python Service Won't Deploy

**Error**: `ModuleNotFoundError` or `No module named`
- Solution: Check `requirements.txt` has all dependencies (fastapi, uvicorn, groq, pydantic, python-dotenv, etc.)
- Render logs location: Click service → Click "Logs" tab

**Error**: `uvicorn: command not found`
- Solution: Ensure Start Command is: `uvicorn main:app --host 0.0.0.0 --port 8000`

**Error**: Service keeps restarting/crashing
- Check logs for Python errors
- Verify GROQ_API_KEY environment variable is set

---

## Issue: Node Service Won't Deploy

**Error**: `Cannot find module 'express'`
- Solution: Ensure Build Command is: `npm install` (not `npm ci`)
- Check `server/package.json` has all dependencies

**Error**: "MONGO_URI is undefined"
- Solution: Add MONGO_URI to Environment Variables in Render dashboard
- Don't paste it in Build Command

**Error**: Cannot connect to MongoDB
- Solution: Check MongoDB Atlas whitelist allows Render's IP (usually automatic)
- Verify MONGO_URI format is correct

---

## Issue: Frontend Still Shows API Errors

**Error**: `CORS error` or `Failed to fetch`
- Solution: Verify backend URLs in Vercel Environment Variables
- Go to Vercel → Settings → Environment Variables
- Make sure URLs point to Render services (not localhost)

**Error**: `NEXT_PUBLIC_*` variables undefined
- Solution: After updating Vercel env vars, click Deployments → "Redeploy" button
- Changes don't apply without redeploying

**Error**: Mentor Chat returns "demo response"
- Solution: Check if Python API service is actually running on Render
- Test URL directly: `https://mentorshipp-python-api.onrender.com/docs`

---

## Issue: Services Go to Sleep

Render free tier puts services to sleep after 15 minutes of inactivity.

**Solution**: Upgrade to paid tier ($7/month) for always-on services, or accept cold starts.

---

## Testing Deployed Services

### Test Python API
Visit: `https://mentorshipp-python-api.onrender.com/docs`
Should show FastAPI docs

### Test Node API
Visit: `https://mentorshipp-node-api.onrender.com/api`
Should return: `{"message":"Node Orchestration Server Running"}`

### Test Frontend
Visit your Vercel URL and check:
1. Mentor Chat - should get real responses
2. Browser Console - no 400/500 errors for API calls

---

## Logs Location

**Render**: Service page → "Logs" tab (real-time)
**Vercel**: Deployments → Select deployment → "Functions" tab
**Local**: Terminal where you ran `npm start` or `python main.py`
