import {
	faArrowRightFromBracket,
	faLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Tooltip from "../tooltip";
import { tooltipDirectionsEnum } from "../../../models/enums";

interface Props {
	className?: string;
}

const ReportActionsNavbar = ({ className }: Props) => {
	return (
		<nav
			className={`flex gap-10 justify-between items-center px-10 py-5 bg-white rounded-full ${
				className ?? ""
			}`}>
			<ul className='flex gap-10 items-center'>
				<li className='group relative flex justify-center hover:animate-vertical-shake'>
					<Link href='./roadmap'>
						<FontAwesomeIcon
							icon={faLeftLong}
							className='w-[3rem] h-[3rem] text-primary'
						/>
					</Link>
					{/* the parent of Tooltip must have the following css classes: "group relative" to work properly */}
					<Tooltip dir={tooltipDirectionsEnum.bottom}>Go Back</Tooltip>
				</li>
			</ul>
			<ul className='flex gap-10 items-center'>
				<li className='group relative flex justify-center'>
					<Image width='55' height='55' src='/cp.svg' alt='CaseInPoint' />
				</li>
				<li className='group relative flex justify-center hover:animate-vertical-shake'>
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
			<ul className='flex gap-10 items-center'>
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
			</ul>
		</nav>
	);
};

export default ReportActionsNavbar;
