# Email Configuration Example

To enable the email functionality in this application, create a `.env.local` file in the root of your frontend directory with the following variables:

```
# Email Configuration
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
```

## Notes:
1. For Gmail, you'll need to use an "App Password" instead of your regular account password
2. To create an App Password:
   - Enable 2-Step Verification on your Google Account
   - Go to your Google Account > Security > App Passwords
   - Select "Mail" as the app and your device
   - Generate and use the 16-character password

## Security:
- Never commit your `.env.local` file to version control
- Keep your app passwords secure
