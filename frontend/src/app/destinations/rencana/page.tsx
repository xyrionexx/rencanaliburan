"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Clock,
  ChevronDown,
  ChevronUp,
  Plus,
  Package,
} from "lucide-react";
import { useUserSync } from "@/hooks/useUserSync";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Destination {
  id: number;
  nama_destinasi: string;
  lokasi: string;
  deskripsi: string;
  kategori: string;
  gambar: string;
}

interface Activity {
  id: number;
  nama_aktivitas: string;
  waktu: string | null;
  keterangan: string;
}

interface VacationPlan {
  id: number;
  user: User;
  destinasi: Destination;
  tanggal_mulai: string;
  tanggal_selesai: string;
  jumlah_orang: number;
  estimasi_biaya: string;
  catatan: string;
  dibuat_pada: string;
  aktivitas: Activity[];
}

export default function RencanaPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Auto-sync user to Django database after NextAuth login
  useUserSync();

  const [plans, setPlans] = useState<VacationPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<VacationPlan | null>(null);

  useEffect(() => {
    if (status !== "loading") {
      fetchPlans();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const fetchPlans = useCallback(async () => {
    try {
      // Check NextAuth session
      if (status === "unauthenticated") {
        alert("Anda harus login terlebih dahulu");
        router.push("/login");
        return;
      }

      if (status === "loading") {
        return; // Wait for session to load
      }

      // Prepare headers with user email from NextAuth
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (session?.user?.email) {
        headers["X-User-Email"] = session.user.email;
      }

      const response = await fetch("http://api.borrowfy.site/api/rencana/", {
        method: "GET",
        headers,
        credentials: "include", // Important for session-based auth
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert("Anda harus login terlebih dahulu");
          router.push("/login");
          return;
        }
        throw new Error("Gagal memuat data rencana");
      }

      const result = await response.json();
      setPlans(result.data || []);
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat memuat data");
    } finally {
      setLoading(false);
    }
  }, [session, status, router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(parseFloat(amount));
  };

  const formatTime = (timeString: string | null) => {
    if (!timeString) return "-";
    return timeString.slice(0, 5); // HH:MM
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-muted border-t-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-foreground mb-1">
              Rencana Liburan Saya
            </h1>
            <p className="text-sm text-muted-foreground">
              Kelola dan lihat semua rencana perjalanan Anda
            </p>
          </div>
          <button
            onClick={() => router.push("/destinations")}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
          >
            <Plus className="w-4 h-4" />
            Buat Rencana Baru
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {plans.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="rounded-full bg-muted p-6 mb-6">
              <Package className="w-16 h-16 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Belum Ada Rencana Liburan
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              Mulai rencanakan perjalanan impian Anda dengan memilih destinasi
              favorit
            </p>
            <button
              onClick={() => router.push("/destinations")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
            >
              <Plus className="w-5 h-5" />
              Mulai Merencanakan Liburan
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="rounded-lg border border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <div className="md:flex">
                  {plan.destinasi.gambar && (
                    <div className="md:w-1/3 relative">
                      <img
                        src={plan.destinasi.gambar}
                        alt={plan.destinasi.nama_destinasi}
                        className="w-full h-64 md:h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/road-to-destination.jpg";
                        }}
                      />
                      {plan.destinasi.kategori && (
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center gap-1 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                            <MapPin className="w-3 h-3" />
                            {plan.destinasi.kategori}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-6 md:flex-1">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl font-semibold text-foreground mb-2">
                          {plan.destinasi.nama_destinasi}
                        </h2>
                        <p className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4 text-primary" />
                          {plan.destinasi.lokasi}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setSelectedPlan(
                            selectedPlan?.id === plan.id ? null : plan
                          )
                        }
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors duration-200"
                      >
                        {selectedPlan?.id === plan.id ? (
                          <>
                            <ChevronUp className="w-4 h-4" />
                            Tutup Detail
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" />
                            Lihat Detail
                          </>
                        )}
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                        <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Tanggal Perjalanan
                          </p>
                          <p className="font-semibold text-foreground">
                            {formatDate(plan.tanggal_mulai)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            sampai
                          </p>
                          <p className="font-semibold text-foreground">
                            {formatDate(plan.tanggal_selesai)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                        <Users className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Jumlah Peserta
                          </p>
                          <p className="font-semibold text-foreground">
                            {plan.jumlah_orang} orang
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                        <DollarSign className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Estimasi Biaya
                          </p>
                          <p className="font-semibold text-primary">
                            {formatCurrency(plan.estimasi_biaya)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                        <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">
                            Dibuat Pada
                          </p>
                          <p className="font-semibold text-foreground">
                            {formatDate(plan.dibuat_pada)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {plan.catatan && (
                      <div className="p-4 rounded-lg bg-muted/30 mb-6">
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          Catatan
                        </p>
                        <p className="text-foreground leading-relaxed">
                          {plan.catatan}
                        </p>
                      </div>
                    )}

                    {/* Expanded Details */}
                    {selectedPlan?.id === plan.id && (
                      <div className="mt-6 pt-6 border-t border-border">
                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-primary" />
                          Jadwal Aktivitas
                        </h3>
                        {plan.aktivitas && plan.aktivitas.length > 0 ? (
                          <div className="space-y-3">
                            {plan.aktivitas.map((activity) => (
                              <div
                                key={activity.id}
                                className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200"
                              >
                                <div className="shrink-0 w-20">
                                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full">
                                    <Clock className="w-3 h-3" />
                                    <span className="text-sm font-semibold">
                                      {formatTime(activity.waktu)}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-foreground mb-1">
                                    {activity.nama_aktivitas}
                                  </h4>
                                  {activity.keterangan && (
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                      {activity.keterangan}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">
                              Belum ada aktivitas yang direncanakan
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
