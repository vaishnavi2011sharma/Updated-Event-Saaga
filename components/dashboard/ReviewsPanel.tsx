"use client";
import { useEffect, useState } from "react";

interface Booking { bookingId: string; serviceName: string; status: string; }
interface Review { _id: string; bookingId: string; serviceName: string; rating: number; reviewText: string; createdAt: string; }

export default function ReviewsPanel({ accentColor = "#d4145a" }: { accentColor?: string }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<{ bookingId: string; rating: number; reviewText: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    fetch("/api/customer/bookings")
      .then(r => r.json())
      .then(d => setBookings(d.bookings || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const reviewedIds = new Set(myReviews.map(r => r.bookingId));
  const completedUnreviewed = bookings.filter(b => b.status === "COMPLETED" && !reviewedIds.has(b.bookingId));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setError(null);
    setSubmitting(true);
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSubmitting(false);
    if (!data.success) {
      setError(data.errors?.[0] || data.message || "Something went wrong.");
      return;
    }
    setMyReviews(r => [{ _id: data.review._id, bookingId: data.review.bookingId, serviceName: data.review.serviceName, rating: data.review.rating, reviewText: data.review.reviewText, createdAt: data.review.createdAt }, ...r]);
    setForm(null);
  };

  if (loading) return <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#8a7a68" }}>Loading...</p>;

  return (
    <div style={{ maxWidth: "620px" }}>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.1rem", color: "#2a1d12", marginBottom: "16px" }}>Leave a Review</h2>

      {completedUnreviewed.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 4px 14px rgba(0,0,0,0.04)", marginBottom: "24px" }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", color: "#8a7a68", margin: 0 }}>No completed bookings awaiting a review right now.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
          {completedUnreviewed.map(b => (
            <div key={b.bookingId} style={{ background: "#fff", borderRadius: "14px", padding: "16px 18px", boxShadow: "0 4px 14px rgba(0,0,0,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#2a1d12", margin: 0 }}>{b.serviceName}</p>
              <button onClick={() => setForm({ bookingId: b.bookingId, rating: 5, reviewText: "" })}
                style={{ padding: "7px 16px", background: accentColor, color: "white", border: "none", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.75rem", cursor: "pointer" }}>
                Write Review
              </button>
            </div>
          ))}
        </div>
      )}

      {form && (
        <form onSubmit={handleSubmit} style={{ background: "#fff", borderRadius: "16px", padding: "22px", boxShadow: "0 4px 14px rgba(0,0,0,0.04)", marginBottom: "24px" }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#2a1d12", marginBottom: "10px" }}>Rating</p>
          <div style={{ display: "flex", gap: "4px", marginBottom: "14px" }}>
            {[1, 2, 3, 4, 5].map(n => (
              <button type="button" key={n} onClick={() => setForm({ ...form, rating: n })} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill={n <= form.rating ? "#facc15" : "#e5e7eb"}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </button>
            ))}
          </div>
          <textarea required rows={3} value={form.reviewText} onChange={e => setForm({ ...form, reviewText: e.target.value })} placeholder="Share your experience..."
            style={{ width: "100%", padding: "10px 13px", border: "1.5px solid #e5e7eb", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem", outline: "none", resize: "vertical", boxSizing: "border-box", marginBottom: "12px" }} />
          {error && <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "#dc2626", marginBottom: "10px" }}>{error}</p>}
          <div style={{ display: "flex", gap: "8px" }}>
            <button type="submit" disabled={submitting} style={{ padding: "9px 20px", background: submitting ? "#d1d5db" : accentColor, color: "white", border: "none", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.8rem", cursor: submitting ? "default" : "pointer" }}>
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
            <button type="button" onClick={() => setForm(null)} style={{ padding: "9px 20px", background: "#fff", border: "1.5px solid #e5e7eb", borderRadius: "50px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer" }}>Cancel</button>
          </div>
        </form>
      )}

      {myReviews.length > 0 && (
        <>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.1rem", color: "#2a1d12", marginBottom: "16px" }}>Your Reviews</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {myReviews.map(r => (
              <div key={r._id} style={{ background: "#fff", borderRadius: "14px", padding: "16px 18px", boxShadow: "0 4px 14px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", gap: "2px", marginBottom: "6px" }}>
                  {Array.from({ length: r.rating }).map((_, i) => <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#facc15"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                </div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem", color: "#4a3d30", margin: "0 0 4px" }}>&ldquo;{r.reviewText}&rdquo;</p>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: "#8a7a68", margin: 0 }}>{r.serviceName}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
