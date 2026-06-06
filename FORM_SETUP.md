# 📧 SHYNE Form Setup Guide

This guide explains how to receive form submissions from your Contact and Affiliate pop-up forms via email.

---

## 🚀 Quick Start (Gmail)

### Step 1: Create a .env file
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### Step 2: Get Gmail App Password
Since Gmail no longer allows regular passwords for third-party apps, you need an **App Password**:

1. Go to: https://myaccount.google.com/apppasswords
2. Sign in to your Google account
3. Select **Mail** and **Windows Computer** (or your device)
4. Google will generate a 16-character password
5. Copy this password

### Step 3: Update your .env file
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  (the 16-char password from step 2)
ADMIN_EMAIL=your-email@gmail.com
PORT=3001
```

### Step 4: Install dependencies
```bash
npm install
```

### Step 5: Run both servers simultaneously
Open two terminal windows:

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run dev:server
```

Or run both together with:
```bash
npm run dev:all
```

---

## 📨 How It Works

### Contact Form
When a user submits the Contact Form, two emails are sent:

**Email 1 - To You (Admin)**
- Receives the full contact message
- Shows: Name, Email, Phone, Query, Timestamp

**Email 2 - To User (Confirmation)**
- Confirms their message was received
- Shows their submitted message back

### Affiliate Form
When a user applies as an affiliate, two emails are sent:

**Email 1 - To You (Admin)**
- Shows: Name, Email, Phone, TikTok Handle, Instagram Handle
- Subject: "New Affiliate Application from [Name]"

**Email 2 - To User (Confirmation)**
- Confirms their application received
- Shows their social handles
- Sets expectations (2-3 business days response)

---

## 🔧 Alternative Email Services

### Using SendGrid (Recommended for Production)
Replace the Gmail config with SendGrid:

```javascript
// In server.js
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});
```

Add to `.env`:
```env
SENDGRID_API_KEY=SG.your_sendgrid_api_key
```

### Using Mailgun
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASS,
  },
});
```

---

## 🐛 Troubleshooting

### "Error: Failed to send message"
- Check that your `.env` file exists and is in the root directory
- Verify EMAIL_USER and EMAIL_PASSWORD are correct
- For Gmail, make sure you used an **App Password**, not your regular password
- Check that 2-Factor Authentication is enabled on your Gmail account

### "Port 3001 already in use"
Change the PORT in your `.env`:
```env
PORT=3002
```

### Forms submitting but no email received
- Check server logs in Terminal 2
- Verify ADMIN_EMAIL is correct
- Check your email spam folder
- Make sure the backend server is running

---

## 📝 Form Data Structure

### Contact Form Data
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+44123456789",
  "query": "I'd like to know more about...",
  "timestamp": "2026-06-06T10:30:00Z"
}
```

### Affiliate Form Data
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "phone": "+44123456789",
  "tiktok": "janesmith123",
  "instagram": "janesmith123",
  "timestamp": "2026-06-06T10:30:00Z"
}
```

---

## 🚀 Deployment

### Deploying to Production

#### Option 1: Heroku (Easy)
1. Create a Heroku account at https://heroku.com
2. Install Heroku CLI
3. Run:
```bash
heroku login
heroku create your-app-name
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=your-app-password
heroku config:set ADMIN_EMAIL=your-email@gmail.com
git push heroku main
```

#### Option 2: Vercel (Serverless Functions)
Create an API route in Vercel Functions instead of running a separate server.

#### Option 3: Your Own Server
- Use AWS EC2, DigitalOcean, or Linode
- Install Node.js and PM2 for process management
- Set up environment variables
- Point your domain to the server

---

## ✅ Testing

To test locally without sending real emails:

1. Use a service like **Mailtrap** (free): https://mailtrap.io
2. Get your SMTP credentials from Mailtrap
3. Update your `.env` with Mailtrap credentials
4. Test the forms - emails will show up in Mailtrap inbox

---

## 📧 Email Customization

To customize email templates, edit `server.js`:

```javascript
// Look for the html template sections
html: `
  <h2>New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${firstName} ${lastName}</p>
  <!-- Customize here -->
`
```

You can add:
- Your company logo
- Custom branding
- Different styling
- Additional fields
- Terms and conditions
- Social links

---

## 🔐 Security Notes

✅ Never commit `.env` file (it's in `.gitignore`)
✅ Never put API keys in your code
✅ Use environment variables for all sensitive data
✅ For production, use SendGrid or similar (more reliable)
✅ Consider adding CAPTCHA for spam prevention
✅ Validate all inputs on the backend

---

## 📞 Still Need Help?

1. Check the troubleshooting section above
2. Review your `.env` file setup
3. Check browser console for errors (F12)
4. Check server logs in Terminal 2
5. Verify email credentials are correct

---

## 🎉 You're All Set!

Your contact and affiliate forms are now fully functional and will send you emails whenever someone submits!
