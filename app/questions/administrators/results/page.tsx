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
  const { data, loading, error } = useFetch<Question[]>("/data/administrators-questions.json");
  const { answers, clearAnswers } = useAnswers("administrators-answers");

  useEffect(() => {
    const sessionKey = "administrators-quiz-session";
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
            category: "Gestion des administrateurs",
            issue: "Structure administrative incorrecte",
            recommendation: "Les administrateurs du domaine doivent être des employés spéciaux de l'entreprise avec des privilèges élevés, pas des prestataires externes. Cela garantit le contrôle et la responsabilité.",
            priority: "high",
          });
        }
        if (question.id === 2 && !isCorrect) {
          securityTips.push({
            category: "Segmentation réseau",
            issue: "Isolation des invités insuffisante",
            recommendation: "Les invités doivent être sur un réseau complètement séparé avec des comptes très restreints. Utilisez un VLAN dédié pour isoler ce trafic du réseau principal.",
            priority: "high",
          });
        }
        if (question.id === 3 && !isCorrect) {
          securityTips.push({
            category: "Gestion des comptes",
            issue: "Séparation des privilèges manquante",
            recommendation: "Les administrateurs DOIVENT avoir des comptes utilisateurs standards séparés pour les tâches quotidiennes. N'utilisez les comptes admin que pour les tâches d'administration.",
            priority: "high",
          });
        }
        if (question.id === 4 && !isCorrect) {
          securityTips.push({
            category: "Équipement",
            issue: "Utilisation d'équipement non professionnel",
            recommendation: "Tous les utilisateurs du domaine doivent avoir un PC professionnel géré par l'entreprise. Les PC personnels sont des vecteurs de risque majeurs.",
            priority: "high",
          });
        }
        if (question.id === 5 && !isCorrect) {
          securityTips.push({
            category: "Politique de mots de passe",
            issue: "Mots de passe administrateurs faibles",
            recommendation: "Les mots de passe admin doivent impérativement avoir 12+ caractères avec majuscules, minuscules, chiffres et caractères spéciaux. Utilisez un gestionnaire de mots de passe.",
            priority: "high",
          });
        }
        if (question.id === 6 && !isCorrect) {
          securityTips.push({
            category: "Pare-feu",
            issue: "Pare-feu absent ou inadéquat",
            recommendation: "Déployez un pare-feu professionnel entre votre domaine et Internet. Un simple pare-feu logiciel n'est pas suffisant pour protéger un réseau d'entreprise.",
            priority: "high",
          });
        }
        if (question.id === 8 && !isCorrect) {
          securityTips.push({
            category: "Contrôle d'accès",
            issue: "Accès PowerShell non restreint",
            recommendation: "Les employés standards ne doivent PAS avoir accès à PowerShell en mode administrateur. Bloquez cet accès via GPO pour prévenir les escalades de privilèges.",
            priority: "high",
          });
        }
        if (question.id === 9 && !isCorrect) {
          securityTips.push({
            category: "Segmentation réseau",
            issue: "Absence de segmentation VLAN",
            recommendation: "Implémentez des VLANs pour segmenter vos services (comptabilité, RH, production, etc.). Cela limite la propagation des attaques en cas de compromission.",
            priority: "high",
          });
        }
        if (question.id === 10 && !isCorrect) {
          securityTips.push({
            category: "Sensibilisation",
            issue: "Formation cybersécurité insuffisante",
            recommendation: "Organisez des formations en cybersécurité au moins une fois par semestre. La sensibilisation des utilisateurs est votre première ligne de défense.",
            priority: "medium",
          });
        }
        if (question.id === 11 && !isCorrect) {
          securityTips.push({
            category: "Hygiène administrative",
            issue: "Sessions admin non fermées",
            recommendation: "Ne laissez JAMAIS une session administrateur ouverte sur un poste utilisateur. Configurez un timeout automatique et formez les admins à fermer leurs sessions.",
            priority: "high",
          });
        }
        if (question.id === 12 && !isCorrect) {
          securityTips.push({
            category: "Pare-feu",
            issue: "Politique HTTP trop permissive",
            recommendation: "Bloquez l'accès aux sites HTTP non sécurisés. Autorisez uniquement HTTPS pour protéger contre l'interception de données. Certaines exceptions peuvent être nécessaires pour des systèmes legacy.",
            priority: "medium",
          });
        }
        if (question.id === 13 && !isCorrect) {
          securityTips.push({
            category: "Authentification",
            issue: "Protocole d'authentification obsolète",
            recommendation: "Utilisez exclusivement Kerberos pour l'authentification du domaine. NTLM (v1 et v2) présente des vulnérabilités connues et doit être désactivé.",
            priority: "high",
          });
        }
        if (question.id === 14 && !isCorrect) {
          securityTips.push({
            category: "Gestion des mots de passe",
            issue: "Absence de gestionnaire de mots de passe",
            recommendation: "Déployez un gestionnaire de mots de passe d'entreprise (KeePass, Bitwarden, 1Password Business) pour tous les utilisateurs et surtout les administrateurs.",
            priority: "high",
          });
        }
        if (question.id === 15 && !isCorrect) {
          securityTips.push({
            category: "Stratégies de groupe (GPO)",
            issue: "Couverture GPO incomplète",
            recommendation: "Vos GPO doivent couvrir au minimum : politiques de mots de passe, verrouillage de comptes, pare-feu, restrictions logicielles, Windows Update, blocage registres, et restrictions USB. Complétez votre configuration.",
            priority: "high",
          });
        }
        if (question.id === 17 && !isCorrect) {
          securityTips.push({
            category: "Sauvegardes",
            issue: "Type de sauvegarde non optimal",
            recommendation: "Utilisez des sauvegardes incrémentielles pour optimiser l'espace et le temps. Combinez avec des sauvegardes complètes hebdomadaires pour la restauration.",
            priority: "medium",
          });
        }
        if (question.id === 18 && !isCorrect) {
          securityTips.push({
            category: "Sauvegardes",
            issue: "Fréquence de sauvegarde uniforme",
            recommendation: "Adaptez la fréquence de sauvegarde selon la criticité des données : données critiques quotidiennes, importantes hebdomadaires, archives mensuelles.",
            priority: "medium",
          });
        }
        if (question.id === 19 && !isCorrect) {
          securityTips.push({
            category: "Sauvegardes",
            issue: "Nombre de copies insuffisant",
            recommendation: "Appliquez la règle 3-2-1 : au moins 3 copies de vos données, sur 2 supports différents, dont 1 hors site. C'est la base de la résilience.",
            priority: "high",
          });
        }
        if (question.id === 21 && !isCorrect) {
          securityTips.push({
            category: "Sauvegardes",
            issue: "Règle 3-2-1 non respectée",
            recommendation: "Implémentez complètement la règle 3-2-1 : 3 copies des données, 2 types de supports différents (NAS + disques externes par exemple), 1 copie hors ligne ou hors site (protection ransomware).",
            priority: "high",
          });
        }
        if (question.id === 22 && !isCorrect) {
          securityTips.push({
            category: "Stockage",
            issue: "Configuration RAID non optimale",
            recommendation: "RAID 5 offre un bon équilibre entre redondance et capacité pour la plupart des environnements. RAID 1 ou 10 offrent de meilleures performances mais moins d'espace. Évitez RAID 0 en production.",
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
    window.location.href = "/questions/administrators/1";
    sessionStorage.removeItem("administrators-quiz-session");
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
          title: "Infrastructure hautement sécurisée",
          description: "Votre infrastructure respecte les meilleures pratiques de sécurité. Maintenez ce niveau d'excellence !",
          color: "text-green-600",
          bgColor: "bg-green-50 dark:bg-green-950/20",
          borderColor: "border-green-500/50",
        };
      case "good":
        return {
          icon: <Shield className="h-16 w-16 text-blue-600" />,
          title: "Infrastructure bien sécurisée",
          description: "Votre configuration est solide, mais quelques ajustements permettraient d'atteindre l'excellence.",
          color: "text-blue-600",
          bgColor: "bg-blue-50 dark:bg-blue-950/20",
          borderColor: "border-blue-500/50",
        };
      case "average":
        return {
          icon: <Shield className="h-16 w-16 text-yellow-600" />,
          title: "Infrastructure moyennement sécurisée",
          description: "Votre infrastructure a des bases correctes mais présente des lacunes à combler rapidement.",
          color: "text-yellow-600",
          bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
          borderColor: "border-yellow-500/50",
        };
      case "poor":
        return {
          icon: <ShieldAlert className="h-16 w-16 text-orange-600" />,
          title: "Infrastructure vulnérable",
          description: "Votre infrastructure présente des failles importantes. Une remédiation est nécessaire.",
          color: "text-orange-600",
          bgColor: "bg-orange-50 dark:bg-orange-950/20",
          borderColor: "border-orange-500/50",
        };
      case "critical":
        return {
          icon: <AlertTriangle className="h-16 w-16 text-red-600" />,
          title: "Infrastructure à risque critique",
          description: "Votre infrastructure présente des vulnérabilités majeures. Action immédiate requise.",
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
        Audit de Sécurité Infrastructure
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
            Score de conformité :
            {" "}
            {results.correct}
            {" "}
            /
            {" "}
            {results.total}
            {" "}
            bonnes pratiques implémentées
          </div>
        </CardContent>
      </Card>

      {results.securityTips.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Plan de remédiation</h2>
          <p className="text-muted-foreground">
            Voici les mesures prioritaires à mettre en œuvre pour renforcer votre infrastructure:
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
                  <p className="text-sm font-medium text-muted-foreground">Action recommandée:</p>
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
            <CardTitle className="text-green-600">Infrastructure exemplaire!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Votre infrastructure respecte toutes les bonnes pratiques évaluées. Continuez la veille technologique et les audits réguliers pour maintenir ce niveau de sécurité.</p>
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
