import Chart, {
	ChartWrapperOptions,
	ReactGoogleChartProps,
} from "react-google-charts";
import { IProduct } from "../../models/types";
import { useState, useEffect } from "react";

interface Props {
	product: IProduct;
	customOptions?: ChartWrapperOptions["options"];
}

const MarketPotentialProductChart = ({ product, customOptions }: Props) => {
	const [chart, setChart] = useState<ReactGoogleChartProps>({
		chartType: "PieChart",
		width: "100%",
		height: "100%",
		options: [],
		data: [],
	});
	const updateChartProps = () => {
		const rows =
			product.competitors?.map((comp) => [comp.name, comp.marketShare]) ??
			[];
		chart.data = [["Competitor", "Market share"], ...rows];

		chart.options = {
			title: product.name,
			titleTextStyle: {
				fontSize: 11, // Don't specify px
			},
			is3D: false,
			backgroundColor: "#f0f0f0",
			colors: ["#25AC54", "#3F6BAA", "#FACC15", "orange", "gray"],
			pieHole: 0.4,
			legend: {
				position: "right",
				alignment: "start",
				textStyle: {
					fontSize: 11,
				},
			},
			tooltip: { trigger: "none" },
			chartArea: {
				left: 10,
				top: 40,
				bottom: 40,
				width: "100%",
				height: "100%",
			},
			...customOptions,
		};
		setChart({ ...chart });
	};

	useEffect(() => {
		updateChartProps();
	}, [product]);

	return (
		<div className='shadow h-full'>
			<Chart {...chart} legendToggle />
		</div>
	);
};

export default MarketPotentialProductChart;
