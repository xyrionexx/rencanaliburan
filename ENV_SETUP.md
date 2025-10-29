# Environment Variables Setup

## Frontend Configuration

Buat file `.env.local` di folder `frontend/` dengan isi berikut:

```env
# API Configuration - URL backend Django
NEXT_PUBLIC_API_URL=http://api.borrowfy.site

# NextAuth Configuration
NEXTAUTH_SECRET=generate-random-secret-key-here
NEXTAUTH_URL=http://lumotrip.borrowfy.site

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth (Optional)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

### Cara Generate NEXTAUTH_SECRET

```bash
# Menggunakan OpenSSL
openssl rand -base64 32

# Atau menggunakan Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Untuk Development Local

Jika ingin test di local, ubah nilai berikut:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXTAUTH_URL=http://localhost:3000
```

## Untuk Production/Server

Gunakan domain yang sebenarnya:

```env
NEXT_PUBLIC_API_URL=https://api.borrowfy.site
NEXTAUTH_URL=https://lumotrip.borrowfy.site
```

**PENTING**: Jangan commit file `.env.local` ke Git! File ini sudah ada di `.gitignore`.
