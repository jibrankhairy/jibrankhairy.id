import Link from "next/link";
import { MdVerified as VerifiedIcon } from "react-icons/md";
import clsx from "clsx";

import Tooltip from "../../elements/Tooltip";
import Image from "../../elements/Image";
import Status from "../../elements/Status";
import ThemeToggle from "../../elements/ThemeToggle";
import LocaleSwitcher from "./LocaleSwitcher";

interface ProfileHeaderProps {
  expandMenu: boolean;
  imageSize: number;
}

const ProfileHeader = ({ expandMenu, imageSize }: ProfileHeaderProps) => {
  const adjustedSize = expandMenu ? 80 : imageSize * 1.1;

  return (
    <div
      className={clsx(
        "flex w-full flex-grow items-center gap-4 lg:flex-col lg:items-start lg:gap-0.5",
        expandMenu && "flex-col !items-start",
      )}
    >
      <Image
        src="/images/jibran.jpg"
        width={adjustedSize}
        height={adjustedSize}
        className={clsx(
          "border-2 border-neutral-400 transition-transform duration-300 dark:border-neutral-600",
          "rounded-full",
          "lg:hover:scale-105",
        )}
        alt="Jibran Khairy Akram"
      />

      <div className="flex flex-col">
        <div className="flex items-center space-x-1">
          <Link href="/" className="flex items-center space-x-1">
            <span className="text-sm font-medium hover:underline lg:text-xl">
              Jibran Khairy Akram
            </span>
            <Tooltip title="Verified" aria-label="Verified account">
              <VerifiedIcon size={18} className="text-blue-400" />
            </Tooltip>
          </Link>
        </div>
        <span className="hidden text-sm text-neutral-600 dark:text-neutral-500 lg:block">
          @jibrankhry
        </span>
      </div>

      <div className="hidden w-full items-center justify-between gap-2 lg:mt-2 lg:flex">
        <Status />
        <div className="flex gap-4">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
