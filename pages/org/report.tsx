import React, { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import jsPDF from "jspdf";
import GoalsReport from "../../components/report/goals";
import MarketPotentialReport from "../../components/report/market-potential";
import RedOceanReport from "../../components/report/red-ocean";
import BlueOceanReport from "../../components/report/blue-ocean";
import DisruptionReport from "../../components/report/disruption";
import VoiceOfCustomersReport from "../../components/report/voice-of-customers";
import { IUserProduct } from "../../models/user-product";
import * as clientApi from "../../http-client/products.client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import html2canvas from "html2canvas";
import NonCustomersReport from "../../components/report/none-customers";
import PioneerMigratorSettlerReport from "../../components/report/pioneer-migrator-settler";
import StepUpStepDownModelReport from "../../components/report/step-up-step-down-model-report";
import RoadmapReport from "../../components/report/roadmap";
import Spinner from "../../components/common/spinner";
import ActionsNavbar from "../../components/common/actions-navbar";
import { navbarDirectionsEnum, stepNamesEnum } from "../../models/enums";
import ReportActionsNavbar from "../../components/common/report/actions-navbar";

const MyComponent = () => {
	const { data: session }: any = useSession();

	const [isLoadingPdf, setIsLoadingPdf] = useState<boolean>(false);

	const [userProduct, setUserProduct] = useState<IUserProduct>();

	const { data, isLoading } = useQuery<IUserProduct>({
		queryKey: [clientApi.Keys.UserProduct, userProduct?.id],
		queryFn: clientApi.getAll,
		refetchOnWindowFocus: false,
		enabled: !!session?.user?.id,
	});

	useEffect(() => {
		if (data) {
			setUserProduct(data);
		}
	}, [data]);

	const handleDownloadPDF = async () => {
		setIsLoadingPdf(true);

		const a4WidthInPoints = 595.28; // in points
		const a4HeightInPoints = 841.89; // in points

		// Function to add a base64 image to a page in the PDF
		const addBase64ImageToPage = async (
			component: HTMLElement,
			imageContentHeight: number
		) => {
			const scale = 2;
			const canvas = await html2canvas(component, {
				scale,
				scrollY: -window.scrollY, // Set the scroll position to the current window's scrollY
			});
			const imageData = canvas.toDataURL("image/png"); // Get base64 image data

			const x = 10;
			const y = 0;

			pdf.addImage(
				imageData,
				"PNG",
				x,
				y,
				a4WidthInPoints - x,
				component.clientHeight * 0.75 - y // * 0.75 to convert from px to points
			);
		};

		const addComponentImage = async (component: HTMLElement) => {
			// const numOfPages = Math.ceil(component.clientHeight / a4_height); // to calc the number of pages needed to contain this component
			// for (let i = 1; i <= numOfPages; i++) {

			let imageHeight = component.clientHeight;

			// yDrawStartPoint += imageHeight;

			// let imageHeight =
			// 	(component.clientHeight -
			// 		((component.clientHeight / a4_height) % 1)) /
			// 	Math.floor(component.clientHeight / a4_height); // the height of image content in a page

			// if (i === numOfPages) {
			// 	imageHeight =
			// 		((component.clientHeight / a4_height) % 1) * a4_height; // to calc the height of image content in the last page
			// }

			await addBase64ImageToPage(component, imageHeight);
			// }
		};

		const pdfContentContainer = document.getElementById(
			"pdf-content-container"
		);

		const pdfContentComponent1 = document.getElementById(
			"pdf-content-component-1"
		);
		const pdfContentComponent2 = document.getElementById(
			"pdf-content-component-2"
		);
		const pdfContentComponent3 = document.getElementById(
			"pdf-content-component-3"
		);
		const pdfContentComponent4 = document.getElementById(
			"pdf-content-component-4"
		);
		const pdfContentComponent5 = document.getElementById(
			"pdf-content-component-5"
		);
		const pdfContentComponent6 = document.getElementById(
			"pdf-content-component-6"
		);
		const pdfContentComponent7 = document.getElementById(
			"pdf-content-component-7"
		);
		const pdfContentComponent8 = document.getElementById(
			"pdf-content-component-8"
		);
		const pdfContentComponent9 = document.getElementById(
			"pdf-content-component-9"
		);
		const pdfContentComponent10 = document.getElementById(
			"pdf-content-component-10"
		);

		if (
			!pdfContentContainer ||
			!pdfContentComponent1 ||
			!pdfContentComponent2 ||
			!pdfContentComponent3 ||
			!pdfContentComponent4 ||
			!pdfContentComponent5 ||
			!pdfContentComponent6 ||
			!pdfContentComponent7 ||
			!pdfContentComponent8 ||
			!pdfContentComponent9 ||
			!pdfContentComponent10
		) {
			console.error(
				"one or more of pdfContentComponents or the Container is/are not defined"
			);
			return;
		}

		// Create a new PDF
		const pdf = new jsPDF({
			orientation: "portrait",
			unit: "pt",
			format: [a4WidthInPoints, pdfContentContainer.clientHeight * 0.75], // A4 width and height in px (* 0.75 to convert from px to pt),
		});

		await addComponentImage(pdfContentContainer);
		// await addComponentImage(pdfContentComponent1);
		// await addComponentImage(pdfContentComponent2);
		// await addComponentImage(pdfContentComponent3);
		// await addComponentImage(pdfContentComponent4);
		// await addComponentImage(pdfContentComponent5);
		// await addComponentImage(pdfContentComponent6);
		// await addComponentImage(pdfContentComponent7);
		// await addComponentImage(pdfContentComponent8);
		// await addComponentImage(pdfContentComponent9);
		// await addComponentImage(pdfContentComponent10);

		// Save the PDF
		pdf.save("report.pdf");
		setIsLoadingPdf(false);
	};

	return (
		<div className='py-5 text-dark-400 bg-slate-100'>
			<div className='mb-10'>
				<ReportActionsNavbar className='max-w-[60%] mx-auto' />
			</div>
			<div className='w-[595.28pt] mx-auto'>
				<button
					onClick={handleDownloadPDF}
					disabled={isLoadingPdf}
					className={
						isLoadingPdf
							? "fixed top-11 right-12 w-[14rem] py-5 btn-primary z-[99999] font-hero-semibold text-2xl hover:shadow-none bg-primary-200 text-dark-400"
							: "fixed top-11 right-12 w-[14rem] py-5 btn-primary z-[99999] font-hero-semibold text-2xl hover:shadow-none hover:animate-shake"
					}>
					{isLoadingPdf ? (
						<Spinner message='loading pdf...' className='items-center' />
					) : (
						"Download PDF"
					)}
				</button>
				<div id='pdf-content-container' className='px-12 py-10 bg-white'>
					<h1 className='text-5xl font-hero-bold mb-10'>Report</h1>
					<div className='flex flex-col gap-10 min-h-[29.7cm]'>
						<div id='pdf-content-component-1'>
							<GoalsReport />
						</div>
						<div id='pdf-content-component-2'>
							<PioneerMigratorSettlerReport
								userProduct={userProduct}
								isLoading={isLoading}
							/>
						</div>
						<div id='pdf-content-component-3'>
							<MarketPotentialReport
								userProduct={userProduct}
								isLoading={isLoading}
							/>
						</div>
						<div id='pdf-content-component-4'>
							<RedOceanReport
								userProduct={userProduct}
								isLoading={isLoading}
							/>
						</div>
						<div id='pdf-content-component-5'>
							<DisruptionReport />
						</div>
						<div id='pdf-content-component-6'>
							<VoiceOfCustomersReport />
						</div>
						<div id='pdf-content-component-7'>
							<BlueOceanReport
								userProduct={userProduct}
								isLoading={isLoading}
							/>
						</div>
						<div id='pdf-content-component-8'>
							<NonCustomersReport />
						</div>
						<div id='pdf-content-component-9'>
							<StepUpStepDownModelReport />
						</div>
						<div id='pdf-content-component-10'>
							<RoadmapReport />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyComponent;
