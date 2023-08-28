import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import * as clientApi from "../../http-client/ideas.client";
import { IIdea } from "../../models/types";
import { IUserIdeas } from "../../models/user-idea";
import Spinner from "../common/spinner";

interface Props {
	userIdeas: IUserIdeas;
	dispatchUserIdeas: (userIdeas: IUserIdeas) => void;
	todayDateStr: string;
	isLoading: boolean;
}

const RoadMapContent = ({
	userIdeas,
	dispatchUserIdeas,
	todayDateStr,
	isLoading,
}: Props) => {
	const { data: session }: any = useSession();

	const emptyIdea: IIdea = useMemo(() => {
		return {
			uuid: "",
			name: "",
			ownerName: "",
			startMonth: todayDateStr,
			durationInMonths: 6,
		} as IIdea;
	}, []);

	const queryClient = useQueryClient();

	const { mutate: createUserIdeas, isLoading: isCreatingIdeas } = useMutation(
		(userIdeas: IUserIdeas) => {
			return clientApi.insertOne(userIdeas);
		},
		{
			onSuccess: (updated) => {
				queryClient.invalidateQueries([clientApi.Keys.All]);
			},
		}
	);

	const { mutate: updateUserIdeas, isLoading: isUpdatingIdeas } = useMutation(
		(userIdeas: IUserIdeas) => {
			return clientApi.updateOne(userIdeas);
		},
		{
			onSuccess: (updated) => {
				queryClient.invalidateQueries([clientApi.Keys.All]);
			},
		}
	);

	const calcIdeaStartMonth = (idea: any) => {
		if (
			!idea.startMonth ||
			(idea.startMonth &&
				new Date(idea.startMonth) < new Date(userIdeas.startDate || ""))
		) {
			idea.startMonth = userIdeas.startDate || todayDateStr;
			dispatchUserIdeas({ ...userIdeas });
		}
		return idea.startMonth;
	};

	const getMinDateStr = (savedStartDateStr: string | undefined) => {
		if (!savedStartDateStr) {
			return todayDateStr;
		}
		if (new Date(savedStartDateStr) < new Date(todayDateStr)) {
			return savedStartDateStr;
		}
		return todayDateStr;
	};

	return (
		<>
			<div className='flex flex-col gap-5'>
				<h3 className='title-header'>Roadmap</h3>
				<div className='flex flex-col gap-5 p-5 bg-dark-50 rounded-2xl'>
					<h4 className='text-dark-400 text-[1.75rem] font-hero-semibold'>
						Create a timeline for your ideas
					</h4>
					<form className='max-w-[900px]'>
						<div className='flex flex-col gap-2 mb-5'>
							<label className='text-xl'>Start date</label>
							<div className='grow flex flex-col gap-2'>
								<input
									type='month'
									value={userIdeas.startDate}
									onChange={(e) => {
										userIdeas.startDate = e.target.value;
										dispatchUserIdeas({ ...userIdeas });
									}}
									min={getMinDateStr(userIdeas.startDate)}
									className='light-input w-min'
								/>
							</div>
						</div>
						<ul className='flex flex-col overflow-auto pb-5'>
							{!isLoading && !userIdeas.ideas.length && (
								<div className='w-full flex items-center'>
									<p className='text-xl text-center italic'>
										Start adding your ideas...
									</p>
								</div>
							)}
							{isLoading && (
								<Spinner
									className='flex items-center px-1 text-2xl'
									message='Loading ideas...'
								/>
							)}
							{!!userIdeas.ideas?.length &&
								!isLoading &&
								userIdeas.ideas.map((idea, index) => (
									<li
										key={index}
										className='flex gap-5 items-center py-2'>
										<div className='grow flex flex-col gap-2'>
											<label className='text-xl'>Idea</label>
											<input
												value={idea.name}
												onChange={(e) => {
													userIdeas.ideas[index].name =
														e.target.value;
													dispatchUserIdeas({ ...userIdeas });
												}}
												className='light-input'
											/>
										</div>
										<div className='flex flex-col gap-2'>
											<label className='text-xl'>
												Start (month)
											</label>
											<input
												type='month'
												value={calcIdeaStartMonth(idea)}
												onChange={(e) => {
													userIdeas.ideas[index].startMonth =
														e.target.value;
													dispatchUserIdeas({ ...userIdeas });
												}}
												min={userIdeas.startDate || todayDateStr}
												className='light-input w-min'
											/>
										</div>
										<div className='flex flex-col gap-2'>
											<label className='text-xl'>Idea Owner</label>
											<input
												type='text'
												value={idea.ownerName}
												onChange={(e) => {
													userIdeas.ideas[index].ownerName =
														e.target.value;
													dispatchUserIdeas({ ...userIdeas });
												}}
												className='light-input'
											/>
										</div>
										<div className='flex flex-col gap-2'>
											<label className='text-xl'>
												Duration (months)
											</label>
											<input
												type='number'
												min={1}
												max={12}
												value={idea.durationInMonths}
												onChange={(e) => {
													userIdeas.ideas[index].durationInMonths =
														+e.target.value;
													dispatchUserIdeas({ ...userIdeas });
												}}
												className='light-input'
											/>
										</div>
										<div className='self-end'>
											<div
												onClick={() => {
													userIdeas.ideas = userIdeas.ideas.filter(
														(idea, ideaIndex) =>
															ideaIndex !== index
													);
													dispatchUserIdeas({ ...userIdeas });
												}}
												className='w-[3.75rem] h-[3.75rem] inline-flex justify-center items-center rounded-full bg-gray-200 cursor-pointer text-dark-300 hover:text-dark-400'>
												<FontAwesomeIcon
													icon={faTimes}
													className='w-4'
												/>
											</div>
										</div>
									</li>
								))}
						</ul>
						<div className='h-10 flex justify-end'>
							{(isUpdatingIdeas || isCreatingIdeas) && (
								<Spinner
									className='items-center'
									message='Saving Ideas ...'
								/>
							)}
						</div>
						<div className='flex justify-between gap-5 my-5'>
							<button
								type='button'
								onClick={() => {
									const newIdea = { ...emptyIdea };
									newIdea.name = `New Idea`;
									userIdeas.ideas.push(newIdea);
									dispatchUserIdeas({ ...userIdeas });
								}}
								className='btn-primary px-[3.5rem] py-[1rem]'>
								<FontAwesomeIcon
									className='w-[0.8rem] h-auto cursor-pointer'
									icon={faPlus}
								/>
								<span className='text-xl'>Add New Idea</span>
							</button>
							<button
								type='button'
								onClick={() => {
									userIdeas.userId = session?.user?.id;
									userIdeas.ideas?.map((idea) => {
										if (!idea.uuid) {
											idea.uuid = crypto.randomUUID();
										}
									});
									if (userIdeas?.id) {
										updateUserIdeas({
											...userIdeas,
										});
									} else {
										createUserIdeas({
											...userIdeas,
										});
									}
								}}
								className='btn-rev'>
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default RoadMapContent;
