# EmailJS Setup Guide

Your website now supports automatic email sending via EmailJS. Here's how to configure it:

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Create an Email Service

1. In your EmailJS dashboard, click **Email Services** in the left sidebar
2. Click **Add New Service** and select **Gmail** (or your preferred email provider)
3. Follow the authorization steps to connect your Gmail account
4. Give your service a name (e.g., "Gmail - Girlies Luxe")
5. Note the **Service ID** (e.g., `service_xxxxx`)

## Step 3: Create an Email Template

1. Click **Email Templates** in the left sidebar
2. Click **Create New Template**
3. Use the following template for **Booking Form**:

```
BOOKING REQUEST - Girlies Luxe

CLIENT DETAILS
Name: {{client_name}}
Email: {{client_email}}
Phone: {{client_phone}}

SERVICE
Service: {{service_name}}
Duration: {{service_duration}}
Price: {{service_price}}

APPOINTMENT
Date: {{appointment_date}}
Time: {{appointment_time}}

NOTES
{{notes}}
```

4. Save the template and note the **Template ID** (e.g., `template_xxxxx`)

5. Create another template for **Contact Form**:

```
NEW MESSAGE FROM WEBSITE

Name: {{client_name}}
Email: {{client_email}}
Phone: {{client_phone}}
Event Date: {{event_date}}

Message:
{{message}}
```

### Template Variables for Booking (with Google Calendar support):

Your booking template should include these variables:
- `{{client_name}}` - Client's name
- `{{client_email}}` - Client's email
- `{{client_phone}}` - Client's phone (numbers only)
- `{{service_name}}` - Selected service name
- `{{service_duration}}` - Service duration
- `{{service_price}}` - Service price
- `{{appointment_date}}` - Formatted appointment date
- `{{appointment_time}}` - Appointment time
- `{{notes}}` - Additional notes
- `{{cal_start}}` - Google Calendar start time (format: YYYYMMDDTHHMMSS)
- `{{cal_end}}` - Google Calendar end time (format: YYYYMMDDTHHMMSS)
- `{{current_year}}` - Current year
- `{{studio_location}}` - Studio address (Nungua Kantamato, Accra, Ghana)
- `{{studio_lat}}` - Studio latitude (5.6068032)
- `{{studio_lng}}` - Studio longitude (-0.1021721)
- `{{google_maps_link}}` - Full Google Maps link to studio

To add a Google Calendar link in your email template, you can use:
```
Google Calendar: https://www.google.com/calendar/render?action=TEMPLATE&text={{service_name}}&dates={{cal_start}}/{{cal_end}}&details=Client:{{client_name}}%0APhone:{{client_phone}}%0ANotes:{{notes}}
```

To add a location link in your email template, you can use:
```
📍 Location: {{studio_location}}
🗺️ Google Maps: {{google_maps_link}}
```

## Step 4: Get Your Public Key

1. Click **Account** in the left sidebar
2. Look for **Public Key** (e.g., `xxxxxxxxxxxxxxxxxx`)

## Step 5: Update Your Code

Open the following files and replace the placeholder values:

### For `src/pages/Booking.jsx`:

```javascript
await emailjs.send(
    'YOUR_SERVICE_ID',     // Replace with your EmailJS service ID
    'YOUR_TEMPLATE_ID',   // Replace with your EmailJS template ID
    templateParams,
    'YOUR_PUBLIC_KEY'     // Replace with your EmailJS public key
);
```

### For `src/pages/Contact.jsx`:

```javascript
await emailjs.send(
    'YOUR_SERVICE_ID',     // Replace with your EmailJS service ID
    'YOUR_TEMPLATE_ID',   // Replace with your EmailJS template ID
    templateParams,
    'YOUR_PUBLIC_KEY'     // Replace with your EmailJS public key
);
```

## Free Tier Limits

The free EmailJS plan includes:
- 200 emails per month
- Up to 2 email templates
- Community support

## Testing

After configuration, test your forms:
1. Fill out the booking or contact form on your website
2. Click submit
3. You should receive an email at kofilartey12@gmail.com

If emails aren't being sent, check the browser console (F12) for any error messages.
