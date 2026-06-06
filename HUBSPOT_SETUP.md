# 🔗 HubSpot CRM Integration Guide

All form submissions from your Contact and Affiliate forms will be automatically synced to your HubSpot CRM!

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Create a HubSpot Account (if you don't have one)
1. Go to: https://www.hubspot.com/
2. Click "Get started free"
3. Sign up with your email (info.shyneoils@gmail.com recommended)
4. Confirm your email

### Step 2: Generate HubSpot API Key
1. Log in to HubSpot: https://app.hubspot.com
2. Go to **Settings** (gear icon in top right)
3. Go to **Account Setup → Integrations → Private apps**
4. Click **Create private app**
5. Fill in:
   - **App name:** SHYNE Website Forms
   - **Description:** Syncs contact and affiliate forms to CRM
6. Go to **Scopes** tab
7. Enable these scopes:
   - ✅ `crm.objects.contacts.read`
   - ✅ `crm.objects.contacts.write`
8. Click **Create app**
9. Go to **Auth** tab
10. Copy your **Access Token** (looks like: `pat-...`)

### Step 3: Add API Key to Your Project
1. Open `/Users/adaeze/SHYNE WEBSITE/shyne-homepage/.env`
2. Find this line: `HUBSPOT_API_KEY=your-hubspot-api-key-here`
3. Replace with your actual token: `HUBSPOT_API_KEY=pat-...`

### Step 4: Install Dependencies & Run
```bash
cd "/Users/adaeze/SHYNE WEBSITE/shyne-homepage"
npm install
npm run dev:all
```

---

## 📊 What Gets Synced to HubSpot

### Contact Form Submissions
When someone submits the Contact Form, a new contact is created in HubSpot with:
- ✅ First Name
- ✅ Last Name
- ✅ Email Address
- ✅ Phone Number
- ✅ Message/Query (stored in custom field)
- ✅ Submission Date
- ✅ Lead Status: "NEW"

### Affiliate Form Submissions
When someone applies to be an affiliate, a contact is created with:
- ✅ First Name
- ✅ Last Name
- ✅ Email Address
- ✅ Phone Number
- ✅ TikTok Handle (custom field)
- ✅ Instagram Handle (custom field)
- ✅ Application Date
- ✅ Lead Status: "NEW"

---

## 🎯 Custom Fields Created Automatically

HubSpot will automatically recognize these custom fields:
- `tiktok_handle` - Social media handle
- `instagram_handle` - Social media handle
- `message` - Query/Message from contact form
- `contact_form_submission_date` - When submitted
- `affiliate_application_date` - When applied

---

## 📱 Using Your HubSpot Dashboard

### View Your Leads
1. Log in to HubSpot
2. Go to **Contacts** in the left menu
3. All form submissions appear here
4. Click any contact to see details

### Create Workflows
1. Go to **Automation → Workflows**
2. Create workflows like:
   - **Auto-reply to contact form submissions**
   - **Notify you when affiliate applies**
   - **Tag new leads automatically**
   - **Assign to sales rep**

### Send Emails
1. Click on a contact
2. Click **Contact Timeline**
3. Click **Send email** to respond

### Set Up Notifications
1. Go to **Settings → Notifications**
2. Enable notifications for new contacts
3. Receive alerts when someone submits a form

---

## 🔧 Testing Your Integration

### Test Contact Form
1. Visit http://localhost:5173
2. Scroll to footer
3. Click **Contact**
4. Fill out the form
5. Click **Submit**
6. Check your HubSpot: https://app.hubspot.com/contacts

You should see a new contact appear! ✅

### Test Affiliate Form
1. Click **Become an Affiliate**
2. Fill out the form with your TikTok and Instagram
3. Click **Join as Affiliate**
4. Check HubSpot - new contact with social handles

---

## 🚨 Troubleshooting

### "Failed to send message" or "Failed to submit application"
**Solution:**
- Check your API key is correct
- Make sure your `.env` file has `HUBSPOT_API_KEY=pat-...`
- Restart the server after updating `.env`
- Check browser console (F12) for error details

### API Key doesn't work
**Solution:**
- Go back to HubSpot Settings → Private apps
- Check if the app still exists
- Regenerate the access token if needed
- Copy the full token (including `pat-` prefix)

### Contacts not appearing in HubSpot
**Solution:**
- Verify API key is in `.env` file
- Check that server is running (`npm run dev:server`)
- Watch server logs for errors
- Try testing with the health check:
  ```
  curl http://localhost:3001/api/health
  ```

### Getting 401 or 403 errors
**Solution:**
- Your API key might be expired
- Try regenerating it in HubSpot Settings
- Make sure all required scopes are enabled

---

## 🌐 Deploying to Production

### Update Environment Variables in Production

#### Heroku
```bash
heroku config:set HUBSPOT_API_KEY=pat-...
```

#### Vercel
1. Go to Project Settings → Environment Variables
2. Add: `HUBSPOT_API_KEY` with your token value

#### AWS/DigitalOcean
Update your `.env` file with production values

---

## 📈 Advanced HubSpot Features

### Create Custom Properties
1. Go to **Settings → Data Management → Objects → Contacts**
2. Click **Create property**
3. Create properties like:
   - Social Media Follower Count
   - Niche Category
   - Budget Range
   - Product Interest

### Set Up Automation
1. **Workflows** - Auto-respond to affiliates
2. **Sequences** - Follow up with leads
3. **Lists** - Segment contacts
4. **Reports** - Track submissions over time

### Integration with Other Tools
HubSpot connects with:
- Gmail/Outlook for email sync
- Slack for notifications
- Google Sheets for data
- Zapier for unlimited integrations
- And 1000+ other apps

---

## 📞 HubSpot Documentation

- **HubSpot CRM Basics:** https://knowledge.hubspot.com/crm-setup
- **Private Apps Guide:** https://developers.hubspot.com/docs/api/private-apps
- **Contact Object:** https://developers.hubspot.com/docs/crm/objects/contacts

---

## ✅ You're All Set!

Your SHYNE website forms are now connected to HubSpot CRM. Every submission automatically:
1. ✅ Creates a contact in HubSpot
2. ✅ Stores all form data
3. ✅ Adds custom properties (social handles, messages, etc.)
4. ✅ Appears in your dashboard instantly

You can now manage leads, create workflows, and scale your business! 🚀

---

## 💡 Pro Tips

1. **Mobile App** - Download the HubSpot CRM mobile app to manage leads on the go
2. **Email Sequences** - Set up automated follow-ups for affiliates
3. **Sales Pipeline** - Move contacts through stages (New → Contacted → Converted)
4. **Analytics** - Track submission sources and conversion rates
5. **Bulk Actions** - Tag, assign, or email multiple contacts at once

Happy CRM-ing! 🎉
