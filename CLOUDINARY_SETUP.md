# Cloudinary Setup Guide

To enable image uploads in your blog admin panel, you need to set up Cloudinary.

## Step 1: Create a Cloudinary Account

1. Go to [https://cloudinary.com/](https://cloudinary.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Get Your Cloud Credentials

1. After logging in, go to your **Dashboard**
2. Look for your **Cloud Name** (e.g., `your-cloud-name`)
3. Go to **Settings** → **Upload**
4. Scroll down to **Upload presets** and click **Add upload preset**
5. Set the following:
   - **Signing Mode**: Unsigned
   - **Folder**: blog_images
   - **Auto-generate**: Skip cropping
6. Save the preset and copy the **Name** (e.g., `blog_preset`)

## Step 3: Update Your Code

Open `src/pages/BlogAdmin.jsx` and replace these values:

```javascript
cloudName: 'YOUR_CLOUD_NAME',      // Replace with your cloud name
uploadPreset: 'YOUR_UPLOAD_PRESET', // Replace with your upload preset name
```

## Alternative: Manual Image URLs

If you don't want to set up Cloudinary, you can also:
1. Use image URLs from other hosting services (Imgur, Google Photos, etc.)
2. Host images in your project's `public/images` folder

## Free Tier Limits

Cloudinary's free plan includes:
- 25 GB bandwidth per month
- 1,000 transformations per month
- 500 MB storage

## Testing

1. Start your development server
2. Go to `/blog-admin`
3. Click "Choose Image" - the Cloudinary upload widget should open
4. Upload an image and it will be added to your blog post
