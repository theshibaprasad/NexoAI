"use client";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import DashboardView from "./_component/dashboard-view";

export default function DashboardPage() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch("/api/dashboard-insights");
      const data = await res.json();
      setInsights(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <BarLoader className="mt-4" width={"100%"} color="#2563eb" />;
  }

  return (
    <div className="container mx-auto">
      <DashboardView insights={insights} />
    </div>
  );
}
