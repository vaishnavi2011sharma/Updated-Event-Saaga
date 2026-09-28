"use client";
import { useEffect, useState } from "react";

interface Review { _id: string; bookingId: string; serviceName: string; serviceCategory: string; rating: number; reviewText: string; createdAt: string; }

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = () => {
    fetch("/api/reviews?all=true")
      .then(r => r.json())
      .then(d => setReviews(d.reviews || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (reviewId: string) => {
    if (!confirm("Remove this review permanently?")) return;
    setDeleting(reviewId);
    await fetch("/api/reviews", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reviewId }),
    });
    setDeleting(null);
    load();
  };

  return (
    <div>
      <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.6rem", color: "#2a1d12", marginBottom: "20px" }}>Reviews</h1>

      {loading ? <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#8a7a68" }}>Loading reviews...</p>
        : reviews.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: "16px", padding: "40px", textAlign: "center" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#8a7a68" }}>No reviews submitted yet.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {reviews.map(r => (
              <div key={r._id} style={{ background: "#fff", borderRadius: "14px", padding: "18px 20px", boxShadow: "0 4px 14px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
                  <div>
                    <div style={{ display: "flex", gap: "2px", marginBottom: "6px" }}>
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#facc15"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      ))}
                    </div>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.83rem", color: "#4a3d30", margin: "0 0 6px", lineHeight: 1.6 }}>&ldquo;{r.reviewText}&rdquo;</p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: "#8a7a68", margin: 0 }}>{r.serviceName} · {r.bookingId}</p>
                  </div>
                  <button disabled={deleting === r._id} onClick={() => handleDelete(r._id)}
                    style={{ padding: "6px 14px", background: "#fff", border: "1.5px solid #fecaca", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.72rem", color: "#dc2626", cursor: "pointer", flexShrink: 0 }}>
                    {deleting === r._id ? "Removing..." : "Remove"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
