"use client";

import { TabsContent } from "@radix-ui/react-tabs";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { LinesPatternCard, LinesPatternCardBody } from "@/components/ui/card-with-lines-patter";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function QuestionsPage() {
  return (
    <>
      <div className="flex flex-col items-center gap-8 p-6">
        <div className="space-y-2 text-center">
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">Questionnaire de sécurité</h1>
          <p className="text-muted-foreground">
            Selectionnez le questionnaire en fonction de votre rôle.
          </p>
        </div>
        <Tabs defaultValue="employees">
          <TabsList>
            <TabsTrigger value="employees">Employés</TabsTrigger>
            <TabsTrigger value="administrators">Administrateurs</TabsTrigger>
          </TabsList>
          <TabsContent value="employees">
            <LinesPatternCard>
              <LinesPatternCardBody>
                <h3 className="text-lg font-bold mb-1 text-foreground">
                  Questions employées
                </h3>
                <p className="text-wrap text-sm text-foreground/60 mb-6">
                  A modern pattern featuring diagonal lines in a repeating grid.
                  Creates a sense of movement and depth while maintaining a clean,
                  minimalist aesthetic.
                </p>
                <Button size="sm" asChild>
                  <Link href="/questions/employees/1">
                    Commencer
                  </Link>
                </Button>
              </LinesPatternCardBody>
            </LinesPatternCard>
          </TabsContent>
          <TabsContent value="administrators">
            <LinesPatternCard>
              <LinesPatternCardBody>
                <h3 className="text-lg font-bold mb-1 text-foreground">
                  Questions administrateurs
                </h3>
                <p className="text-wrap text-sm text-foreground/60 mb-6">
                  A modern pattern featuring diagonal lines in a repeating grid.
                  Creates a sense of movement and depth while maintaining a clean,
                  minimalist aesthetic.
                </p>
                <Button size="sm">
                  <Link href="/questions/administrators/1">
                    Commencer
                  </Link>
                </Button>
              </LinesPatternCardBody>
            </LinesPatternCard>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
