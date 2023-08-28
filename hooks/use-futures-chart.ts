import { useEffect, useState } from "react";
import { ReactGoogleChartProps } from "react-google-charts";
import { IProduct } from "../models/types";

const useFuturesChart = (products: IProduct[]) => {
	const [chart, setChart] = useState<ReactGoogleChartProps>({
		chartType: "BubbleChart",
		width: "100%",
		height: "90%",
		options: [],
		data: [],
	});

	useEffect(() => {
		if (products) {
			updateChartProps();
		}
	}, [products]);

	const updateChartProps = () => {
		let ticks: any = products.map((prod) => prod.futures?.map((future) => {
			return future.year;
		})).flat().sort((a, b) => {
			if (a && b) {
				return +a - +b;
			}
			return 0;
		}); // to get the future years sorted array (all products futures)

		ticks = [...new Set(ticks)]; // to avoid redundancy

		ticks = ticks.map((futureYear: string, i: number) => {
			return { v: i + 1, f: futureYear + "" };
		}); // to get the tick objects in the proper required shape for chart options

		const minFutureYear = Math.min(...ticks.map((t: any) => +t.f));
		const maxFutureYear = Math.max(...ticks.map((t: any) => +t.f));

		ticks.unshift({ v: 0, f: minFutureYear - 1 + "" });
		ticks.push({ v: ticks.length, f: maxFutureYear + 1 + "" });

		const rows =
			[...products].map((prod, prodIndex: number) => [...prod.futures ?? []]
				?.sort((a, b) => {
					if (a.year < b.year) return -1;
					return 1;
				})
				.map((future) => {
					const bubbleXPos: number = ticks.findIndex((t: any) => +t.f === future.year);
					return ["", bubbleXPos, +future.level, prod.name, future.sales];
				}) ?? []
			).flat(1);

		chart.data = [["Product Name", "Year", "Level", "Product Name", "Sales"], ...rows];

		const vAxisTicks: any = [
			{
				v: 1,
				f: "Settler",
			},
			{
				v: 2,
				f: "Migrator",
			},
			{
				v: 3,
				f: "Pioneer",
			},
		];

		chart.options = {
			title: "Products",
			legend: {
				position: "top",
				textStyle: {
					fontSize: 11,
				},
			},
			colors: [
				"#ffc000",
				"#86bf44",
				"#4472c4",
				"#ed7d31",
				"#2Fd645",
				"#048bfa",
				"#FFDA57",
				"#C62EE6",
				"#E68E39",
				"#2EBCE6",
			],
			tooltip: {
				trigger: "none",
			},
			hAxis: {
				textStyle: {
					bold: true,
					fontSize: 11,
				},
				allowContainerBoundaryTextCutoff: false,
				gridlines: {
					color: "#eee",
				},
				baseline: 0,
				ticks: ticks,
			},
			vAxis: {
				baseline: 0,
				maxValue: 4,
				ticks: vAxisTicks,
				gridlines: {
					color: "#eee",
				},
				textStyle: {
					fontSize: 11,
				},
			},
			bubble: {
				textStyle: {
					fontSize: 11,
				},
			},
			chartArea: {
				left: 70,
				top: 70,
				bottom: 60,
				right: 20,
				width: "100%",
				height: "90%",
			},
		};
		setChart({ ...chart });
	};

	return [chart];
};

export default useFuturesChart;
