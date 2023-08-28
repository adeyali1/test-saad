import { tooltipDirectionsEnum } from "../../models/enums";

interface Props {
	children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
	dir: tooltipDirectionsEnum;
	className?: string;
}

const Tooltip = ({ children, dir, className }: Props) => {
	const calcClassName = (): string => {
		let calculatedClassName = `group-hover:visible group-hover:opacity-100 invisible opacity-0 w-max d-block absolute z-[99999] px-3 py-1 font-medium text-lg text-white bg-dark-400 rounded-lg transition duration-500`;

		if (dir === tooltipDirectionsEnum.left) {
			calculatedClassName += "left-0 top-0 -translate-x-[100%]";
		}
		if (dir === tooltipDirectionsEnum.top) {
			calculatedClassName += "left-0 top-0 -translate-y-[105%]";
		}
		if (dir === tooltipDirectionsEnum.right) {
			calculatedClassName += "right-0 top-0 translate-x-[100%]";
		}
		if (dir === tooltipDirectionsEnum.bottom) {
			calculatedClassName += "left-0 bottom-0 translate-y-[105%]";
		}

		if (className) {
			calculatedClassName += ` ${className}`;
		}
		return calculatedClassName;
	};
	return (
		<div className={calcClassName()}>
			<>{children}</>
		</div>
	);
};

export default Tooltip;
