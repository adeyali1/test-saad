import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IUserGoals } from "../../models/user-goal";
import * as clientApi from "../../http-client/goals.client";
import { useSession } from "next-auth/react";
import Spinner from "../common/spinner";

const GoalsReport = () => {
	const { data: session }: any = useSession();

	const [userGoals, setUserGoal] = useState<IUserGoals>();

	const { data, isLoading } = useQuery<IUserGoals>({
		queryKey: [clientApi.Keys.All],
		queryFn: clientApi.getAll,
		refetchOnWindowFocus: false,
		enabled: !!session?.user?.id,
	});

	useEffect(() => {
		if (data) {
			setUserGoal(data);
		}
	}, [data]);

	return (
		<div>
			<div className='mb-10'>
				<h2 className='report-header-4 font-hero-bold'>Goals Report</h2>
			</div>
			{isLoading && (
				<Spinner message='loading goals...' className='items-center' />
			)}
			{!isLoading && !!userGoals?.targetDate && (
				<div className='flex gap-5 mb-10'>
					<span className='font-hero-semibold'>Target Date:</span>
					<span>{userGoals.targetDate}</span>
				</div>
			)}
			{!isLoading && !userGoals?.goals?.length && (
				<p className='p-3 text-yellow-700'>No goals are added yet</p>
			)}
			<div className='pl-6'>
				<ul className='list-outside'>
					{!isLoading &&
						userGoals?.goals?.map((goal, index) => (
							<li
								key={goal + index}
								className='list-disc p-3 odd:bg-slate-50'>
								{goal}
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};

export default GoalsReport;
