import { BiCodeAlt as SkillsIcon } from "react-icons/bi";
import { useTranslations } from "next-intl";

import SkillCard from "./SkillCard";

import SectionHeading from "@/common/components/elements/SectionHeading";
import { STACKS } from "@/common/constants/stacks";
import MarqueeElement from "@/common/components/elements/MarqueeElement";

const SkillList = () => {
  const t = useTranslations("HomePage");

  const stacksInArray: Array<[string, JSX.Element]> = Object.entries(
    STACKS,
  ).sort(() => Math.random() - 0.5);

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <SectionHeading title={t("skills.title")} />
      </div>

      <div className="flex flex-col space-y-1 overflow-x-hidden">
        {Array.from({ length: 3 }, (_, index) => {
          const slider = [...stacksInArray].sort(() => Math.random() - 0.5);
          return (
            <MarqueeElement
              key={index}
              direction={index % 2 === 0 ? "left" : "right"}
            >
              {slider.map(([name, icon], index) => (
                <SkillCard key={index} name={name} icon={icon} />
              ))}
            </MarqueeElement>
          );
        })}
      </div>
    </section>
  );
};

export default SkillList;
