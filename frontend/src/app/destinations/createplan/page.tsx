import { Suspense } from "react";
import RencanaLiburanPage from "./createplan";

export default function CreatePlanPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RencanaLiburanPage />
    </Suspense>
  );
}
