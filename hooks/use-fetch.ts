"use client";

import { useEffect, useState } from "react";

import { fetchJson } from "@/lib/fetch-json";

export function useFetch<T = unknown>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJson<T>(path)
      .then((json) => {
        setData(json);
      })
      .catch((err) => {
        setError(err.message || "Erreur inconnue");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [path]);

  return { data, loading, error };
}
