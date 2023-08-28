import { useEffect, useState } from "react";
import { faCirclePlay, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as clientApi from "../../http-client/videos.client";
import * as takeawaysApi from "../../http-client/takeaways.client";

import { IVideos } from "../../models/videos";
import { useSession } from "next-auth/react";
import { takeawayTypeEnums, videoPropNamesEnum } from "../../models/enums";
import { useRouter } from "next/router";
import DisruptionTakeaways from "./takeaways";
import Image from "next/image";
import Spinner from "../common/spinner";
import { IUserTakeaways } from "../../models/user-takeaways";

interface Props {
	videos: IVideos;
	dispatchVideos: (videos: IVideos) => void;
	setSelectedVideoPropName: (name: videoPropNamesEnum) => void;
	toggleVideoModal: (isOpen?: boolean) => void;
	toggleEditUrlsModal: (isOpen?: boolean) => void;
}

const DisruptionContent = ({
	videos,
	dispatchVideos,
	setSelectedVideoPropName,
	toggleVideoModal,
	toggleEditUrlsModal,
}: Props) => {
	const { data: session }: any = useSession();

	const router = useRouter();

	const { data, isLoading } = useQuery<IVideos>({
		queryKey: [clientApi.Keys.all],
		queryFn: clientApi.getOne,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (data) {
			dispatchVideos(data);
		}
	}, [data]);

	const emptyScaleTakeaways = {
		type: takeawayTypeEnums.scale,
		notes: [],
	};

	const emptyIdeasTakeaways = {
		type: takeawayTypeEnums.ideas,
		notes: [],
	};

	const emptyUserTakeaways: IUserTakeaways = {
		id: "",
		userId: session?.user?.id,
		takeaways: [emptyScaleTakeaways, emptyIdeasTakeaways],
	};

	const [userTakeaways, setUserTakeaways] =
		useState<IUserTakeaways>(emptyUserTakeaways);

	const { data: userTakeawaysRes, isLoading: isLoadingTakeaways } =
		useQuery<IUserTakeaways>(
			[takeawaysApi.Keys.all, userTakeaways.id],
			takeawaysApi.getOne,
			{
				enabled: !!session?.user?.id,
				refetchOnWindowFocus: false,
			}
		);

	useEffect(() => {
		if (!!userTakeawaysRes) {
			setUserTakeaways(userTakeawaysRes);
		}
	}, [userTakeawaysRes]);

	const queryClient = useQueryClient();

	const { mutate: updateUserTakeaways, isLoading: isUpdatingUserTakeaways } =
		useMutation(
			(userTakeaways: IUserTakeaways) => {
				return takeawaysApi.updateOne(userTakeaways);
			},
			{
				onMutate: (updated) => {
					queryClient.setQueryData(
						[takeawaysApi.Keys.all, userTakeaways.id],
						updated
					);
				},
				onSuccess: (updated) => {
					queryClient.invalidateQueries([
						takeawaysApi.Keys.all,
						userTakeaways.id,
					]);
				},
			}
		);

	const { mutate: createUserTakeaways, isLoading: isCreatingUserTakeaways } =
		useMutation(
			(userTakeaways: IUserTakeaways) =>
				takeawaysApi.insertOne(userTakeaways),
			{
				onMutate: (updated) => {
					queryClient.setQueryData(
						[takeawaysApi.Keys.all, userTakeaways.id],
						updated
					);
				},
				onSuccess: (updated) => {
					queryClient.invalidateQueries([
						takeawaysApi.Keys.all,
						userTakeaways.id,
					]);
					queryClient.invalidateQueries([takeawaysApi.Keys.all]);
				},
			}
		);

	return (
		<>
			<h3 className='title-header'>Disruption</h3>

			<div className='pill-yellow-50 p-3 mb-5'>
				<div className='w-[3rem] h-[3rem]'>
					<Image
						src='/bulb.svg'
						alt='Bulb Icon'
						width={0}
						height={0}
						className='w-full h-auto'
					/>
				</div>
				<h3 className='text-xl text-dark-300'>
					Watch help videos then update your ideas accordingly. Submit for
					feedback.
				</h3>
			</div>

			<div className='flex flex-wrap gap-5 p-5 bg-dark-50'>
				<div className='col-1/2 grow'>
					<h4 className='mb-3 text-[1.75rem] text-dark-400 font-hero-bold'>
						Scale
					</h4>
					<ul className='flex flex-col gap-3 mb-5'>
						<li className='pill-primary-300 text-xl'>
							Staff on Demand
							<div
								className='cursor-pointer hover:scale-[115%] transition duration-100'
								onClick={() => {
									setSelectedVideoPropName(
										videoPropNamesEnum.staffOnDemand
									);
									toggleVideoModal();
								}}>
								<FontAwesomeIcon
									className='w-9 h-auto text-primary-300 bg-white rounded-full p-[1.3px]'
									icon={faCirclePlay}
								/>
							</div>
						</li>
						<li className='pill-primary-300 text-xl'>
							Community and Crowd
							<div
								className='cursor-pointer hover:scale-[115%] transition duration-200'
								onClick={() => {
									setSelectedVideoPropName(
										videoPropNamesEnum.communityAndCrowd
									);
									toggleVideoModal();
								}}>
								<FontAwesomeIcon
									className='w-9 h-auto text-primary-300 bg-white rounded-full p-[1.3px]'
									icon={faCirclePlay}
								/>
							</div>
						</li>
						<li className='pill-primary-300 text-xl'>
							Algorithms
							<div
								className='cursor-pointer hover:scale-[115%] transition duration-200'
								onClick={() => {
									setSelectedVideoPropName(
										videoPropNamesEnum.algorithms
									);
									toggleVideoModal();
								}}>
								<FontAwesomeIcon
									className='w-9 h-auto text-primary-300 bg-white rounded-full p-[1.3px]'
									icon={faCirclePlay}
								/>
							</div>
						</li>
						<li className='pill-primary-300 text-xl'>
							Leveraged Assets
							<div
								className='cursor-pointer hover:scale-[115%] transition duration-200'
								onClick={() => {
									setSelectedVideoPropName(
										videoPropNamesEnum.leveragedAssets
									);
									toggleVideoModal();
								}}>
								<FontAwesomeIcon
									className='w-9 h-auto text-primary-300 bg-white rounded-full p-[1.3px]'
									icon={faCirclePlay}
								/>
							</div>
						</li>
						<li className='pill-primary-300 text-xl'>
							Engagement
							<div
								className='cursor-pointer hover:scale-[115%] transition duration-200'
								onClick={() => {
									setSelectedVideoPropName(
										videoPropNamesEnum.Engagement
									);
									toggleVideoModal();
								}}>
								<FontAwesomeIcon
									className='w-9 h-auto text-primary-300 bg-white rounded-full p-[1.3px]'
									icon={faCirclePlay}
								/>
							</div>
						</li>
					</ul>
				</div>
				<div className='col-1/2 grow'>
					<h4 className='mb-3 text-[1.75rem] text-dark-400 font-hero-bold'>
						Ideas
					</h4>

					<ul className='flex flex-col gap-3 mb-5'>
						<li className='pill-primary-300 text-xl'>
							Interface
							<div
								className='cursor-pointer hover:scale-[115%] transition duration-200'
								onClick={() => {
									setSelectedVideoPropName(
										videoPropNamesEnum.interface
									);
									toggleVideoModal();
								}}>
								<FontAwesomeIcon
									className='w-9 h-auto text-primary-300 bg-white rounded-full p-[1.3px]'
									icon={faCirclePlay}
								/>
							</div>
						</li>
						<li className='pill-primary-300 text-xl'>
							Dashboard
							<div
								className='cursor-pointer hover:scale-[115%] transition duration-200'
								onClick={() => {
									setSelectedVideoPropName(
										videoPropNamesEnum.dashboard
									);
									toggleVideoModal();
								}}>
								<FontAwesomeIcon
									className='w-9 h-auto text-primary-300 bg-white rounded-full p-[1.3px]'
									icon={faCirclePlay}
								/>
							</div>
						</li>
						<li className='pill-primary-300 text-xl'>
							Experimentation
							<div
								className='cursor-pointer hover:scale-[115%] transition duration-200'
								onClick={() => {
									setSelectedVideoPropName(
										videoPropNamesEnum.experimentation
									);
									toggleVideoModal();
								}}>
								<FontAwesomeIcon
									className='w-9 h-auto text-primary-300 bg-white rounded-full p-[1.3px]'
									icon={faCirclePlay}
								/>
							</div>
						</li>
						<li className='pill-primary-300 text-xl'>
							Autonomy
							<div
								className='cursor-pointer hover:scale-[115%] transition duration-200'
								onClick={() => {
									setSelectedVideoPropName(
										videoPropNamesEnum.autonomy
									);
									toggleVideoModal();
								}}>
								<FontAwesomeIcon
									className='w-9 h-auto text-primary-300 bg-white rounded-full p-[1.3px]'
									icon={faCirclePlay}
								/>
							</div>
						</li>
						<li className='pill-primary-300 text-xl'>
							Social Platforms
							<div
								className='cursor-pointer hover:scale-[115%] transition duration-200'
								onClick={() => {
									setSelectedVideoPropName(
										videoPropNamesEnum.socialPlatforms
									);
									toggleVideoModal();
								}}>
								<FontAwesomeIcon
									className='w-9 h-auto text-primary-300 bg-white rounded-full p-[1.3px]'
									icon={faCirclePlay}
								/>
							</div>
						</li>
					</ul>
				</div>
			</div>

			<DisruptionTakeaways
				userTakeaways={userTakeaways}
				dispatchUserTakeaways={setUserTakeaways}
				isLoading={isLoadingTakeaways}
				className='flex flex-col gap-[5.5rem] xl:flex-nowrap w-full my-5 px-6'
			/>

			<div className='h-10'>
				{isUpdatingUserTakeaways && (
					<Spinner
						className='pl-10 flex items-center text-2xl'
						message='Saving your takeaways...'
					/>
				)}
				{isCreatingUserTakeaways && (
					<Spinner
						className='pl-10 flex items-center text-2xl'
						message='Saving your takeaways...'
					/>
				)}
			</div>

			{(session?.user as any)?.role !== "admin" && (
				<div className='flex gap-5 justify-end'>
					{!!userTakeaways && (
						<button
							onClick={() => {
								if (!userTakeaways.id) {
									createUserTakeaways({
										...userTakeaways,
									});
								} else {
									updateUserTakeaways({
										...userTakeaways,
									});
								}
							}}
							className='btn-rev'>
							Save
						</button>
					)}
					{!!videos.id && (
						<div
							className='cursor-pointer bg-dark-300 hover:shadow-lg px-9 py-3 rounded-full'
							onClick={() => {
								router.push("../org/voice-of-customers");
							}}>
							<span className='text-xl text-md text-white'>
								Go to next -{" "}
								<span className='text-white'>Voice of Customers</span>
							</span>
						</div>
					)}
				</div>
			)}
			{(session?.user as any)?.role === "admin" && (
				<div className='flex gap-5 justify-between'>
					<div className='flex gap-5'>
						<button
							className='btn-primary-light'
							onClick={() => toggleEditUrlsModal(true)}>
							<span>Edit video Urls</span>
							<FontAwesomeIcon className='w-7' icon={faEdit} />
						</button>
						{!!userTakeaways && (
							<button
								onClick={() => {
									if (!userTakeaways.id) {
										createUserTakeaways({
											...userTakeaways,
										});
									} else {
										updateUserTakeaways({
											...userTakeaways,
										});
									}
								}}
								className='btn-rev'>
								Save
							</button>
						)}
					</div>
					{!!videos.id && (
						<div
							className='cursor-pointer bg-dark-300 hover:shadow-lg px-9 py-3 rounded-full'
							onClick={() => {
								router.push("../org/voice-of-customers");
							}}>
							<span className='text-xl text-md text-white'>
								Go to next -{" "}
								<span className='text-white'>Voice of Customers</span>
							</span>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default DisruptionContent;
