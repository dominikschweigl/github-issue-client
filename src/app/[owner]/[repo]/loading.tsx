import { LoadingSpinner } from "@/components/ui/loadingspinner";
import React from "react";

export default function loading() {
  return (
    <div className="flex justify-center">
      <LoadingSpinner />
    </div>
  );
}
