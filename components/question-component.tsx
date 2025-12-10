import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import type { Question } from "@/types";

import { QuestionCard } from "./question-card";
import { Button } from "./ui/button";

type QuestionProps = {
  data: Question[];
  currentQuestion: Question;
  previousId: number | null;
  currentIndex: number;
  nextId: number | null;
  onAnswer: (answer: string | string[], questionId: number) => void;
  savedAnswer?: string | string[];
  userType: "employees" | "administrators";
};

export default function QuestionComponent({ data, currentQuestion, previousId, currentIndex, nextId, onAnswer, savedAnswer, userType }: QuestionProps) {
  const isLastQuestion = nextId === null;
  const hasAnswer = savedAnswer !== undefined && (
    (typeof savedAnswer === "string" && savedAnswer !== "")
    || (Array.isArray(savedAnswer) && savedAnswer.length > 0)
  );

  return (
    <div className="flex flex-col gap-8 p-6">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">Répondez aux questions suivantes</h1>
      <div className="space-y-6">
        <QuestionCard
          key={currentQuestion.id}
          id={currentQuestion.id}
          question={currentQuestion.question}
          type={currentQuestion.type}
          options={currentQuestion.options}
          onAnswer={onAnswer}
          initialValue={savedAnswer}
        />

        <div className="flex items-center justify-between">
          {previousId
            ? (
                <Button asChild variant="outline" size="sm">
                  <Link href={`/questions/${userType}/${previousId}`}>
                    <ArrowLeft width={32} />
                    Précedent
                  </Link>
                </Button>
              )
            : <span />}

          <span className="text-sm text-muted-foreground">
            {`Question ${currentIndex + 1} / ${data.length}`}
          </span>

          {isLastQuestion
            ? (
                hasAnswer
                  ? (
                      <Button asChild variant="default" size="sm">
                        <Link href={`/questions/${userType}/results`}>
                          Voir les résultats
                        </Link>
                      </Button>
                    )
                  : (
                      <Button variant="default" size="sm" disabled>
                        Voir les résultats
                      </Button>
                    )
              )
            : nextId
              ? (
                  hasAnswer
                    ? (
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/questions/${userType}/${nextId}`}>
                            Suivant
                            <ArrowRight width={32} />
                          </Link>
                        </Button>
                      )
                    : (
                        <Button variant="outline" size="sm" disabled>
                          Suivant
                          <ArrowRight width={32} />
                        </Button>
                      )
                )
              : <span />}
        </div>
      </div>
    </div>
  );
}
