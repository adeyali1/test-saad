import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import * as clientApi from "../../http-client/analysis.client";
import Spinner from "../common/spinner";
import { IUserAnalysis } from "../../models/user-analysis";

const StepUpStepDownModelReport = () => {
	const { data: session }: any = useSession();

	const emptyUserAnalysis = {
		id: "",
		userId: session?.user?.id,
		above: [],
		below: [],
		customers: [],
	} as IUserAnalysis;

	const [userAnalysis, setUserAnalysis] =
		useState<IUserAnalysis>(emptyUserAnalysis);

	const { data, isLoading } = useQuery<IUserAnalysis>({
		queryKey: [clientApi.Keys.All],
		queryFn: clientApi.getOne,
		refetchOnWindowFocus: false,
		enabled: !!session?.user?.id,
	});

	useEffect(() => {
		if (data) {
			setUserAnalysis(data);
		}
	}, [data]);

	return (
		<div className='flex flex-col gap-5'>
			<div>
				<h2 className='report-header-4 font-hero-bold'>
					Step-up Step-down
				</h2>
			</div>
			<div className='flex gap-5'>
				{isLoading && (
					<Spinner message='loading...' className='items-center' />
				)}
			</div>
			{!isLoading && !userAnalysis && (
				<p className='p-3 text-yellow-700'>No step details are added</p>
			)}
			{!isLoading && !!userAnalysis && (
				<div className='flex flex-col gap-5'>
					<div>
						<h3 className='report-header-3 font-hero-semibold mb-5'>
							10% above
						</h3>
						{!isLoading && !userAnalysis.above?.length && (
							<p className='p-3 text-yellow-700'>
								you will have no customers if you step 10% above
							</p>
						)}
						{!isLoading && !!userAnalysis.above?.length && (
							<ul className='flex flex-col gap-2 pl-6'>
								{userAnalysis.above.map((aboveItem, aboveItemIndex) => (
									<li
										key={aboveItem + aboveItemIndex}
										className='p-3 odd:bg-slate-50 list-disc'>
										{aboveItem}
									</li>
								))}
							</ul>
						)}
					</div>
					<div>
						<h3 className='report-header-3 font-hero-semibold mb-5'>
							Your Customers
						</h3>
						{!isLoading && !userAnalysis.customers?.length && (
							<p className='p-3 text-yellow-700'>
								You currently have no customers
							</p>
						)}
						{!isLoading && !!userAnalysis.customers?.length && (
							<ul className='flex flex-col gap-2 pl-6'>
								{userAnalysis.customers.map(
									(customer, customerIndex) => (
										<li
											key={customer + customerIndex}
											className='p-3 odd:bg-slate-50 list-disc'>
											{customer}
										</li>
									)
								)}
							</ul>
						)}
					</div>
					<div>
						<h3 className='report-header-3 font-hero-semibold mb-5'>
							10% below
						</h3>
						{!isLoading && !userAnalysis.below?.length && (
							<p className='p-3 text-yellow-700'>
								You will have no customers if you step 10% below
							</p>
						)}
						{!isLoading && !!userAnalysis.below?.length && (
							<ul className='flex flex-col gap-2 pl-6'>
								{userAnalysis.below.map((below, belowIndex) => (
									<li
										key={below + belowIndex}
										className='p-3 odd:bg-slate-50 list-disc'>
										{below}
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default StepUpStepDownModelReport;
