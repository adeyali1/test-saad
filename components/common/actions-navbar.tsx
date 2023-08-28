import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
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
	return (
		<nav
			className={`h-[85%] w-[102px] flex flex-col gap-10 justify-between items-center px-5 py-10 bg-white rounded-full ${
				className ?? ""
			}`}>
			<ul
				className={
					dir === navbarDirectionsEnum.vertical
						? "flex flex-col gap-10"
						: "flex gap-10 items-center"
				}>
				<li className='flex justify-center'>
					<Image width='55' height='55' src='/cp.svg' alt='CaseInPoint' />
				</li>
				<li className='group relative flex justify-center hover:animate-shake'>
					<Link href='/'>
						<Image
							width='42'
							height='42'
							src='/dashboard.svg'
							alt='Dashboard'
						/>
					</Link>
					{/* the parent of Tooltip must have the following css classes: "group relative" to work properly */}
					<Tooltip dir={tooltipDirectionsEnum.bottom}>Dashboard</Tooltip>
				</li>
				{dir === navbarDirectionsEnum.vertical && (
					<li className='group relative flex justify-center hover:animate-shake'>
						<ConsultantReview pageTitle={displayedPageTitle}>
							<Image
								width='45'
								height='45'
								src='/consultations.svg'
								alt='Consultations'
							/>
						</ConsultantReview>
						{/* the parent of Tooltip must have the following css classes: "group relative" to work properly */}
						<Tooltip dir={tooltipDirectionsEnum.bottom}>
							<p className='w-max'>
								<strong>Request </strong> for consultant review
							</p>
						</Tooltip>
					</li>
				)}
				<li className='group relative flex justify-center hover:animate-shake'>
					<Link href='/'>
						<Image
							width='42'
							height='42'
							src='/dashboard.svg'
							alt='Dashboard'
						/>
					</Link>
					{/* the parent of Tooltip must have the following css classes: "group relative" to work properly */}
					<Tooltip dir={tooltipDirectionsEnum.bottom}>Dashboard</Tooltip>
				</li>
			</ul>
			<li
				onClick={() => {
					signOut({
						callbackUrl: "/",
					});
				}}
				className='group relative rounded-full w-[4rem] h-[4rem] p-4 bg-icons-gray hover:p-4 hover:btn-danger hover:cursor-pointer transition duration-200'>
				<FontAwesomeIcon
					icon={faArrowRightFromBracket}
					className='text-white'
				/>
				{/* the parent of Tooltip must have the following css classes: "group relative" to work properly */}
				<Tooltip dir={tooltipDirectionsEnum.bottom}>Logout</Tooltip>
			</li>
		</nav>
	);
};

export default ActionsNavbar;
