# Panduan Deployment - Rencana Liburan

## Konfigurasi Environment Variables

### Frontend (Next.js)

Buat file `.env.local` di folder `frontend/` dengan isi:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://api.borrowfy.site

# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://lumotrip.borrowfy.site

# Google OAuth (opsional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth (opsional)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

### Backend (Django)

Pastikan file `.env` atau `settings.py` di folder `backend/api/` sudah dikonfigurasi:

```python
# CORS Configuration
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:8000",
    "http://api.borrowfy.site",
    "http://lumotrip.borrowfy.site",
    "https://api.borrowfy.site",
    "https://lumotrip.borrowfy.site",
]

CORS_ALLOW_CREDENTIALS = True
```

## Deployment ke Server

### 1. Frontend (Next.js)

```bash
cd frontend

# Install dependencies
npm install

# Build untuk production
npm run build

# Start production server
npm start
```

Atau menggunakan PM2:
```bash
pm2 start npm --name "rencana-liburan-frontend" -- start
```

### 2. Backend (Django)

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Start dengan gunicorn
gunicorn api.wsgi:application --bind 0.0.0.0:8000
```

Atau menggunakan PM2:
```bash
pm2 start gunicorn --name "rencana-liburan-backend" -- api.wsgi:application --bind 0.0.0.0:8000
```

## Struktur API Endpoints

Semua API endpoints sudah dikonfigurasi di `frontend/src/config/api.ts`:

- **Auth**: `/api/login/`, `/api/register/`, `/api/sync-user/`
- **User**: `/api/users/check/?email={email}`
- **Destinasi**: `/api/destinasi/`, `/api/destinasi/{id}/`
- **Rencana**: `/api/rencana/`

## Checklist Deployment

- [ ] Set environment variables di server
- [ ] Update `NEXT_PUBLIC_API_URL` sesuai domain backend
- [ ] Update `NEXTAUTH_URL` sesuai domain frontend
- [ ] Pastikan CORS di backend sudah include domain frontend
- [ ] Test semua endpoint API
- [ ] Setup SSL/HTTPS untuk production
- [ ] Configure reverse proxy (Nginx/Apache)
- [ ] Setup database production
- [ ] Configure firewall rules

## Troubleshooting

### CORS Error
- Pastikan domain frontend ada di `CORS_ALLOWED_ORIGINS` backend
- Cek apakah `CORS_ALLOW_CREDENTIALS = True`

### API Connection Error
- Verifikasi `NEXT_PUBLIC_API_URL` di `.env.local`
- Pastikan backend server running dan accessible
- Cek network/firewall settings

### Authentication Issues
- Verifikasi `NEXTAUTH_SECRET` dan `NEXTAUTH_URL`
- Pastikan session cookies bisa di-set (CORS credentials)
- Cek OAuth credentials jika menggunakan Google/GitHub

## Monitoring

Gunakan PM2 untuk monitoring:
```bash
pm2 status
pm2 logs rencana-liburan-frontend
pm2 logs rencana-liburan-backend
pm2 monit
```

## Backup

Jangan lupa backup:
- Database (PostgreSQL/MySQL)
- File `.env` dan `.env.local`
- Media files (jika ada)
