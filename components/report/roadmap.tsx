import Spinner from "../common/spinner";
import Chart from "react-google-charts";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState, useEffect, Fragment } from "react";
import { IUserIdeas } from "../../models/user-idea";
import * as clientApi from "../../http-client/ideas.client";
import RoadmapChart from "../roadmap/roadmap-chart";

const RoadmapReport = () => {
	const { data: session }: any = useSession();

	const todayDateStr = new Date().toISOString().substring(0, 7); // to get the "yyyy-mm" format

	const emptyUserIdeas: IUserIdeas = {
		id: "",
		startDate: todayDateStr,
		userId: session?.user?.id,
		ideas: [],
	} as IUserIdeas;
	const [userIdeas, setUserIdeas] = useState<IUserIdeas>(emptyUserIdeas);

	const { data, isLoading } = useQuery<IUserIdeas>({
		queryKey: [clientApi.Keys.All],
		queryFn: clientApi.getOne,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (data) {
			data.ideas.forEach((idea) => {
				!idea.durationInMonths ? (idea.durationInMonths = 6) : null;
			});
			setUserIdeas(data);
		}
	}, [data]);

	return (
		<div>
			<div className='mb-10'>
				<h2 className='report-header-4 font-hero-bold'>Roadmap</h2>
			</div>
			<div className='flex gap-5'>
				{isLoading && (
					<Spinner
						message='loading roadmap ideas...'
						className='items-center'
					/>
				)}
			</div>
			{!isLoading && !!userIdeas?.ideas?.length && (
				<div className='flex gap-3 mb-10'>
					<p className='font-hero-semibold mr-3'>Start Date</p>
					<p className='mr-3'>{userIdeas.startDate}</p>
				</div>
			)}
			{!isLoading && !!userIdeas?.ideas?.length && (
				<div className='mb-10'>
					<RoadmapChart userIdeas={userIdeas} />
				</div>
			)}
			{!isLoading && !userIdeas?.ideas?.length && (
				<p className='p-3 text-yellow-700'>No ideas are added yet</p>
			)}
			{!isLoading && !!userIdeas?.ideas?.length && (
				<Fragment key={userIdeas.id}>
					<table className='table-auto w-full border'>
						<thead>
							<tr className='bg-slate-50'>
								<th className='p-3 border'>Idea</th>
								<th className='p-3 border'>Start (Month)</th>
								<th className='p-3 border'>Idea Owner</th>
								<th className='p-3 border'>Duration (months)</th>
							</tr>
						</thead>
						<tbody>
							{userIdeas.ideas.map((idea) => (
								<tr key={idea.uuid} className='even:bg-slate-50'>
									<td className='p-3 border'>{idea.name}</td>
									<td className='p-3 border'>{idea.startMonth}</td>
									<td className='p-3 border'>{idea.ownerName}</td>
									<td className='p-3 border'>
										{idea.durationInMonths}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</Fragment>
			)}
		</div>
	);
};

export default RoadmapReport;
