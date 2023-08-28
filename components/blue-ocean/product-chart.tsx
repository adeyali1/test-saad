import Chart, {
	ChartWrapperOptions,
	ReactGoogleChartProps,
} from "react-google-charts";
import { IFactorCompetitor, IProduct } from "../../models/types";
import { useState, useEffect } from "react";

interface Props {
	product: IProduct;
	customOptions?: ChartWrapperOptions["options"];
}

const BlueOceanProductChart = ({ product, customOptions }: Props) => {
	const [chart, setChart] = useState<ReactGoogleChartProps>({
		chartType: "LineChart",
		width: "100%",
		height: "100%",
		options: {},
		data: [],
	});
	const updateChartProps = () => {
		const competitors =
			product.competitors?.filter((c) => !c.isUntapped) ?? [];

		const rows =
			product.ideaFactors?.map((ideaFactor) => {
				return [
					ideaFactor.name,
					...competitors.map((comp) => {
						const ideaFactorComp: IFactorCompetitor | undefined =
							ideaFactor.competitors.find(
								(competitor) => comp.uuid === competitor.uuid
							);
						if (ideaFactorComp) {
							return +ideaFactorComp.value;
						}
						return 1;
					}),
				];
			}) ?? [];
		chart.data = [
			["IdeaFactor", ...(competitors?.map((comp) => comp.name) ?? [])],
			...rows,
		];
		chart.options = {
			title: `Blue Ocean: ${product.name}`,
			titleTextStyle: {
				fontSize: 12, // 12, 18 whatever you want (don't specify px),
			},
			is3D: false,
			backgroundColor: "#f0f0f0",
			colors: [
				"#3e6daa",
				"#ff3b00",
				"#00c2a0",
				"#ff6200",
				"#00aa00",
				"#da00b1",
				"#007eff",
				"#ff005a",
				"#ffc500",
				"#ff80d6",
				"#66ff00",
				"#ff3333",
				"#b300ff",
			],
			legend: {
				position: "right",
				alignment: "start",
				textStyle: {
					fontSize: 10,
				},
			},
			tooltip: { trigger: "none" },
			bubble: {
				textStyle: {
					fontSize: 11,
				},
			},
			vAxis: {
				ticks: [
					{ v: "1", f: "Poor" },
					{ v: "2", f: "Moderate" },
					{ v: "3", f: "Good" },
					{ v: "4", f: "Excellent" },
				] as any,
				// title: "Competency Level",
			},
			chartArea: {
				left: 100,
				top: 70,
				bottom: 60,
				right: 100,
				width: "100%",
				height: "100%",
			},
			...customOptions,
		};
		setChart({ ...chart });
	};

	useEffect(() => {
		if (product.competitors?.length) {
			updateChartProps();
		}
	}, [product]);

	return (
		<div className='shadow h-full'>
			<Chart {...chart} legendToggle />
		</div>
	);
};

export default BlueOceanProductChart;
