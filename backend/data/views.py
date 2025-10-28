import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
from django.db import transaction
from . import models as m
from . import serializers as s

@csrf_exempt
def register_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            name = data.get("name")
            email = data.get("email")
            password = data.get("password")
            provider = data.get("provider", "credentials")
            picture = data.get("picture", "")
            role = data.get("role", "user")

            if m.User.objects.filter(email=email).exists():
                return JsonResponse({"error": "Email sudah terdaftar"}, status=400)

            if not password:
                return JsonResponse({"error": "Password harus diisi"}, status=400)

            user = m.User.objects.create(
                name=name,
                email=email,
                password=make_password(password) if password else "",
                provider=provider,
                picture=picture,
                role=role
            )
            
            return JsonResponse({
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "provider": user.provider,
                "role": user.role
            })
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def login_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            user = m.User.objects.filter(email=email).first()
            if not user:
                return JsonResponse({"error": "User tidak ditemukan"}, status=404)

            # cek password
            if user.password and check_password(password, user.password):
                # Set user ke session
                request.session['user_id'] = user.id
                request.session['user_email'] = user.email
                
                return JsonResponse({
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                    "provider": user.provider,
                    "role": user.role
                })
            return JsonResponse({"error": "Password salah"}, status=401)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


def check_user(request):
    email = request.GET.get("email")
    exists = m.User.objects.filter(email=email).exists()
    return JsonResponse({"exists": exists})


def get_destinasi(request):
    destinasi = list(m.Destinasi.objects.values())
    return JsonResponse(destinasi, safe=False)


def get_destinasi_by_id(request, destinasi_id):
    try:
        destinasi = m.Destinasi.objects.get(id=destinasi_id)
        data = {
            'id': destinasi.id,
            'nama_destinasi': destinasi.nama_destinasi,
            'lokasi': destinasi.lokasi,
            'deskripsi': destinasi.deskripsi,
            'kategori': destinasi.kategori,
            'gambar': destinasi.gambar,
        }
        return JsonResponse(data)
    except m.Destinasi.DoesNotExist:
        return JsonResponse({"error": "Destinasi tidak ditemukan"}, status=404)


def get_user_from_request(request):
    user_id = request.session.get('user_id')
    if user_id:
        try:
            return m.User.objects.get(id=user_id)
        except m.User.DoesNotExist:
            pass
    
    # Try NextAuth email from header
    user_email = request.headers.get('X-User-Email')
    if user_email:
        try:
            return m.User.objects.get(email=user_email)
        except m.User.DoesNotExist:
            pass
    
    return None


@csrf_exempt
def get_rencana_user(request):
    user = get_user_from_request(request)
    if not user:
        return JsonResponse({"error": "Unauthorized"}, status=401)
    
    if request.method == "GET":
        # Query dengan optimisasi
        rencana_list = m.RencanaLiburan.objects.filter(
            user=user
        ).select_related(
            'destinasi', 'user'
        ).prefetch_related(
            'aktivitas'
        ).order_by('-dibuat_pada')
        
        # Serialize data
        serializer = s.RencanaLiburanLengkapSerializer(rencana_list, many=True)
        
        return JsonResponse({
            'status': 'success',
            'total': rencana_list.count(),
            'data': serializer.data
        })
    
    elif request.method == "POST":
        try:
            data = json.loads(request.body)
            
            # Validasi input
            destinasi_id = data.get('destinasi')
            tanggal_mulai = data.get('tanggal_mulai')
            tanggal_selesai = data.get('tanggal_selesai')
            jumlah_orang = data.get('jumlah_orang', 1)
            estimasi_biaya = data.get('estimasi_biaya', 0)
            catatan = data.get('catatan', '')
            aktivitas_list = data.get('aktivitas', [])
            
            if not destinasi_id:
                return JsonResponse({"error": "Destinasi harus dipilih"}, status=400)
            
            if not tanggal_mulai or not tanggal_selesai:
                return JsonResponse({"error": "Tanggal mulai dan selesai harus diisi"}, status=400)
            
            # Cek destinasi exists
            try:
                destinasi = m.Destinasi.objects.get(id=destinasi_id)
            except m.Destinasi.DoesNotExist:
                return JsonResponse({"error": "Destinasi tidak ditemukan"}, status=404)
            
            # Buat rencana liburan dengan transaction
            with transaction.atomic():
                rencana = m.RencanaLiburan.objects.create(
                    user=user,
                    destinasi=destinasi,
                    tanggal_mulai=tanggal_mulai,
                    tanggal_selesai=tanggal_selesai,
                    jumlah_orang=jumlah_orang,
                    estimasi_biaya=estimasi_biaya,
                    catatan=catatan
                )
                
                # Buat aktivitas
                for aktivitas_data in aktivitas_list:
                    nama_aktivitas = aktivitas_data.get('nama_aktivitas', '').strip()
                    if nama_aktivitas:  # Only create if name is not empty
                        m.AktivitasRencana.objects.create(
                            rencana=rencana,
                            nama_aktivitas=nama_aktivitas,
                            waktu=aktivitas_data.get('waktu') or None,
                            keterangan=aktivitas_data.get('keterangan', '')
                        )
            
            # Return created data
            serializer = s.RencanaLiburanLengkapSerializer(rencana)
            return JsonResponse({
                'status': 'success',
                'message': 'Rencana liburan berhasil dibuat',
                'data': serializer.data
            }, status=201)
            
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def get_detail_rencana(request, rencana_id):

    user = get_user_from_request(request)
    if not user:
        return JsonResponse({"error": "Unauthorized"}, status=401)
    
    try:
        rencana = m.RencanaLiburan.objects.select_related(
            'destinasi', 'user'
        ).prefetch_related(
            'aktivitas'
        ).get(id=rencana_id, user=user)
        
        serializer = s.RencanaLiburanLengkapSerializer(rencana)
        
        return JsonResponse({
            'status': 'success',
            'data': serializer.data
        })
        
    except m.RencanaLiburan.DoesNotExist:
        return JsonResponse({
            'status': 'error',
            'message': 'Rencana tidak ditemukan'
        }, status=404)


@csrf_exempt
def logout_user(request):
    """Logout user and clear session"""
    if request.method == "POST":
        request.session.flush()
        return JsonResponse({"message": "Logout berhasil"})
    return JsonResponse({"error": "Method not allowed"}, status=405)


@csrf_exempt
def check_session(request):
    """Check if user is logged in via session"""
    user_id = request.session.get('user_id')
    user_email = request.session.get('user_email')
    
    if user_id:
        try:
            user = m.User.objects.get(id=user_id)
            return JsonResponse({
                "logged_in": True,
                "user": {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                    "role": user.role
                }
            })
        except m.User.DoesNotExist:
            return JsonResponse({"logged_in": False, "error": "User not found"})
    
    return JsonResponse({"logged_in": False})


@csrf_exempt
def sync_user(request):
    """Sync user from NextAuth to Django database"""
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    
    try:
        data = json.loads(request.body)
        email = data.get('email')
        name = data.get('name')
        provider = data.get('provider', 'nextauth')
        
        if not email:
            return JsonResponse({"error": "Email is required"}, status=400)
        
        # Check if user already exists
        user, created = m.User.objects.get_or_create(
            email=email,
            defaults={
                'name': name or email.split('@')[0],
                'password': '',  # No password for OAuth users
                'provider': provider,
                'role': 'user'
            }
        )
        
        # Update name if changed
        if not created and name and user.name != name:
            user.name = name
            user.save()
        
        return JsonResponse({
            "success": True,
            "created": created,
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "provider": user.provider,
                "role": user.role
            }
        })
        
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)