'use client';

import { Suspense } from "react";
import QuestionsPageClient from "./QuestionsPageClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center mt-10 text-blue-600">Loading questions...</div>}>
      <QuestionsPageClient />
    </Suspense>
  );
}
