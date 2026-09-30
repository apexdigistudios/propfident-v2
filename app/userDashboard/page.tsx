import { Suspense } from "react";
import UserpaneContent from "./userDashboard-client"; // Adjust path to userpane-client if different

export const dynamic = "force-dynamic";

export default function UserpanePage() {
  return (
    <Suspense fallback={null}>
      <UserpaneContent />
    </Suspense>
  );
}