"use client";

import useSWR from "swr";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import EmptyState from "@/common/components/elements/EmptyState";
import { AchievementItem } from "@/common/types/achievements";
import { fetcher } from "@/services/fetcher";

import AchievementCard from "./AchievementCard";
import AchievementSkeleton from "./AchievementSkeleton";

const Achievements = () => {
  const t = useTranslations("AchievementsPage");

  const { data, isLoading, error } = useSWR("/api/achievements", fetcher);

  const shownAchievements: AchievementItem[] = data
    ?.filter((item: AchievementItem) => item?.is_show)
    .sort((a: AchievementItem, b: AchievementItem) => b.id - a.id);

  return (
    <section className="space-y-4">
      {isLoading && <AchievementSkeleton />}

      {error && <EmptyState message={t("error")} />}

      {shownAchievements?.length === 0 && <EmptyState message={t("no_data")} />}

      {!isLoading && !error && shownAchievements.length !== 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {shownAchievements?.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <AchievementCard key={index} {...item} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Achievements;
