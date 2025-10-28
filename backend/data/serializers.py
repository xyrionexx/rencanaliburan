from rest_framework import serializers
from .models import User, Destinasi, RencanaLiburan, AktivitasRencana

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'provider', 'picture', 'role', 'created_at']
        extra_kwargs = {'password': {'write_only': True}}

class DestinasiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destinasi
        fields = ['id', 'nama_destinasi', 'lokasi', 'deskripsi', 'kategori', 'gambar']

class AktivitasSerializer(serializers.ModelSerializer):
    class Meta:
        model = AktivitasRencana
        fields = ['id', 'nama_aktivitas', 'waktu', 'keterangan']

class RencanaLiburanLengkapSerializer(serializers.ModelSerializer):
    destinasi = DestinasiSerializer(read_only=True)
    aktivitas = AktivitasSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = RencanaLiburan
        fields = [
            'id',
            'user',
            'destinasi',
            'tanggal_mulai',
            'tanggal_selesai',
            'jumlah_orang',
            'estimasi_biaya',
            'catatan',
            'dibuat_pada',
            'aktivitas'
        ]

class RencanaLiburanCreateSerializer(serializers.ModelSerializer):
    aktivitas = AktivitasSerializer(many=True, required=False)
    
    class Meta:
        model = RencanaLiburan
        fields = [
            'destinasi',
            'tanggal_mulai',
            'tanggal_selesai',
            'jumlah_orang',
            'estimasi_biaya',
            'catatan',
            'aktivitas'
        ]