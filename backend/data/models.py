from django.db import models
from django.contrib.auth.hashers import make_password, check_password

# Create your models here.
class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    provider = models.CharField(max_length=50, blank=True, null=True)  # google, github, credential
    picture = models.URLField(blank=True, null=True)
    role = models.CharField(max_length=50, default='user')  # admin/user
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
    def save(self, *args, **kwargs):
        if self.password and not self.password.startswith('pbkdf2_'):  # check if already hashed
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

class Destinasi(models.Model):
    id = models.AutoField(primary_key=True)
    nama_destinasi = models.CharField(max_length=150)
    lokasi = models.CharField(max_length=150)
    deskripsi = models.TextField(blank=True, null=True)
    kategori = models.CharField(max_length=100, blank=True, null=True)  # pantai, gunung, kota, dll
    gambar = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.nama_destinasi

class RencanaLiburan(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    destinasi = models.ForeignKey(Destinasi, on_delete=models.CASCADE)
    tanggal_mulai = models.DateField()
    tanggal_selesai = models.DateField()
    jumlah_orang = models.IntegerField(default=1)
    estimasi_biaya = models.DecimalField(max_digits=12, decimal_places=2)
    catatan = models.TextField(blank=True, null=True)
    dibuat_pada = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.name} - {self.destinasi.nama_destinasi}"

class AktivitasRencana(models.Model):
    id = models.AutoField(primary_key=True)
    rencana = models.ForeignKey(RencanaLiburan, on_delete=models.CASCADE, related_name="aktivitas")
    nama_aktivitas = models.CharField(max_length=150)
    waktu = models.TimeField(blank=True, null=True)
    keterangan = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.nama_aktivitas} ({self.rencana.id})"
