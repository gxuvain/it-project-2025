import { Hero } from "@/components/blocks/hero";

export default function Home() {
  return (
    <Hero
      title="Questionnaire de sécurité"
      subtitle="Questionnaire de sécurité permettant d'identifier les vulnérabilités et de mesurer le niveau de sécurité des infrastructures, des données et des processus, ainsi que le respect des normes."
      actions={[
        {
          icon: "Rocket",
          label: "Commencer",
          href: "/questions",
          variant: "default",
        },
      ]}
      titleClassName="text-5xl md:text-6xl font-extrabold"
      subtitleClassName="text-lg md:text-xl max-w-[600px]"
      actionsClassName="mt-8"
    />
  );
}
