import CodingActive from "./CodingActive";
import Contributions from "./Contributions";

import Breakline from "@/common/components/elements/Breakline";
import { GITHUB_ACCOUNTS } from "@/common/constants/github";

const Dashboard = () => {
  return (
    <>
      <Contributions endpoint={GITHUB_ACCOUNTS.endpoint} />
      <Breakline className="my-8" />
      <CodingActive />
    </>
  );
};

export default Dashboard;
