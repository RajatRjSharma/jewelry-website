# Zoho Mail Business Email Setup Guide

Complete guide to setting up professional email addresses for your domain (e.g., support@jewelsbynavkush.com).

## 📋 Table of Contents

- [Overview](#overview)
- [What is Email Hosting?](#what-is-email-hosting)
- [Free Tier Details](#free-tier-details)
- [Prerequisites](#prerequisites)
- [Step 1: Sign Up for Zoho Mail](#step-1-sign-up-for-zoho-mail)
- [Step 2: Verify Your Domain](#step-2-verify-your-domain)
- [Step 3: Configure DNS Records](#step-3-configure-dns-records)
- [Step 4: Create Email Accounts](#step-4-create-email-accounts)
- [Step 5: Access Your Email](#step-5-access-your-email)
- [Step 6: Configure Email Clients](#step-6-configure-email-clients)
- [Step 7: Set Up Email Forwarding](#step-7-set-up-email-forwarding)
- [Common Email Addresses](#common-email-addresses)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

**Zoho Mail** is a business email hosting service that allows you to create professional email addresses using your own domain name.

**What You'll Get:**
- ✅ Professional email addresses (support@jewelsbynavkush.com)
- ✅ Webmail interface
- ✅ Mobile apps (iOS & Android)
- ✅ IMAP/POP3 support
- ✅ Calendar and contacts
- ✅ 5GB storage per user (free plan)
- ✅ Up to 5 users (free plan)

**Perfect for:**
- Customer support emails
- Business inquiries
- Order confirmations
- Newsletter communications
- Professional branding

---

## 📧 What is Email Hosting?

**Email Hosting** (also called **Business Email** or **Custom Domain Email**) allows you to:

- Create email addresses using your domain name
- Send and receive emails professionally
- Manage multiple email accounts
- Access email from anywhere (web, mobile, desktop)

**Example:**
Instead of using `jewelsbynavkush@gmail.com`, you can use:
- `support@jewelsbynavkush.com`
- `info@jewelsbynavkush.com`
- `contact@jewelsbynavkush.com`
- `sales@jewelsbynavkush.com`

---

## 💰 Free Tier Details

### Zoho Mail Forever Free Plan

| Feature | Free Tier Limit |
|---------|----------------|
| **Users** | Up to 5 users |
| **Storage per User** | 5 GB |
| **Email Accounts** | Unlimited (within 5 users) |
| **Webmail** | ✅ Included |
| **Mobile Apps** | ✅ iOS & Android |
| **IMAP/POP3** | ✅ Supported |
| **Calendar** | ✅ Included |
| **Contacts** | ✅ Included |
| **Email Forwarding** | ✅ Supported |
| **Cost** | **Free Forever** |

### What's Included

- ✅ **5 Users** - Create up to 5 email accounts
- ✅ **5GB Storage** - Per user (25GB total for 5 users)
- ✅ **Webmail Interface** - Access from any browser
- ✅ **Mobile Apps** - iOS and Android apps
- ✅ **IMAP/POP3** - Use with Outlook, Thunderbird, etc.
- ✅ **Calendar** - Integrated calendar system
- ✅ **Contacts** - Contact management
- ✅ **Email Forwarding** - Forward emails to other addresses
- ✅ **Custom Domain** - Use your own domain name

### Limitations

- ⚠️ **5 Users Maximum** - Free plan limited to 5 accounts
- ⚠️ **5GB per User** - May need to upgrade for more storage
- ⚠️ **No Custom Domain in Free Plan** - Wait, actually Zoho Mail Free DOES support custom domains!

---

## 📦 Prerequisites

Before starting, ensure you have:

- ✅ A domain name (e.g., jewelsbynavkush.com)
- ✅ Access to your domain's DNS settings
- ✅ A Zoho account (or create one during signup)
- ✅ Basic understanding of DNS records

**Where to Manage DNS:**
- Your domain registrar (GoDaddy, Namecheap, etc.)
- Your hosting provider
- DNS management panel

---

## 🚀 Step 1: Sign Up for Zoho Mail

1. **Visit Zoho Mail**
   - Go to [mail.zoho.com](https://mail.zoho.com)
   - Click **"Sign Up Now"** or **"Get Started"**

2. **Choose Plan**
   - Select **"Forever Free Plan"**
   - Click **"Get Started"**

3. **Enter Domain Name**
   - Enter your domain: `jewelsbynavkush.com`
   - Click **"Add Domain"**

4. **Create Zoho Account** (if needed)
   - Enter your email address
   - Create a password
   - Verify your email

5. **Organization Details**
   - Enter organization name: "Jewels by NavKush"
   - Select country
   - Click **"Continue"**

---

## ✅ Step 2: Verify Your Domain

Zoho needs to verify that you own the domain.

### Method 1: TXT Record (Recommended)

1. **Get Verification Record**
   - In Zoho Mail setup, you'll see a TXT record
   - Copy the record value (looks like: `zoho-verification=xxxxx`)

2. **Add TXT Record to DNS**
   - Log in to your domain registrar/hosting DNS panel
   - Go to DNS Management
   - Add a new **TXT** record:
     - **Name/Host**: `@` or leave blank (depends on provider)
     - **Type**: `TXT`
     - **Value**: The verification string from Zoho
     - **TTL**: `3600` (or default)

3. **Save and Wait**
   - Save the DNS record
   - Wait 5-30 minutes for DNS propagation
   - Return to Zoho Mail and click **"Verify"**

### Method 2: CNAME Record

1. **Get CNAME Record**
   - Zoho will provide a CNAME record
   - Copy the hostname and value

2. **Add CNAME Record**
   - Add a new **CNAME** record:
     - **Name/Host**: The hostname from Zoho (e.g., `zoho-verification`)
     - **Type**: `CNAME`
     - **Value**: The value from Zoho
     - **TTL**: `3600`

3. **Verify**
   - Wait for DNS propagation
   - Click **"Verify"** in Zoho Mail

### Common DNS Providers

**GoDaddy:**
- DNS Management → Records → Add Record

**Namecheap:**
- Domain List → Manage → Advanced DNS → Add New Record

**Cloudflare:**
- DNS → Records → Add Record

**Google Domains:**
- DNS → Custom Records → Add Record

---

## ⚙️ Step 3: Configure DNS Records

After domain verification, configure DNS records for email delivery.

### 3.1: MX Records (Mail Exchange)

MX records tell email servers where to deliver emails for your domain.

1. **Get MX Records from Zoho**
   - In Zoho Mail setup, you'll see MX records
   - Usually looks like:
     ```
     mx.zoho.com (Priority: 10)
     mx2.zoho.com (Priority: 20)
     ```

2. **Add MX Records**
   - Go to your DNS management panel
   - Add **MX** records:
     - **Name/Host**: `@` or leave blank
     - **Type**: `MX`
     - **Priority**: `10`
     - **Value**: `mx.zoho.com`
     - **TTL**: `3600`
   
   - Add second MX record:
     - **Name/Host**: `@` or leave blank
     - **Type**: `MX`
     - **Priority**: `20`
     - **Value**: `mx2.zoho.com`
     - **TTL**: `3600`

3. **Save Records**
   - Save both MX records
   - Wait 15-60 minutes for propagation

### 3.2: SPF Record (Sender Policy Framework)

SPF records authorize Zoho to send emails on behalf of your domain.

1. **Get SPF Record**
   - Zoho provides: `v=spf1 include:zoho.com ~all`

2. **Add TXT Record for SPF**
   - Add a new **TXT** record:
     - **Name/Host**: `@` or leave blank
     - **Type**: `TXT`
     - **Value**: `v=spf1 include:zoho.com ~all`
     - **TTL**: `3600`

3. **Save Record**

### 3.3: DKIM Record (DomainKeys Identified Mail)

DKIM adds a digital signature to your emails for authentication.

1. **Get DKIM Record**
   - In Zoho Mail, go to **"Domain Authentication"**
   - Click **"Generate DKIM Keys"**
   - Copy the DKIM record (TXT record)

2. **Add DKIM TXT Record**
   - Add a new **TXT** record:
     - **Name/Host**: The selector from Zoho (e.g., `zmail._domainkey`)
     - **Type**: `TXT`
     - **Value**: The long DKIM string from Zoho
     - **TTL**: `3600`

3. **Save Record**

### 3.4: DMARC Record (Optional but Recommended)

DMARC helps prevent email spoofing.

1. **Add DMARC TXT Record**
   - Add a new **TXT** record:
     - **Name/Host**: `_dmarc`
     - **Type**: `TXT`
     - **Value**: `v=DMARC1; p=none; rua=mailto:admin@jewelsbynavkush.com`
     - **TTL**: `3600`

2. **Save Record**

### Complete DNS Records Summary

Your DNS should have:

```
Type    Name              Value                          Priority
----    ----              -----                          --------
TXT     @                 zoho-verification=xxxxx        -
MX      @                 mx.zoho.com                    10
MX      @                 mx2.zoho.com                   20
TXT     @                 v=spf1 include:zoho.com ~all   -
TXT     zmail._domainkey  (long DKIM string)             -
TXT     _dmarc            v=DMARC1; p=none; ...          -
```

---

## 👥 Step 4: Create Email Accounts

1. **Access Zoho Mail Admin Console**
   - Go to [mailadmin.zoho.com](https://mailadmin.zoho.com)
   - Log in with your Zoho account

2. **Navigate to Users**
   - Click **"Users"** in the sidebar
   - Click **"Add User"**

3. **Create Email Account**
   - **Email Address**: Enter the local part (e.g., `support`)
   - Full address will be: `support@jewelsbynavkush.com`
   - **Display Name**: "Support Team" (or your preference)
   - **Password**: Create a strong password
   - **Storage**: 5GB (free tier limit)

4. **Create Additional Accounts**
   Repeat for other email addresses:
   - `info@jewelsbynavkush.com`
   - `contact@jewelsbynavkush.com`
   - `sales@jewelsbynavkush.com`
   - `orders@jewelsbynavkush.com`

5. **Set Permissions** (Optional)
   - Configure user permissions
   - Set up email forwarding if needed

---

## 📱 Step 5: Access Your Email

### Webmail Access

1. **Visit Zoho Mail**
   - Go to [mail.zoho.com](https://mail.zoho.com)
   - Log in with: `support@jewelsbynavkush.com`
   - Enter your password

2. **Features Available**
   - ✅ Send and receive emails
   - ✅ Calendar
   - ✅ Contacts
   - ✅ Tasks
   - ✅ Notes

### Mobile Apps

1. **Download Zoho Mail App**
   - **iOS**: [App Store](https://apps.apple.com/app/zoho-mail/id922741138)
   - **Android**: [Google Play](https://play.google.com/store/apps/details?id=com.zoho.mail)

2. **Configure Account**
   - Open the app
   - Add account
   - Enter: `support@jewelsbynavkush.com`
   - Enter password
   - Select account type: **IMAP** or **Exchange**

---

## 💻 Step 6: Configure Email Clients

You can use Zoho Mail with desktop email clients.

### Outlook Configuration

1. **Add Account**
   - Open Outlook
   - Go to File → Add Account
   - Enter: `support@jewelsbynavkush.com`
   - Enter password
   - Select **IMAP**

2. **Server Settings**
   - **Incoming Mail Server**: `imap.zoho.com`
   - **Port**: `993` (SSL)
   - **Outgoing Mail Server**: `smtp.zoho.com`
   - **Port**: `465` (SSL) or `587` (TLS)

### Thunderbird Configuration

1. **Add Account**
   - Open Thunderbird
   - Tools → Account Settings → Add Mail Account
   - Enter email and password

2. **Manual Configuration**
   - **Incoming**: `imap.zoho.com`, Port `993`, SSL
   - **Outgoing**: `smtp.zoho.com`, Port `465`, SSL

### Gmail (Using IMAP)

1. **Add Account to Gmail**
   - Gmail Settings → Accounts → Add Mail Account
   - Enter Zoho email address
   - Use IMAP settings above

### IMAP/POP3 Settings Summary

```
Incoming Mail (IMAP):
Server: imap.zoho.com
Port: 993
Security: SSL/TLS

Outgoing Mail (SMTP):
Server: smtp.zoho.com
Port: 465 (SSL) or 587 (TLS)
Security: SSL/TLS
Authentication: Required
```

---

## 📬 Step 7: Set Up Email Forwarding

Forward emails from one address to another.

### Forward to Another Email

1. **Access Admin Console**
   - Go to [mailadmin.zoho.com](https://mailadmin.zoho.com)
   - Select your domain

2. **Navigate to Email Forwarding**
   - Go to **"Users"** → Select user
   - Click **"Email Forwarding"**

3. **Add Forwarding Rule**
   - Enter forwarding address (e.g., your personal Gmail)
   - Choose: Forward and keep copy, or Forward only
   - Save

### Create Alias Emails

Aliases forward to existing accounts without creating new users.

1. **Create Alias**
   - Go to **"Users"** → Select user
   - Click **"Aliases"**
   - Add alias: `info@jewelsbynavkush.com`
   - Emails to this alias will go to the main account

---

## 📧 Common Email Addresses

Here are recommended email addresses for your jewelry website:

### Essential Addresses

| Email Address | Purpose | Who Manages |
|--------------|---------|-------------|
| `support@jewelsbynavkush.com` | Customer support | Support team |
| `info@jewelsbynavkush.com` | General inquiries | Admin |
| `contact@jewelsbynavkush.com` | Contact form | Admin |
| `sales@jewelsbynavkush.com` | Sales inquiries | Sales team |
| `orders@jewelsbynavkush.com` | Order confirmations | Admin |

### Optional Addresses

| Email Address | Purpose |
|--------------|---------|
| `admin@jewelsbynavkush.com` | Administrative |
| `newsletter@jewelsbynavkush.com` | Newsletter |
| `careers@jewelsbynavkush.com` | Job applications |
| `partnerships@jewelsbynavkush.com` | Business partnerships |

### Using Aliases (Save User Slots)

Since you have 5 free users, use aliases for less critical addresses:

- Create main accounts: `support`, `info`, `sales`
- Use aliases for: `contact`, `orders`, `admin`

---

## ✅ Best Practices

### 1. Security

- ✅ **Strong Passwords** - Use complex passwords for all accounts
- ✅ **Two-Factor Authentication** - Enable 2FA in Zoho Mail
- ✅ **Regular Password Updates** - Change passwords periodically
- ✅ **Monitor Access** - Check login activity regularly

### 2. Organization

- ✅ **Use Folders** - Organize emails into folders
- ✅ **Filters** - Set up email filters for automatic sorting
- ✅ **Labels** - Use labels for categorization
- ✅ **Archive** - Archive old emails to save space

### 3. Professional Communication

- ✅ **Email Signatures** - Add professional email signatures
- ✅ **Response Times** - Set expectations for response times
- ✅ **Auto-Responders** - Set up out-of-office messages
- ✅ **Templates** - Create email templates for common responses

### 4. Backup

- ✅ **Regular Backups** - Export important emails
- ✅ **Forward Important Emails** - Forward to backup account
- ✅ **Archive Locally** - Use email client to archive

### 5. Monitoring

- ✅ **Check Spam Folder** - Regularly check spam
- ✅ **Monitor Deliverability** - Ensure emails are being delivered
- ✅ **Review DNS Records** - Periodically verify DNS settings

---

## 🔧 Troubleshooting

### Issue: "Domain verification failed"

**Solutions:**
- Wait 30-60 minutes for DNS propagation
- Verify TXT record is added correctly
- Check for typos in DNS record
- Use online DNS checker tools
- Ensure record is at root domain (@)

### Issue: "Emails not being received"

**Solutions:**
- Verify MX records are correct
- Check MX record priority (10, 20)
- Wait for DNS propagation (up to 48 hours)
- Check spam folder
- Verify email account is created in Zoho

### Issue: "Emails going to spam"

**Solutions:**
- Set up SPF record correctly
- Configure DKIM record
- Set up DMARC record
- Avoid spam trigger words
- Warm up new email accounts gradually

### Issue: "Cannot send emails"

**Solutions:**
- Verify SMTP settings
- Check port numbers (465 or 587)
- Ensure SSL/TLS is enabled
- Verify authentication is enabled
- Check if account is suspended

### Issue: "IMAP not working"

**Solutions:**
- Verify IMAP is enabled in Zoho Mail settings
- Check port 993 with SSL
- Verify username is full email address
- Check firewall settings
- Try different email client

### Issue: "DNS records not updating"

**Solutions:**
- Clear DNS cache
- Wait longer (up to 48 hours)
- Verify records with DNS checker
- Contact your domain registrar
- Check for conflicting records

### DNS Propagation Checkers

Use these tools to verify DNS records:
- [MXToolbox](https://mxtoolbox.com/)
- [DNS Checker](https://dnschecker.org/)
- [What's My DNS](https://www.whatsmydns.net/)

---

## 📚 Additional Resources

- [Zoho Mail Help Center](https://www.zoho.com/mail/help/)
- [Zoho Mail Setup Guide](https://www.zoho.com/mail/help/adminconsole/email-hosting-setup.html)
- [Zoho Mail Pricing](https://www.zoho.com/mail/zohomail-pricing.html)
- [DNS Record Types Explained](https://www.zoho.com/mail/help/adminconsole/dns-records-configuration.html)

---

## 🎉 Next Steps

1. ✅ Sign up for Zoho Mail
2. ✅ Verify your domain
3. ✅ Configure DNS records (MX, SPF, DKIM)
4. ✅ Create email accounts
5. ✅ Access webmail
6. ✅ Configure mobile apps
7. ✅ Set up email clients (optional)
8. ✅ Create email signatures
9. ✅ Test email sending/receiving

---

## 💡 Pro Tips

1. **Start with Essential Addresses**
   - Create `support@` and `info@` first
   - Add others as needed

2. **Use Aliases Wisely**
   - Save user slots by using aliases
   - Forward less critical emails

3. **Monitor Usage**
   - Check storage usage regularly
   - Archive old emails to free space

4. **Set Up Auto-Responders**
   - Create professional auto-replies
   - Set expectations for response times

5. **Integrate with Website**
   - Update contact forms to use new email
   - Add email to website footer
   - Update social media profiles

---

**Need Help?** Check the troubleshooting section or contact Zoho Mail support.
