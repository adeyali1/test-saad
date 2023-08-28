import { useEffect, useState } from "react";
import ReportTakeawaysNotes from "./takeaways-notes";
import { takeawayTypeEnums } from "../../../models/enums";
import { ITakeaway } from "../../../models/types";
import { IUserTakeaways } from "../../../models/user-takeaways";
import Spinner from "../../common/spinner";

interface Props {
	userTakeaways: IUserTakeaways;
	isLoading: boolean;
	className?: string;
}

const DisruptionReportTakeaways = ({
	userTakeaways,
	isLoading,
	className,
}: Props) => {
	const [scaleTakeaways, setScaleTakeaways] = useState<ITakeaway>();

	const [ideasTakeaways, setIdeasTakeaways] = useState<ITakeaway>();

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
					<ReportTakeawaysNotes
						title='Takeaways on Scale'
						takeaways={scaleTakeaways}
					/>
				)}
				{isLoading && (
					<Spinner message='Loading on ideas takeaways...' className='' />
				)}
				{!isLoading && (
					<ReportTakeawaysNotes
						title='Takeaways on Ideas'
						takeaways={ideasTakeaways}
					/>
				)}
			</div>
		</>
	);
};

export default DisruptionReportTakeaways;
