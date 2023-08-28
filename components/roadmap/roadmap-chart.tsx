import Chart, { ReactGoogleChartProps } from "react-google-charts";
import { useState, useEffect } from "react";
import { IUserIdeas } from "../../models/user-idea";

interface Props {
	userIdeas: IUserIdeas;
}

const RoadmapChart = ({ userIdeas }: Props) => {
	const [chart, setChart] = useState<ReactGoogleChartProps>({
		chartType: "Timeline",
		width: "100%",
		height: "100%",
		options: {},
		data: [],
	});
	const updateChartProps = () => {
		const rows =
			userIdeas.ideas?.map((idea) => {
				const startMonthDate = new Date(idea.startMonth);
				const endMonthDate = new Date(idea.startMonth).setMonth(
					startMonthDate.getMonth() + +idea.durationInMonths
				);
				return [idea.name, startMonthDate, endMonthDate];
			}) ?? [];
		chart.data = [["Idea", "Start Month", "End Month"], ...rows];
		const dynamicHeight = (userIdeas.ideas?.length + 1 ?? 0) * 44 + 3;
		chart.options = {
			title: "Ideas Timeline",
			height: dynamicHeight,
			titleTextStyle: {
				fontSize: 16,
			},
			colors: ["#FFDA57", "#FDC10E", "#1CE6A1"],
		};
		setChart({ ...chart });
	};

	useEffect(() => {
		if (userIdeas.ideas?.length) {
			updateChartProps();
		}
	}, [userIdeas]);

	return (
		<div className='h-full'>
			<Chart {...chart} legendToggle />
		</div>
	);
};

export default RoadmapChart;
