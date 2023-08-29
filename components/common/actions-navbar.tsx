import {
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import ConsultantReview from "./consultant-review";
import {
  navbarDirectionsEnum,
  stepNamesEnum,
  tooltipDirectionsEnum,
} from "../../models/enums";
import Tooltip from "./tooltip";
import { useRouter } from "next/router";
import { useUser } from "../../context/webContext";
import { useEffect } from "react";

interface Props {
  selectedStepTitle: stepNamesEnum;
  dir?: navbarDirectionsEnum;
  className?: string;
}

const ActionsNavbar = ({
  selectedStepTitle: displayedPageTitle,
  dir = navbarDirectionsEnum.vertical,
  className,
}: Props) => {
  const { user, setUser } = useUser();
  const router = useRouter();
  const callAdmin = () => {
    router.push("/admin/dashboard");
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUser = async () => {
    const token = localStorage.getItem("auth-token");
    const res = await fetch("/api/user/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    setUser(data.user);
  };

  const logOutUser = () => {
    localStorage.removeItem("auth-token");
    // router.push("/");
    signOut({ callbackUrl: "/" });
    console.log("logging out");
  };

  useEffect(() => {
    if (!user) getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <nav
      className={`h-[85%] w-[102px] flex flex-col gap-10 justify-between items-center px-5 py-10 bg-white rounded-full ${
        className ?? ""
      }`}
    >
      <ul
        className={
          dir === navbarDirectionsEnum.vertical
            ? "flex flex-col gap-10"
            : "flex gap-10 items-center"
        }
      >
        <li className="flex justify-center">
          <Image width="55" height="55" src="/cp.svg" alt="CaseInPoint" />
        </li>
        <li className="group relative flex justify-center hover:animate-shake">
          <Link href="/">
            <Image
              width="42"
              height="42"
              src="/dashboard.svg"
              alt="Dashboard"
            />
          </Link>
          {/* the parent of Tooltip must have the following css classes: "group relative" to work properly */}
          <Tooltip dir={tooltipDirectionsEnum.bottom}>Dashboard</Tooltip>
        </li>
        {dir === navbarDirectionsEnum.vertical && (
          <li className="group relative flex justify-center hover:animate-shake">
            <ConsultantReview pageTitle={displayedPageTitle}>
              <Image
                width="45"
                height="45"
                src="/consultations.svg"
                alt="Consultations"
              />
            </ConsultantReview>
            {/* the parent of Tooltip must have the following css classes: "group relative" to work properly */}
            <Tooltip dir={tooltipDirectionsEnum.bottom}>
              <p className="w-max">
                <strong>Request </strong> for consultant review
              </p>
            </Tooltip>
          </li>
        )}
      </ul>
      <ul>
        {user && user.role === "admin" && (
          <li
            onClick={callAdmin}
            className="group hover:text-white relative rounded-full w-[4rem] text-white h-[4rem] mb-4 p-4 bg-icons-gray hover:p-4 hover:btn-danger hover:cursor-pointer transition duration-200"
          >
            <FontAwesomeIcon icon={faUser} className="text-white" />
            <Tooltip dir={tooltipDirectionsEnum.bottom}>Admin</Tooltip>
            {/* the parent of Tooltip must have the following css classes: "group relative" to work properly */}
          </li>
        )}
        <li
          onClick={logOutUser}
          className="group relative rounded-full w-[4rem] h-[4rem] p-4 bg-icons-gray hover:p-4 hover:btn-danger hover:cursor-pointer transition duration-200"
        >
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            className="text-white"
          />
          {/* the parent of Tooltip must have the following css classes: "group relative" to work properly */}
          <Tooltip dir={tooltipDirectionsEnum.bottom}>Logout</Tooltip>
        </li>
      </ul>
    </nav>
  );
};

export default ActionsNavbar;
