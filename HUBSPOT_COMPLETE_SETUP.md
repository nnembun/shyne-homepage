# 🎯 Complete HubSpot CRM Integration - All Data Flows

Your entire SHYNE website is now connected to HubSpot CRM! All customer data automatically flows into your CRM.

---

## 📊 All Data Flows to HubSpot

### **1️⃣ Newsletter Subscription**
**From:** Footer email subscription field
**To:** HubSpot Contact
**Data Synced:**
- Email address
- Lead Status: "SUBSCRIBER"
- Newsletter signup date

**Example:** Customer enters email in footer → Auto-created in HubSpot with "SUBSCRIBER" tag

---

### **2️⃣ Contact Form Submissions**
**From:** Contact pop-up form (Footer → "Contact")
**To:** HubSpot Contact
**Data Synced:**
- First Name
- Last Name
- Email Address
- Phone Number
- Message/Query
- Lead Status: "NEW"
- Submission timestamp

**Example:** Customer fills contact form → Auto-created in HubSpot contact database

---

### **3️⃣ Affiliate Applications**
**From:** Affiliate pop-up form (Footer → "Become an Affiliate")
**To:** HubSpot Contact
**Data Synced:**
- First Name
- Last Name
- Email Address
- Phone Number
- TikTok Handle (custom field)
- Instagram Handle (custom field)
- Lead Status: "NEW"
- Application timestamp

**Example:** Creator applies to be an affiliate → Auto-created in HubSpot with social handles

---

### **4️⃣ Checkout/Order Information** ✨ NEW
**From:** Checkout page (all customer payment info)
**To:** HubSpot Contact
**Data Synced:**
- Full Name
- Email Address
- Phone Number
- Delivery Address
- City
- Postcode
- Country
- **Order Details:**
  - Items purchased (with quantities & prices)
  - Subtotal
  - Shipping cost
  - Total amount
  - Shipping method
  - Order date
- Lead Status: "CUSTOMER"
- Lifecycle Stage: "Customer"

**Example:** Customer completes purchase → Automatically updated in HubSpot with full customer profile & order history

---

## 🔄 Data Integration Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    SHYNE WEBSITE                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📧 Newsletter          Form Fields       Checkout          │
│     Subscription        (Contact Form,    (Payment Info)    │
│     (Footer)            Affiliate)        (Checkout Page)   │
│       │                     │                  │            │
│       └─────────────────────┴──────────────────┘            │
│                    │                                         │
│            /api/newsletter                                   │
│            /api/contact                                      │
│            /api/affiliate                                    │
│            /api/order                                        │
│                    │                                         │
│                    ↓                                         │
├─────────────────────────────────────────────────────────────┤
│              HubSpot CRM Backend (server.js)                │
├─────────────────────────────────────────────────────────────┤
│  Validates, formats, & syncs data                           │
│                    │                                         │
│                    ↓                                         │
├─────────────────────────────────────────────────────────────┤
│              HubSpot API (Contacts Object)                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📱 Your HubSpot Dashboard (https://app.hubspot.com/)      │
│      • View all contacts                                    │
│      • See customer profiles                                │
│      • Track order history                                  │
│      • Create workflows & automation                        │
│      • Build email campaigns                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Setup Reminder

### Already have HubSpot?
1. Go to Settings → Integrations → Private apps
2. Generate API key
3. Add to `.env`: `HUBSPOT_API_KEY=pat-...`
4. Run: `npm run dev:all`

### Don't have HubSpot yet?
1. Sign up free: https://www.hubspot.com/
2. Complete steps above

---

## 📱 HubSpot Dashboard Features

### Contact Management
- **View all contacts** from all sources (newsletter, forms, customers)
- **Filter by type**: Subscribers, Leads, Customers, Affiliates
- **See full customer profile**: All interactions in one place

### Customer Insights
- **Order history** - See what each customer purchased
- **Lifetime value** - Track total spent
- **Contact history** - All previous interactions
- **Social media** - Affiliate TikTok & Instagram handles

### Automation & Workflows
- **Auto-response** when someone joins newsletter
- **Affiliate follow-up** sequence
- **Customer re-engagement** campaigns
- **Order confirmation** emails
- **Upsell sequences** for repeat purchases

### Reports & Analytics
- **Lead source tracking** - Where do customers come from?
- **Conversion rates** - Newsletter → Customer conversion
- **Affiliate performance** - Track which affiliates drive sales
- **Revenue reports** - Total sales by period

---

## 🎯 Example Workflows to Create

### Workflow 1: Welcome New Newsletter Subscribers
```
Trigger: Contact added with hs_lead_status = "SUBSCRIBER"
Action 1: Send welcome email
Action 2: Add tag: "Newsletter Subscriber"
Action 3: Notify via Slack (optional)
```

### Workflow 2: Follow Up with Affiliates
```
Trigger: Contact added with TikTok Handle & Instagram Handle
Action 1: Send affiliate welcome email
Action 2: Add tag: "Affiliate Applicant"
Action 3: Assign to team member for review
Action 4: Send 3-day follow-up if not responded
```

### Workflow 3: Customer Onboarding
```
Trigger: Contact updated to lifecycle stage = "Customer"
Action 1: Send "Thank you for your order" email
Action 2: Add tag: "Customer"
Action 3: Add to "Post-Purchase" list
Action 4: Send product care tips (automated sequence)
```

### Workflow 4: Re-Engage Inactive Customers
```
Trigger: Last order was 90+ days ago
Action 1: Send "We miss you" email
Action 2: Offer 15% discount on next purchase
Action 3: Add to "Win-back campaign"
```

---

## 📊 Custom Properties Created in HubSpot

These fields automatically appear in your HubSpot contacts:

**Newsletter Fields:**
- `newsletter_signup_date` - When they subscribed

**Contact Form Fields:**
- `message` - Their query/message

**Affiliate Fields:**
- `tiktok_handle` - TikTok username
- `instagram_handle` - Instagram username
- `affiliate_application_date` - When they applied

**Order Fields:**
- `order_date` - When order was placed
- `order_value` - Total amount spent
- `order_items` - What was purchased
- `order_shipping_method` - Delivery method
- `order_subtotal` - Subtotal before shipping
- `order_shipping_cost` - Shipping amount
- `address` - Delivery address
- `city` - City
- `zip` - Postcode
- `country` - Country

---

## 🔍 Viewing Your Data in HubSpot

### See Newsletter Subscribers
1. Go to **Contacts**
2. Click **Filters**
3. Filter by: `hs_lead_status = "SUBSCRIBER"`
4. See all newsletter subscribers!

### See Your Customers
1. Go to **Contacts**
2. Click **Filters**
3. Filter by: `hs_lead_status = "CUSTOMER"`
4. Click on any customer to see their order history

### See Affiliate Applicants
1. Go to **Contacts**
2. Click **Filters**
3. Filter by: `tiktok_handle` exists (or `instagram_handle` exists)
4. See all affiliate applicants with their social handles

### See Contact Form Submissions
1. Go to **Contacts**
2. Click **Filters**
3. Filter by: `message` exists
4. See all contact inquiries

---

## 📈 Business Insights You Can Track

✅ **Customer Acquisition**
- How many customers this week/month?
- Where do they come from (newsletter, forms, etc)?
- Conversion rate from subscriber → customer

✅ **Revenue Tracking**
- Total revenue by period
- Average order value
- Customer lifetime value

✅ **Affiliate Program**
- How many affiliate applicants?
- Performance by affiliate

✅ **Newsletter Performance**
- Subscriber growth rate
- Newsletter subscriber → customer conversion

✅ **Customer Behavior**
- Most popular products
- Average order value
- Repeat purchase rate

---

## 🚨 Troubleshooting

### "Contacts not appearing in HubSpot"
- Check server is running: `npm run dev:all`
- Verify API key in `.env` file
- Check server logs for errors
- Make sure HubSpot API key has correct permissions

### "Order information not syncing"
- Make sure checkout page is using form data correctly
- Check server logs for the `/api/order` endpoint
- Verify HubSpot API key allows contact updates

### "Newsletter subscriptions not working"
- Verify email validation works
- Check server logs for `/api/newsletter` endpoint
- Make sure `HUBSPOT_API_KEY` is set in `.env`

---

## 🎉 What You Can Do Now

✅ **Manage all customer relationships** in one place
✅ **Automate follow-up** emails & communications
✅ **Track customer lifetime value** automatically
✅ **Build email campaigns** to subscribers
✅ **Monitor affiliate program** performance
✅ **Generate sales reports** with real data
✅ **Segment customers** for targeted marketing
✅ **Create workflows** for business automation

---

## 📚 Next Steps

1. **Set up welcome workflows** for new subscribers
2. **Create affiliate review process** in HubSpot
3. **Build customer segments** for targeted campaigns
4. **Enable HubSpot notifications** for new orders
5. **Connect HubSpot email** for automated responses
6. **Set up reports** to track KPIs

---

## 💡 Pro Tips

1. **Mobile App** - Download HubSpot CRM mobile app to check on customers anywhere
2. **Slack Integration** - Get notified in Slack when new customers/orders arrive
3. **Email Sync** - Connect your Gmail/Outlook to auto-log customer emails
4. **Landing Pages** - Use HubSpot's free landing page builder for campaigns
5. **Forms** - Create forms directly in HubSpot for more control
6. **Chatbot** - Add HubSpot chatbot to website for instant lead capture

---

## 🔗 Useful Links

- HubSpot Dashboard: https://app.hubspot.com
- HubSpot Knowledge Base: https://knowledge.hubspot.com
- HubSpot API Docs: https://developers.hubspot.com
- Workflows Guide: https://knowledge.hubspot.com/workflows/create-workflows

---

**🎊 Your CRM is now live and collecting all customer data automatically!**

Every newsletter subscriber, form submission, affiliate application, and order is instantly added to your HubSpot CRM. You can now scale your business with complete customer insights! 🚀
