# Secret Santa Wishlist Setup Instructions

## Problem
The wishlists were previously stored in browser localStorage, which meant each person could only see their own data on their device. To make wishlists visible to everyone, we need a shared backend.

## Solution
We've integrated JSONBin.io - a free JSON storage API that allows all participants to share wishlist data.

## Setup Steps

### 1. Create a JSONBin.io Account
1. Go to [https://jsonbin.io](https://jsonbin.io)
2. Click "Sign Up" (it's free!)
3. Verify your email address

### 2. Get Your API Key
1. Log in to JSONBin.io
2. Go to "API Keys" in the dashboard
3. Click "Create Access Key"
4. Give it a name like "Secret Santa"
5. Copy the API key (it will look like `$2a$10$...`)

### 3. Create a Bin (Storage Container)
1. In the JSONBin.io dashboard, click "Create Bin"
2. Name it "Secret Santa Wishlists"
3. Paste this initial data (copy everything between the curly braces, including the braces):

{"Annie":[],"Katie":[],"Andy":[],"Michelle":[],"Raoul":[],"Joyce":[],"Vernon":[]}

Or if the interface allows multi-line, use this formatted version:
{
"Annie":[],
"Katie":[],
"Andy":[],
"Michelle":[],
"Raoul":[],
"Joyce":[],
"Vernon":[]
}

4. Click "Create"
5. Copy the Bin ID (it will be shown in the URL or bin details)

### 4. Update Your Config File
1. Open `config.js` in your secret-santa folder
2. Replace `YOUR_API_KEY_HERE` with your actual API key
3. Replace `YOUR_BIN_ID_HERE` with your actual Bin ID

Example:
```javascript
const CONFIG = {
    API_KEY: '$2a$10$abcdef1234567890...', // Your actual key
    BIN_ID: '67890abcdef12345', // Your actual bin ID
    API_URL: 'https://api.jsonbin.io/v3'
};
```

### 5. Test It Out
1. Open `wishlist.html` in your browser
2. Select a person
3. Add a wishlist item
4. Open the page on another device or browser
5. You should see the same wishlist items!

## Features
- ✅ Wishlists are shared across all devices
- ✅ Real-time updates when items are added/removed
- ✅ Fallback to localStorage if API is unavailable
- ✅ Loading states and error handling
- ✅ Confirmation before deleting items

## Troubleshooting

### "Failed to save wishlist" error
- Check your internet connection
- Verify your API key and Bin ID are correct in `config.js`
- Make sure you're not exceeding JSONBin.io's free tier limits (100 requests/minute)

### Wishlists not syncing
- Clear your browser cache and reload
- Check the browser console (F12) for error messages
- Verify the Bin ID is correct

### Still using localStorage?
- If the API fails, the app automatically falls back to localStorage
- This means data won't sync, but the app will still work locally
- Fix your API credentials to enable syncing

## Free Tier Limits
JSONBin.io free tier includes:
- Unlimited bins
- 100 requests per minute
- 100 KB per bin
- Perfect for a small Secret Santa group!

## Security Note
The API key in `config.js` is visible to anyone who views the source code. This is acceptable for a private Secret Santa website, but don't use this approach for sensitive data. JSONBin.io's free tier is designed for non-sensitive public data.

## Need Help?
- JSONBin.io Documentation: https://jsonbin.io/api-reference
- Check browser console (F12) for error messages