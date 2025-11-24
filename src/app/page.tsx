"use client";

import { useState } from "react";
import Generator from "@/components/generator/Generator";
import LandingPage from "@/components/LandingPage";

export default function Home() {
  const [showGenerator, setShowGenerator] = useState(false);

  if (showGenerator) {
    return <Generator />;
  }

  return <LandingPage onGetStarted={() => setShowGenerator(true)} />;
}
