export type QuestionCardProps = {
  id: number;
  question: string;
  type: "single" | "multiple";
  options: string[];
  onAnswer?: (selected: string | string[], questionId: number) => void;
  disabled?: boolean;
};

export type Question = Omit<QuestionCardProps, "onAnswer" | "disabled"> & {
  answer: string | string[];
};

export type UserAnswer = {
  questionId: number;
  userAnswer: string | string[];
};
