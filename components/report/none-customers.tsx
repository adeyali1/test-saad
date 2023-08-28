import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import * as clientApi from "../../http-client/non-customers.client";
import Spinner from "../common/spinner";
import { IUserNonCustomers } from "../../models/user-non-customers";

const NonCustomersReport = () => {
	const { data: session }: any = useSession();

	const emptyUserNonCustomers = {
		id: "",
		userId: session?.user?.id,
		soonNonCustomers: [],
		refusingNonCustomers: [],
		unwantedNonCustomers: [],
	} as IUserNonCustomers;

	const [userNonCustomers, setUserNonCustomers] = useState<IUserNonCustomers>(
		emptyUserNonCustomers
	);

	const { data, isLoading } = useQuery<IUserNonCustomers>({
		queryKey: [clientApi.Keys.All],
		queryFn: clientApi.getOne,
		refetchOnWindowFocus: false,
		enabled: !!session?.user?.id,
	});

	useEffect(() => {
		if (data) {
			setUserNonCustomers(data);
		}
	}, [data]);

	return (
		<div className='flex flex-col gap-5'>
			<div>
				<h2 className='report-header-4 font-hero-bold'>Non Customers</h2>
			</div>
			<div className='flex gap-5'>
				{isLoading && (
					<Spinner message='loading...' className='items-center' />
				)}
			</div>
			{!isLoading && !userNonCustomers && (
				<p className='p-3 text-yellow-700'>No non-customers are added</p>
			)}
			{!isLoading && !!userNonCustomers && (
				<div className='flex flex-col gap-5'>
					<div>
						<h3 className='report-header-3 font-hero-semibold mb-5'>
							Soon to be non-customers
						</h3>
						{!isLoading && !userNonCustomers.soonNonCustomers?.length && (
							<p className='p-3 text-yellow-700'>
								No customers most likely will be left out in this
								transformation
							</p>
						)}
						{!isLoading &&
							!!userNonCustomers.soonNonCustomers?.length && (
								<ul className='flex flex-col gap-2 pl-6'>
									{userNonCustomers.soonNonCustomers.map(
										(soonNonCustomer, soonNonCustomerIndex) => (
											<li
												key={soonNonCustomer + soonNonCustomerIndex}
												className='p-3 odd:bg-slate-50 list-disc'>
												{soonNonCustomer}
											</li>
										)
									)}
								</ul>
							)}
					</div>
					<div>
						<h3 className='report-header-3 font-hero-semibold mb-5'>
							Refusing non-customers
						</h3>
						{!isLoading &&
							!userNonCustomers.refusingNonCustomers?.length && (
								<p className='p-3 text-yellow-700'>
									No customers most likely will be refusing of this
									transformation
								</p>
							)}
						{!isLoading &&
							!!userNonCustomers.refusingNonCustomers?.length && (
								<ul className='flex flex-col gap-2 pl-6'>
									{userNonCustomers.refusingNonCustomers.map(
										(
											refusingNonCustomer,
											refusingNonCustomerIndex
										) => (
											<li
												key={
													refusingNonCustomer +
													refusingNonCustomerIndex
												}
												className='p-3 odd:bg-slate-50 list-disc'>
												{refusingNonCustomer}
											</li>
										)
									)}
								</ul>
							)}
					</div>
					<div>
						<h3 className='report-header-3 font-hero-semibold mb-5'>
							Unwanted non-customers
						</h3>
						{!isLoading &&
							!userNonCustomers.unwantedNonCustomers?.length && (
								<p className='p-3 text-yellow-700'>
									No Unwanted customers in this transformation
								</p>
							)}
						{!isLoading &&
							!!userNonCustomers.unwantedNonCustomers?.length && (
								<ul className='flex flex-col gap-2 pl-6'>
									{userNonCustomers.unwantedNonCustomers.map(
										(
											unwantedNonCustomer,
											unwantedNonCustomerIndex
										) => (
											<li
												key={
													unwantedNonCustomer +
													unwantedNonCustomerIndex
												}
												className='p-3 odd:bg-slate-50 list-disc'>
												{unwantedNonCustomer}
											</li>
										)
									)}
								</ul>
							)}
					</div>
				</div>
			)}
		</div>
	);
};

export default NonCustomersReport;
