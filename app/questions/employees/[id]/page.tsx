"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

import type { Question } from "@/types";

import QuestionComponent from "@/components/question-component";
import { useAnswers } from "@/hooks/use-answers";
import { useFetch } from "@/hooks/use-fetch";

export default function QuestionPage() {
  const params = useParams();
  const questionId = Number(params.id);

  const { data, loading, error } = useFetch<Question[]>("/data/employees-questions.json");
  const { saveAnswer, getAnswer, clearAnswers } = useAnswers("employees-answers");

  useEffect(() => {
    const sessionKey = "employees-quiz-session";
    const isRefresh = !sessionStorage.getItem(sessionKey);

    if (isRefresh) {
      clearAnswers();
    }

    sessionStorage.setItem(sessionKey, "active");

    return () => {
      if (!window.location.pathname.includes("/questions/employees")) {
        sessionStorage.removeItem(sessionKey);
      }
    };
  }, [clearAnswers]);

  if (loading)
    return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }
  if (!data)
    return null;

  const currentIndex = data.findIndex(question => question.id === questionId);
  if (currentIndex === -1)
    return <div>Question introuvable.</div>;

  const currentQuestion = data[currentIndex];
  const previousId = currentIndex > 0 ? data[currentIndex - 1].id : null;
  const nextId = currentIndex < data.length - 1 ? data[currentIndex + 1].id : null;
  const savedAnswer = getAnswer(questionId);

  return (
    <QuestionComponent
      data={data}
      currentQuestion={currentQuestion}
      previousId={previousId}
      currentIndex={currentIndex}
      nextId={nextId}
      onAnswer={saveAnswer}
      savedAnswer={savedAnswer}
      userType="employees"
    />
  );
}
