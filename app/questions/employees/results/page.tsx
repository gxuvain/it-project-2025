"use client";

import { AlertTriangle, Home, Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo } from "react";

import type { Question } from "@/types";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnswers } from "@/hooks/use-answers";
import { useFetch } from "@/hooks/use-fetch";

type SecurityTip = {
  category: string;
  issue: string;
  recommendation: string;
  priority: "high" | "medium" | "low";
};

export default function ResultsPage() {
  const { data, loading, error } = useFetch<Question[]>("/data/employees-questions.json");
  const { answers, clearAnswers } = useAnswers("employees-answers");

  useEffect(() => {
    const sessionKey = "employees-quiz-session";
    sessionStorage.setItem(sessionKey, "active");
  }, []);

  const results = useMemo(() => {
    if (!data)
      return { score: 0, percentage: 0, correct: 0, total: 0, securityTips: [], level: "critical" as const };

    let correct = 0;
    const securityTips: SecurityTip[] = [];

    data.forEach((question) => {
      const userAnswer = answers.find(a => a.questionId === question.id);
      const isCorrect = userAnswer
        ? JSON.stringify(userAnswer.userAnswer) === JSON.stringify(question.answer)
        : false;

      if (isCorrect) {
        correct++;
      }
      else {
        if (question.id === 1 && !isCorrect) {
          securityTips.push({
            category: "Gestion des logiciels",
            issue: "Responsabilité de la sécurité mal identifiée",
            recommendation: "Le Responsable Informatique doit être responsable de l'installation et de la maintenance des logiciels de sécurité. Évitez d'installer vous-même des logiciels non autorisés.",
            priority: "high",
          });
        }
        if (question.id === 2 && !isCorrect) {
          securityTips.push({
            category: "Système d'exploitation",
            issue: "Version Windows obsolète",
            recommendation: "Assurez-vous d'utiliser Windows 10 ou 11. Les versions plus anciennes ne reçoivent plus de mises à jour de sécurité et sont vulnérables aux attaques.",
            priority: "high",
          });
        }
        if (question.id === 3 && !isCorrect) {
          securityTips.push({
            category: "Navigation web",
            issue: "Navigateur non recommandé",
            recommendation: "Utilisez Microsoft Edge ou un navigateur moderne et régulièrement mis à jour pour une meilleure sécurité en ligne.",
            priority: "medium",
          });
        }
        if (question.id === 4 && !isCorrect) {
          securityTips.push({
            category: "Mises à jour système",
            issue: "Windows Update mal configuré",
            recommendation: "Configurez Windows Update pour installer automatiquement les mises à jour de sécurité. C'est la première ligne de défense contre les vulnérabilités.",
            priority: "high",
          });
        }
        if (question.id === 5 && !isCorrect) {
          securityTips.push({
            category: "Antivirus",
            issue: "Absence ou incertitude sur l'antivirus",
            recommendation: "Votre ordinateur DOIT avoir un antivirus actif. Vérifiez avec votre service informatique que Windows Defender ou un autre antivirus est bien installé et actif.",
            priority: "high",
          });
        }
        if (question.id === 7 && !isCorrect) {
          securityTips.push({
            category: "Antivirus",
            issue: "Mise à jour antivirus non automatique",
            recommendation: "Les définitions de virus doivent être mises à jour automatiquement et quotidiennement. Vérifiez que cette option est activée.",
            priority: "high",
          });
        }
        if (question.id === 8 && !isCorrect) {
          securityTips.push({
            category: "Pare-feu",
            issue: "Pare-feu absent ou inconnu",
            recommendation: "Le pare-feu Windows doit être activé en permanence. Ne le désactivez jamais, même temporairement.",
            priority: "high",
          });
        }
        if ([10, 11, 12].includes(question.id) && !isCorrect) {
          securityTips.push({
            category: "Mots de passe",
            issue: "Politique de mots de passe faible",
            recommendation: "Utilisez des mots de passe uniques de 12+ caractères contenant majuscules, minuscules, chiffres et caractères spéciaux. Utilisez un gestionnaire de mots de passe.",
            priority: "high",
          });
        }
        if (question.id === 13 && !isCorrect) {
          securityTips.push({
            category: "Équipement personnel",
            issue: "Utilisation de PC personnel au travail",
            recommendation: "N'utilisez jamais votre PC personnel pour accéder au réseau de l'entreprise. Utilisez uniquement l'équipement professionnel fourni.",
            priority: "high",
          });
        }
        if (question.id === 14 && !isCorrect) {
          securityTips.push({
            category: "Mots de passe",
            issue: "Mots de passe écrits en clair",
            recommendation: "Ne notez JAMAIS vos mots de passe sur papier ou dans des fichiers non chiffrés. Utilisez un gestionnaire de mots de passe sécurisé.",
            priority: "high",
          });
        }
        if (question.id === 15 && !isCorrect) {
          securityTips.push({
            category: "Mots de passe",
            issue: "Partage de mots de passe",
            recommendation: "Ne partagez JAMAIS vos mots de passe, même avec des collègues ou votre hiérarchie. Chacun doit avoir ses propres identifiants.",
            priority: "high",
          });
        }
        if (question.id === 16 && !isCorrect) {
          securityTips.push({
            category: "Navigateur",
            issue: "Enregistrement des mots de passe dans le navigateur",
            recommendation: "Évitez d'enregistrer les mots de passe professionnels dans le navigateur. Utilisez un gestionnaire de mots de passe d'entreprise.",
            priority: "medium",
          });
        }
        if (question.id === 18 && !isCorrect) {
          securityTips.push({
            category: "Phishing",
            issue: "Clic sur des liens suspects",
            recommendation: "Ne cliquez JAMAIS sur des liens dans des emails suspects. En cas de doute, contactez votre service informatique.",
            priority: "high",
          });
        }
        if (question.id === 19 && !isCorrect) {
          securityTips.push({
            category: "Phishing",
            issue: "Mauvaise gestion des emails suspects",
            recommendation: "Signalez et bloquez systématiquement les emails de phishing. Informez votre équipe technique pour protéger l'ensemble de l'entreprise.",
            priority: "high",
          });
        }
        if ([20, 21].includes(question.id) && !isCorrect) {
          securityTips.push({
            category: "Périphériques USB",
            issue: "Mauvaise pratique avec les clés USB",
            recommendation: "Ne branchez jamais de clés USB inconnues et limitez le prêt de vos propres clés. Les malwares se propagent facilement via USB.",
            priority: "medium",
          });
        }
      }
    });

    const total = data.length;
    const percentage = Math.round((correct / total) * 100);

    let level: "excellent" | "good" | "average" | "poor" | "critical";
    if (percentage >= 90)
      level = "excellent";
    else if (percentage >= 75)
      level = "good";
    else if (percentage >= 60)
      level = "average";
    else if (percentage >= 40)
      level = "poor";
    else level = "critical";

    return { score: correct, percentage, correct, total, securityTips, level };
  }, [data, answers]);

  const handleRetake = () => {
    clearAnswers();
    sessionStorage.removeItem("employees-quiz-session");
    window.location.href = "/questions/employees/1";
  };

  if (loading)
    return <div className="p-6">Chargement...</div>;
  if (error) {
    return (
      <div className="p-6">
        Erreur:
        {error}
      </div>
    );
  }
  if (!data)
    return null;

  const getLevelConfig = () => {
    switch (results.level) {
      case "excellent":
        return {
          icon: <ShieldCheck className="h-16 w-16 text-green-600" />,
          title: "Excellente posture de sécurité",
          description: "Vous avez d'excellentes pratiques de cybersécurité. Continuez ainsi !",
          color: "text-green-600",
          bgColor: "bg-green-50 dark:bg-green-950/20",
          borderColor: "border-green-500/50",
        };
      case "good":
        return {
          icon: <Shield className="h-16 w-16 text-blue-600" />,
          title: "Bonne posture de sécurité",
          description: "Vos pratiques sont globalement bonnes, mais quelques améliorations sont possibles.",
          color: "text-blue-600",
          bgColor: "bg-blue-50 dark:bg-blue-950/20",
          borderColor: "border-blue-500/50",
        };
      case "average":
        return {
          icon: <Shield className="h-16 w-16 text-yellow-600" />,
          title: "Posture de sécurité moyenne",
          description: "Votre niveau de sécurité est acceptable mais nécessite des améliorations.",
          color: "text-yellow-600",
          bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
          borderColor: "border-yellow-500/50",
        };
      case "poor":
        return {
          icon: <ShieldAlert className="h-16 w-16 text-orange-600" />,
          title: "Posture de sécurité faible",
          description: "Votre situation présente des risques importants. Suivez les recommandations ci-dessous.",
          color: "text-orange-600",
          bgColor: "bg-orange-50 dark:bg-orange-950/20",
          borderColor: "border-orange-500/50",
        };
      case "critical":
        return {
          icon: <AlertTriangle className="h-16 w-16 text-red-600" />,
          title: "Posture de sécurité critique",
          description: "Votre situation présente des risques majeurs. Une action immédiate est nécessaire.",
          color: "text-red-600",
          bgColor: "bg-red-50 dark:bg-red-950/20",
          borderColor: "border-red-500/50",
        };
    }
  };

  const levelConfig = getLevelConfig();

  return (
    <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight">
        Évaluation de Sécurité
      </h1>

      <Card className={`border-2 ${levelConfig.borderColor} ${levelConfig.bgColor}`}>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {levelConfig.icon}
          </div>
          <CardTitle className={`text-3xl ${levelConfig.color}`}>{levelConfig.title}</CardTitle>
          <CardDescription className="text-base mt-2">
            {levelConfig.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <div className="text-6xl font-bold">
            {results.percentage}
            %
          </div>
          <div className="text-sm text-muted-foreground">
            Score de sécurité:
            {" "}
            {results.correct}
            {" "}
            /
            {" "}
            {results.total}
            {" "}
            bonnes pratiques appliquées
          </div>
        </CardContent>
      </Card>

      {results.securityTips.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Recommandations pour améliorer votre sécurité</h2>
          <p className="text-muted-foreground">
            Voici les axes d'amélioration identifiés lors de votre évaluation:
          </p>
          {results.securityTips.map((tip, index) => (
            <Card
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={
                tip.priority === "high"
                  ? "border-red-500/50 bg-red-50/30 dark:bg-red-950/10"
                  : tip.priority === "medium"
                    ? "border-orange-500/50 bg-orange-50/30 dark:bg-orange-950/10"
                    : "border-yellow-500/50 bg-yellow-50/30 dark:bg-yellow-950/10"
              }
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{tip.category}</CardTitle>
                      <Badge
                        variant={tip.priority === "high" ? "destructive" : "secondary"}
                      >
                        {tip.priority === "high" ? "Priorité haute" : tip.priority === "medium" ? "Priorité moyenne" : "Priorité basse"}
                      </Badge>
                    </div>
                    <CardDescription className="text-base font-medium text-foreground">
                      {tip.issue}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Recommandation:</p>
                  <p className="text-sm leading-relaxed">{tip.recommendation}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {results.securityTips.length === 0 && (
        <Card className="border-green-500/50 bg-green-50/30 dark:bg-green-950/10">
          <CardHeader>
            <CardTitle className="text-green-600">🎉 Parfait !</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Vous appliquez toutes les bonnes pratiques de sécurité. Continuez sur cette voie et restez vigilant !</p>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4 justify-center">
        <Button asChild variant="outline">
          <Link href="/">
            <Home className="h-4 w-4" />
            Retour à l'accueil
          </Link>
        </Button>
        <Button onClick={handleRetake} variant="default">
          Refaire le questionnaire
        </Button>
      </div>
    </div>
  );
}
