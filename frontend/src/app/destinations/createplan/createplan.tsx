"use client";
import { useState, useEffect } from "react";
import type React from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Plus,
  Trash2,
  ArrowLeft,
  Clock,
} from "lucide-react";
import { useUserSync } from "@/hooks/useUserSync";

interface Destination {
  id: number;
  nama_destinasi: string;
  lokasi: string;
  deskripsi: string;
  kategori: string;
  gambar: string;
}

interface Activity {
  id?: number;
  nama_aktivitas: string;
  waktu: string;
  keterangan: string;
}

export default function RencanaLiburanPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const destinationId = searchParams.get("id");

  // Auto-sync user to Django database after NextAuth login
  useUserSync();

  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([
    { nama_aktivitas: "", waktu: "", keterangan: "" },
  ]);

  const [formData, setFormData] = useState({
    tanggal_mulai: "",
    tanggal_selesai: "",
    jumlah_orang: 1,
    estimasi_biaya: "",
    catatan: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Check NextAuth session
    if (status === "unauthenticated" || !session?.user?.email) {
      alert("Anda harus login terlebih dahulu");
      router.push("/login");
      setSaving(false);
      return;
    }

    // Basic validation
    if (!formData.tanggal_mulai || !formData.tanggal_selesai) {
      alert("Tanggal mulai dan selesai harus diisi");
      setSaving(false);
      return;
    }

    if (new Date(formData.tanggal_selesai) < new Date(formData.tanggal_mulai)) {
      alert("Tanggal selesai tidak boleh sebelum tanggal mulai");
      setSaving(false);
      return;
    }

    try {
      // Create the vacation plan
      const planData = {
        destinasi: destinationId,
        tanggal_mulai: formData.tanggal_mulai,
        tanggal_selesai: formData.tanggal_selesai,
        jumlah_orang: Number.parseInt(String(formData.jumlah_orang)) || 1,
        estimasi_biaya: Number.parseFloat(formData.estimasi_biaya) || 0,
        catatan: formData.catatan,
        aktivitas: activities.filter((act) => act.nama_aktivitas.trim() !== ""),
      };

      // Prepare headers with user email from NextAuth
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (session.user.email) {
        headers["X-User-Email"] = session.user.email;
      }

      const response = await fetch("http://api.borrowfy.site/api/rencana/", {
        method: "POST",
        headers,
        credentials: "include", // Important for session-based auth
        body: JSON.stringify(planData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          alert("Anda harus login terlebih dahulu");
          router.push("/login");
          return;
        }
        throw new Error(errorData.error || "Gagal menyimpan rencana");
      }

      const result = await response.json();
      alert("Rencana liburan berhasil dibuat!");
      router.push("/destinations/rencana");
    } catch (error) {
      console.error("Error:", error);
      alert(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const addActivity = () => {
    setActivities((prevActivities) => [
      ...prevActivities,
      { nama_aktivitas: "", waktu: "", keterangan: "" },
    ]);
  };

  const handleActivityChange = (
    index: number,
    field: keyof Activity,
    value: string
  ) => {
    setActivities((prevActivities) => {
      const newActivities = [...prevActivities];
      (newActivities[index][field] as string) = value;
      return newActivities;
    });
  };

  const removeActivity = (index: number) => {
    setActivities((prevActivities) =>
      prevActivities.filter((_, i) => i !== index)
    );
  };

  useEffect(() => {
    const fetchDestination = async () => {
      if (!destinationId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://api.borrowfy/api/destinasi/${destinationId}/`
        );
        if (!response.ok) throw new Error("Gagal memuat data destinasi");
        const data = await response.json();
        setDestination(data);
      } catch (error) {
        console.error("Error:", error);
        alert("Gagal memuat data destinasi");
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [destinationId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-muted border-t-primary"></div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-destructive text-lg">Destinasi tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-2xl font-semibold text-foreground">
            Buat Rencana Liburan
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Destination Card */}
        <div className="mb-8 rounded-lg overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="grid md:grid-cols-2 gap-6 p-6">
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-3 w-fit">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {destination.kategori}
                </span>
              </div>
              <h2 className="text-3xl font-semibold text-foreground mb-2">
                {destination.nama_destinasi}
              </h2>
              <p className="text-primary font-medium mb-4">
                {destination.lokasi}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {destination.deskripsi}
              </p>
            </div>
            {destination.gambar && (
              <div className="h-64 rounded-lg overflow-hidden">
                <img
                  src={destination.gambar || "/placeholder.svg"}
                  alt={destination.nama_destinasi}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Planning Details Section */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Detail Rencana
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  name="tanggal_mulai"
                  value={formData.tanggal_mulai}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tanggal Selesai
                </label>
                <input
                  type="date"
                  name="tanggal_selesai"
                  value={formData.tanggal_selesai}
                  onChange={handleInputChange}
                  min={formData.tanggal_mulai}
                  className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Jumlah Orang
                </label>
                <input
                  type="number"
                  name="jumlah_orang"
                  min="1"
                  value={formData.jumlah_orang}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-colors duration-200"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  Estimasi Biaya (Rp)
                </label>
                <input
                  type="number"
                  name="estimasi_biaya"
                  min="0"
                  value={formData.estimasi_biaya}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-colors duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Catatan Tambahan
              </label>
              <textarea
                name="catatan"
                value={formData.catatan}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-colors duration-200 resize-none"
                placeholder="Tulis catatan tambahan tentang rencana liburan Anda..."
              ></textarea>
            </div>
          </div>

          {/* Activities Section */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Aktivitas
              </h3>
              <button
                type="button"
                onClick={addActivity}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium text-sm"
              >
                <Plus className="w-4 h-4" />
                Tambah Aktivitas
              </button>
            </div>

            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="p-5 border border-border rounded-lg bg-muted/30 hover:border-primary/50 transition-colors duration-200"
                >
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nama Aktivitas
                      </label>
                      <input
                        type="text"
                        value={activity.nama_aktivitas}
                        onChange={(e) =>
                          handleActivityChange(
                            index,
                            "nama_aktivitas",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-colors duration-200"
                        placeholder="Contoh: Makan siang di restoran"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Waktu
                      </label>
                      <input
                        type="time"
                        value={activity.waktu}
                        onChange={(e) =>
                          handleActivityChange(index, "waktu", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-colors duration-200"
                      />
                    </div>
                    <div className="flex items-end">
                      {activities.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeActivity(index)}
                          className="w-full px-3 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors duration-200 font-medium flex items-center justify-center gap-2 text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          Hapus
                        </button>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Keterangan
                    </label>
                    <input
                      type="text"
                      value={activity.keterangan}
                      onChange={(e) =>
                        handleActivityChange(
                          index,
                          "keterangan",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground transition-colors duration-200"
                      placeholder="Detail aktivitas (opsional)"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 border border-border rounded-lg text-foreground bg-background hover:bg-muted transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={saving}
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Menyimpan..." : "Simpan Rencana"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
