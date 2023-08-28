import { IUserTakeaways } from "../../models/user-takeaways";
import { takeawayTypeEnums } from "../../models/enums";
import Spinner from "../common/spinner";
import { useEffect, useState } from "react";
import { ITakeaway } from "../../models/types";
import TakeawaysNotes from "./takeaways-notes";

interface Props {
	userTakeaways: IUserTakeaways;
	dispatchUserTakeaways: (takeawaysCallback: any) => void;
	isLoading: boolean;
	className?: string;
}

const DisruptionTakeaways = ({
	userTakeaways,
	dispatchUserTakeaways,
	isLoading,
	className,
}: Props) => {
	const [scaleTakeaways, setScaleTakeaways] = useState<
		ITakeaway | undefined
	>();

	const [ideasTakeaways, setIdeasTakeaways] = useState<
		ITakeaway | undefined
	>();

	useEffect(() => {
		if (userTakeaways) {
			setScaleTakeaways(
				userTakeaways.takeaways?.find(
					(t) => t.type === takeawayTypeEnums.scale
				)
			);
			setIdeasTakeaways(
				userTakeaways.takeaways?.find(
					(t) => t.type === takeawayTypeEnums.ideas
				)
			);
		}
	}, [userTakeaways]);

	return (
		<>
			<div className={`${className ?? ""} `}>
				{isLoading && (
					<Spinner message='Loading on scale takeaways...' className='' />
				)}
				{!isLoading && (
					<TakeawaysNotes
						title='Takeaways on Scale'
						takeaways={scaleTakeaways}
						dispatchUserTakeaways={dispatchUserTakeaways}
					/>
				)}
				{isLoading && (
					<Spinner message='Loading on ideas takeaways...' className='' />
				)}
				{!isLoading && (
					<TakeawaysNotes
						title='Takeaways on Ideas'
						takeaways={ideasTakeaways}
						dispatchUserTakeaways={dispatchUserTakeaways}
					/>
				)}
			</div>
		</>
	);
};

export default DisruptionTakeaways;
