"use client";

import { useCallback, useState } from "react";

import type { UserAnswer } from "@/types";

export function useAnswers(storageKey: string) {
  const [answers, setAnswers] = useState<UserAnswer[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          return JSON.parse(stored);
        }
        catch (error) {
          console.error("Failed to parse stored answers:", error);
        }
      }
    }
    return [];
  });

  const saveAnswer = useCallback((userAnswer: string | string[], questionId: number) => {
    setAnswers((prev) => {
      const existingIndex = prev.findIndex(a => a.questionId === questionId);
      let newAnswers;

      if (existingIndex >= 0) {
        newAnswers = [...prev];
        newAnswers[existingIndex] = { questionId, userAnswer };
      }
      else {
        newAnswers = [...prev, { questionId, userAnswer }];
      }

      localStorage.setItem(storageKey, JSON.stringify(newAnswers));
      return newAnswers;
    });
  }, [storageKey]);

  const getAnswer = useCallback((questionId: number): string | string[] | undefined => {
    const answer = answers.find(a => a.questionId === questionId);
    return answer?.userAnswer;
  }, [answers]);

  const clearAnswers = useCallback(() => {
    setAnswers([]);
    localStorage.removeItem(storageKey);
  }, [storageKey]);

  return {
    answers,
    saveAnswer,
    getAnswer,
    clearAnswers,
  };
}
