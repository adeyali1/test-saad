import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { IUserCustomers } from "../../models/user-customers";
import * as clientApi from "../../http-client/customers.client";
import Spinner from "../common/spinner";

const VoiceOfCustomersReport = () => {
	const { data: session }: any = useSession();

	const emptyUserCustomers = {
		id: "",
		userId: session?.user?.id,
		topCategories: [],
		wishlist: [],
		fulfill: [],
	} as IUserCustomers;

	const [userCustomers, setUserCustomers] =
		useState<IUserCustomers>(emptyUserCustomers);

	const { data, isLoading } = useQuery<IUserCustomers>({
		queryKey: [clientApi.Keys.All],
		queryFn: clientApi.getOne,
		refetchOnWindowFocus: false,
		enabled: !!session?.user?.id,
	});

	useEffect(() => {
		if (data) {
			setUserCustomers(data);
		}
	}, [data]);

	return (
		<div className='flex flex-col gap-5'>
			<div>
				<h2 className='report-header-4 font-hero-bold'>
					Voice of Customers
				</h2>
			</div>
			<div className='flex gap-5'>
				{isLoading && (
					<Spinner message='loading...' className='items-center' />
				)}
			</div>
			{!isLoading && !userCustomers && (
				<p className='p-3 text-yellow-700'>No customers needs available</p>
			)}
			{!isLoading && !!userCustomers && (
				<div className='flex flex-col gap-5'>
					<div>
						<h3 className='report-header-3 font-hero-semibold mb-5'>
							Customer categories
						</h3>
						{!isLoading && !userCustomers.topCategories?.length && (
							<p className='p-3 text-yellow-700'>
								No categories are added yet
							</p>
						)}
						{!isLoading && !!userCustomers.topCategories?.length && (
							<ul className='flex flex-col gap-2 pl-6'>
								{userCustomers.topCategories.map(
									(category, categoryIndex) => (
										<li
											key={category + categoryIndex}
											className='p-3 odd:bg-slate-50 list-disc'>
											{category}
										</li>
									)
								)}
							</ul>
						)}
					</div>
					<div>
						<h3 className='report-header-3 font-hero-semibold mb-5'>
							What they want
						</h3>
						{!isLoading && !userCustomers.wishlist?.length && (
							<p className='p-3 text-yellow-700'>
								No categories are added yet
							</p>
						)}
						{!isLoading && !!userCustomers.wishlist?.length && (
							<ul className='flex flex-col gap-2 pl-6'>
								{userCustomers.wishlist.map(
									(wishlistItem, wishlistItemIndex) => (
										<li
											key={wishlistItem + wishlistItemIndex}
											className='p-3 odd:bg-slate-50 list-disc'>
											{wishlistItem}
										</li>
									)
								)}
							</ul>
						)}
					</div>
					<div>
						<h3 className='report-header-3 font-hero-semibold mb-5'>
							How to fulfill it
						</h3>
						{!isLoading && !userCustomers.fulfill?.length && (
							<p className='p-3 text-yellow-700'>
								No categories are added yet
							</p>
						)}
						{!isLoading && !!userCustomers.fulfill?.length && (
							<ul className='flex flex-col gap-2 pl-6'>
								{userCustomers.fulfill.map(
									(fulfillItem, fulfillItemIndex) => (
										<li
											key={fulfillItem + fulfillItemIndex}
											className='p-3 odd:bg-slate-50 list-disc'>
											{fulfillItem}
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

export default VoiceOfCustomersReport;
