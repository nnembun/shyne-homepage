# 🚀 Complete Deployment Guide for SHYNE Website

Your website will be deployed to:
- **Frontend:** Vercel (FREE)
- **Backend:** Render (FREE) 
- **Database/Storage:** Vercel KV (optional, FREE)

---

## **STEP 1: Push Your Code to GitHub** (5 minutes)

Open Terminal and run these commands:

```bash
cd "/Users/adaeze/SHYNE WEBSITE/shyne-homepage"

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "SHYNE website - forms, newsletter, affiliate program"

# Create a new repository on GitHub first, then run:
# git remote add origin https://github.com/YOUR_USERNAME/shyne-website.git
# git branch -M main
# git push -u origin main
```

**⚠️ WAIT!** Before you run these, you need to:

1. Go to: https://github.com/new
2. Create a new repository:
   - Name: `shyne-website`
   - Description: "SHYNE Skincare Website"
   - Make it **Public**
   - Click **Create Repository**
3. Copy the URL (should be: `https://github.com/YOUR_USERNAME/shyne-website.git`)
4. Replace `YOUR_USERNAME` in the command above
5. Run the commands

---

## **STEP 2: Deploy Frontend to Vercel** (3 minutes)

1. Go to: https://vercel.com
2. Click **"New Project"**
3. Click **"Import GitHub Repository"**
4. Search for **"shyne-website"**
5. Click **Import**
6. Vercel will auto-detect it's a Vite project ✅
7. Click **Deploy**
8. Wait for deployment (usually 2-3 minutes)

**You'll get a live URL!** Like: `https://shyne-website.vercel.app`

---

## **STEP 3: Deploy Backend to Render** (5 minutes)

Since Vercel frontend and serverless functions don't work well with our Node backend, we'll use **Render.com** (free).

1. Go to: https://render.com
2. Sign up with GitHub
3. Click **"New Web Service"**
4. Connect your `shyne-website` GitHub repo
5. Configure:
   - **Name:** `shyne-backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Add Environment Variables:**
     - `PORT` = `3001`
     - `HUBSPOT_API_KEY` = (leave blank for now)
6. Click **Create Web Service**

Wait for deployment. You'll get a backend URL like:
`https://shyne-backend.onrender.com`

---

## **STEP 4: Update Frontend Environment Variables** (2 minutes)

1. Go back to Vercel dashboard
2. Click your **"shyne-website"** project
3. Go to **Settings → Environment Variables**
4. Add:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://shyne-backend.onrender.com`
5. Click **Save**
6. Redeploy (go to **Deployments** and click the latest one, then **Redeploy**)

---

## **STEP 5: Update Backend to Accept Frontend Requests** (Done! ✅)

Your backend at `server.js` already has CORS enabled, so it will accept requests from your Vercel frontend automatically!

---

## **STEP 6: Test Your Live Forms!** 🎉

1. Go to your Vercel URL: `https://shyne-website.vercel.app`
2. Scroll to footer
3. Try the **Newsletter** signup
4. Try the **Contact** form
5. Try the **Become an Affiliate** form

**All forms should work!** ✨

---

## **WHERE IS MY FORM DATA STORED?**

Currently:
- ✅ Data is logged in Render console
- ✅ Form submission returns success

To store data permanently, choose ONE:

### **Option A: Add Email Notifications**
Configure your email in `server.js` to send you emails when forms submit.

### **Option B: Add a Database**
Connect to Supabase (PostgreSQL database - FREE):
1. Sign up at: https://supabase.com
2. Create a new project
3. Update `server.js` to save form data to Supabase

### **Option C: Use Vercel KV**
Vercel's built-in key-value storage (easier than database)

---

## **CUSTOM DOMAIN (Optional)**

Want `www.shyneoils.com` instead of `shyne-website.vercel.app`?

1. Buy domain from GoDaddy/Namecheap
2. Go to Vercel project → **Settings → Domains**
3. Add your domain
4. Update DNS records (Vercel will guide you)

---

## **QUICK CHECKLIST**

- [ ] Push code to GitHub
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Render
- [ ] Update Vercel environment variables
- [ ] Test forms on live website
- [ ] (Optional) Add database for data storage
- [ ] (Optional) Set up custom domain

---

## **SUPPORT**

If something doesn't work:
1. Check Vercel deployment logs
2. Check Render backend logs
3. Check browser console (F12) for errors
4. Make sure both URLs are correct

**You've got this!** 🚀
