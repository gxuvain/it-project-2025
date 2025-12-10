"use client";

import { useEffect, useState } from "react";

import type { QuestionCardProps } from "@/types";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export function QuestionCard({ id, question, type, options, onAnswer, disabled = false, initialValue }: QuestionCardProps & { initialValue?: string | string[] }) {
  const [selected, setSelected] = useState<string | string[]>(type === "single" ? "" : []);

  useEffect(() => {
    if (initialValue !== undefined) {
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setSelected(initialValue);
    }
  }, [initialValue, setSelected]);

  const handleSingleSelect = (value: string) => {
    setSelected(value);
    onAnswer?.(value, id);
  };

  const handleMultipleSelect = (value: string, checked: boolean) => {
    const currentSelection = Array.isArray(selected) ? selected : [];
    const newSelection = checked ? [...currentSelection, value] : currentSelection.filter(v => v !== value);
    setSelected(newSelection);
    onAnswer?.(newSelection, id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {question}
        </CardTitle>
        <CardDescription>
          {type === "single" ? "Sélectionnez une seule réponse." : "Sélectionnez une ou plusieurs réponses."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {type === "single"
            ? (
                <RadioGroup value={selected as string} onValueChange={handleSingleSelect} disabled={disabled}>
                  {options.map(option => (
                    <div key={option} className="flex items-center space-x-3">
                      <RadioGroupItem
                        value={option}
                        id={`option-${option}`}
                        disabled={disabled}
                        className="border-border/60"
                      />
                      <Label
                        htmlFor={`option-${option}`}
                        className={cn(
                          "text-base font-normal cursor-pointer transition-colors",
                          disabled && "opacity-50 cursor-not-allowed",
                        )}
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )
            : (
                <div className="space-y-3">
                  {options.map(option => (
                    <div key={option} className="flex items-center space-x-3">
                      <Checkbox
                        id={`option-${option}`}
                        checked={(selected as string[]).includes(option)}
                        onCheckedChange={checked => handleMultipleSelect(option, checked as boolean)}
                        disabled={disabled}
                        className="border-border/60"
                      />
                      <Label
                        htmlFor={`option-${option}`}
                        className={cn(
                          "text-base font-normal cursor-pointer transition-colors",
                          disabled && "opacity-50 cursor-not-allowed",
                        )}
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
        </div>
      </CardContent>
    </Card>
  );
}
