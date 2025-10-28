// ⚠️ File ini tidak boleh berada dalam folder `app/`
// letakkan di `src/rendertemplate/`

import "server-only"; // ✅ memberi tahu Next.js ini hanya dijalankan di server
import EmailTemplate from "../promosi/promosi";

export async function renderEmailTemplate() {
  // Membuat instance dari template email
  const emailComponent = <EmailTemplate />;

  // Konversi komponen React ke string HTML menggunakan teknik server-side di Next.js
  const serverModule = await import("react-dom/server");
  return serverModule.renderToStaticMarkup(emailComponent);
}
