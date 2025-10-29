"use client";
import { useEffect, useState, useMemo } from "react";
import { API_ENDPOINTS } from "@/config/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Tag, Search, X, Heart, Star } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import destinasiimg from "@/assets/road-to-destination.jpg";
import { Icon } from "@iconify/react";
import { useUserSync } from "@/hooks/useUserSync";
interface Destinasi {
  id?: number;
  nama_destinasi: string;
  lokasi: string;
  deskripsi: string;
  kategori: string;
  gambar: string;
}

export default function DestinasiPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Auto-sync user to Django database after NextAuth login
  useUserSync();

  const [destinasi, setDestinasi] = useState<Destinasi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDestinations, setSelectedDestinations] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    // Fetch data hanya kalau user login
    if (status === "authenticated") {
      fetchDestinasi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const fetchDestinasi = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.DESTINASI);
      if (!response.ok) throw new Error("Gagal mengambil data");
      const data = await response.json();
      setDestinasi(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      console.error("Error fetching destinasi:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDestinasi = useMemo(() => {
    return destinasi.filter((item) => {
      const matchesSearch =
        item.nama_destinasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.lokasi.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        !selectedCategory || item.kategori === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [destinasi, searchQuery, selectedCategory]);

  const categories = useMemo(() => {
    return Array.from(new Set(destinasi.map((item) => item.kategori))).sort();
  }, [destinasi]);

  const toggleSelection = (id: number | undefined) => {
    if (!id) return;
    const newSelected = new Set(selectedDestinations);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedDestinations(newSelected);
  };

  const handleClick = () => {
    router.push("/destinations/rencana"); // pindah ke halaman lain
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-primary/10 via-background to-background py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">
              Jelajahi Destinasi Impian
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Temukan dan pilih destinasi liburan terbaik untuk membuat rencana
              perjalanan Anda yang sempurna
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <Input
              type="text"
              placeholder="Cari destinasi atau lokasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 border-2 border-border bg-card text-foreground placeholder:text-muted-foreground shadow-lg rounded-xl focus:border-primary transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === null
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-card border border-border text-foreground hover:border-primary hover:shadow-md"
              }`}
            >
              Semua Kategori
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "bg-card border border-border text-foreground hover:border-primary hover:shadow-md"
                }`}
              >
                <Tag size={16} />
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Loading State */}
        {loading && (
          <div className="text-center py-24">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin mb-4"></div>
              <p className="text-muted-foreground text-lg">
                Memuat destinasi menakjubkan...
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="p-8 border-2 border-destructive bg-card shadow-lg text-center">
            <p className="text-destructive font-semibold text-lg mb-4">
              Oops! Terjadi kesalahan
            </p>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button
              onClick={fetchDestinasi}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold"
            >
              Coba Lagi
            </Button>
          </Card>
        )}

        {/* Results Info */}
        {!loading && destinasi.length > 0 && (
          <div className="mb-8 flex justify-between items-center">
            <p className="text-muted-foreground font-medium">
              Menampilkan{" "}
              <span className="text-primary font-bold">
                {filteredDestinasi.length}
              </span>{" "}
              dari{" "}
              <span className="text-primary font-bold">{destinasi.length}</span>{" "}
              destinasi
            </p>
            <div>
              <Button
                onClick={handleClick}
                size="icon"
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md transition-colors"
                aria-label="Buat Rencana"
              >
                <Icon icon="icon-park-solid:plan" width={20} height={20} />
              </Button>
            </div>
          </div>
        )}

        {/* Destination Cards Grid */}
        {!loading && filteredDestinasi.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinasi.map((item) => {
              const isSelected = item.id
                ? selectedDestinations.has(item.id)
                : false;
              return (
                <div
                  key={item.id}
                  className="group cursor-pointer transition-all duration-300 hover:scale-105"
                  onClick={() => toggleSelection(item.id)}
                >
                  <Card className="overflow-hidden border border-border shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col bg-card">
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden bg-muted">
                      {item.gambar ? (
                        <img
                          src={item.gambar || "/placeholder.svg"}
                          alt={item.nama_destinasi}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src = "/road-to-destination.jpg";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <span className="text-muted-foreground">
                            Tidak ada gambar
                          </span>
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                          <Tag size={14} />
                          {item.kategori}
                        </span>
                      </div>
                      {/* Rating */}
                      <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <Star
                          size={16}
                          className="text-yellow-500"
                          fill="currentColor"
                        />
                        <span className="text-sm font-semibold text-foreground">
                          4.8
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {item.nama_destinasi}
                      </h3>

                      <div className="flex items-center gap-2 text-muted-foreground mb-4">
                        <MapPin size={16} className="text-primary shrink-0" />
                        <span className="text-sm font-medium">
                          {item.lokasi}
                        </span>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                        {item.deskripsi}
                      </p>

                      {/* Action Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/destinations/createplan?id=${item.id}`);
                        }}
                        className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                          isSelected
                            ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                            : "bg-muted text-foreground hover:bg-primary/20 border border-border"
                        }`}
                      >
                        {isSelected
                          ? "Hapus dari Rencana"
                          : "Tambah ke Rencana"}
                      </button>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        )}

        {/* No Results State */}
        {!loading && filteredDestinasi.length === 0 && destinasi.length > 0 && (
          <Card className="p-16 text-center border-2 border-border bg-card shadow-lg">
            <X className="mx-auto mb-4 text-muted-foreground" size={56} />
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Tidak Ada Hasil
            </h3>
            <p className="text-muted-foreground text-lg mb-8">
              Destinasi yang Anda cari tidak ditemukan. Coba ubah filter atau
              pencarian Anda.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              Reset Filter
            </Button>
          </Card>
        )}

        {/* Empty State */}
        {!loading && destinasi.length === 0 && !error && (
          <Card className="p-16 text-center border-2 border-border bg-card shadow-lg">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Belum Ada Destinasi
            </h3>
            <p className="text-muted-foreground text-lg">
              Destinasi akan ditampilkan di sini setelah ditambahkan ke sistem.
            </p>
          </Card>
        )}
      </div>
    </main>
  );
}
