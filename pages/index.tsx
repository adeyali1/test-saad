import { useSession } from "next-auth/react";
import Login from "../components/auth/login";
import Signup from "../components/auth/signup";
import Modal from "../components/common/modal";
import useModalToggler from "../hooks/use-modal-toggler";
import {
	faAngleRight,
	faCirclePlay,
	faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import Video from "../components/disruption/video";
import { videoPropNamesEnum } from "../models/enums";
import SharedVideoForm from "../components/disruption/shared-video-form";
import { useQuery } from "@tanstack/react-query";
import objectPath from "object-path";
import { useState, useEffect } from "react";
import { IVideos } from "../models/videos";
import * as clientApi from "../http-client/videos.client";
import Spinner from "../components/common/spinner";
import Link from "next/link";

export default function Home() {
	const { data: session }: any = useSession();

	const router = useRouter();

	const [isSignupOn, toggleSignupModal] = useModalToggler();
	const [isLoginOn, toggleLoginModal] = useModalToggler();

	const [isVideoModalOn, toggleVideoModal] = useModalToggler();
	const [isEditUrlModalOn, toggleEditVideoModal] = useModalToggler();

	const emptyVideo: any = {
		id: "",
		[videoPropNamesEnum.introductoryVideo]: "",
	};

	const [videos, setVideos] = useState<IVideos>(emptyVideo);

	const { data, isLoading } = useQuery<IVideos>({
		queryKey: [clientApi.Keys.all],
		queryFn: clientApi.getOne,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (data) {
			setVideos({
				id: data.id,
				[videoPropNamesEnum.introductoryVideo]: objectPath.get(
					data,
					videoPropNamesEnum.introductoryVideo
				),
			} as any);
		}
	}, [data]);

	return (
		<>
			<div className='flex flex-col items-center bg-dark-50 h-screen'>
				<div className='w-[93.45vw] h-screen m-auto pb-10 flex bg-white rounded-3xl'>
					<div className='xl:w-[50%] px-10 py-10 flex items-center'>
						<div className='w-[75%] max-w-[1000px] mx-auto flex flex-col gap-[4rem]'>
							<Image
								src='/CIP-Logo-Grey.svg'
								width={120}
								height={70}
								alt='CIP Logo'
							/>
							<div className='flex flex-col gap-8'>
								<h1 className='text-[4rem] text-onyx font-hero-medium leading-[5.75rem]'>
									2-20x Your Growth
								</h1>
								<h4 className='text-dark-300 text-3xl leading-[2.9rem]'>
									<div>
										The key to 20x growth:
									</div>
									<div>
										Exponential Blue Ocean Shift Strategy
									</div>
								</h4>
								<h4 className='text-dark-300 text-3xl leading-[2.9rem] p-0 m-0'>
								</h4>
								{isLoading && (
									<Spinner
										message='loading introductory video...'
										className='items-center text-dark-400'
									/>
								)}
								{!isLoading &&
									!!videos[videoPropNamesEnum.introductoryVideo] && (
										<div className='w-[90%] p-3 flex gap-9 items-center rounded-full bg-dark'>
											<div className='w-[7rem] rounded-full overflow-hidden'>
												<div className='w-[13rem] h-[6.5rem]'>
													<Image
														src='/video-image.jpeg'
														alt='Introductory Video'
														width='300'
														height='300'
														quality={100}
														className='w-[13rem] h-[13rem] translate-x-[-3rem]'
													/>
												</div>
											</div>
											<p className='grow text-white'>
												Watch Introductory Video
											</p>
											<div
												onClick={() => {
													toggleVideoModal(true);
												}}
												className='cursor-pointer hover:scale-[110%] transition duration-100 pr-5'>
												<FontAwesomeIcon
													className='w-[4rem] h-auto text-dark bg-white rounded-full p-[1.3px]'
													icon={faCirclePlay}
												/>
											</div>
										</div>
									)}
								<div className='flex justify-between items-center gap-5 w-[90%]'>
									<Image
										src='/ebose-intro.png'
										width='160'
										height='120'
										quality={100}
										alt='EBOS intro pdf review image'
										className='border border-primary-200 rounded-lg'
									/>
									<Link
										href='/api/download-pdf'
										target='_blank'
										download
										className='flex justify-end'>
										<span className='text-primary italic font-hero-semibold hover:underline'>
											Download EBOS introduction PDF
										</span>
									</Link>
								</div>
								{!isLoading &&
									!videos[videoPropNamesEnum.introductoryVideo] && (
										<div
											onClick={() => {
												toggleEditVideoModal(true);
											}}
											className='w-[90%] pl-10 pr-5 py-5 flex gap-10 items-center rounded-full bg-primary-400  cursor-pointer hover:shadow-lg transition duration-200'>
											<p className='grow text-white'>
												Add Introductory Video
											</p>
											<FontAwesomeIcon
												className='w-7 text-white'
												icon={faEdit}
											/>
										</div>
									)}
								{!!session?.user?.id && (
									<div className='w-[90%] gap-7 flex justify-end'>
										{!!videos[
											videoPropNamesEnum.introductoryVideo
										] && (
												<div
													onClick={() => {
														toggleEditVideoModal(true);
													}}
													className='w-[55%] pl-10 pr-5 py-[0.8rem] flex gap-10 items-center rounded-full bg-primary-400  cursor-pointer hover:shadow-lg transition duration-200'>
													<p className='grow text-white'>
														Edit Video
													</p>
													<FontAwesomeIcon
														className='w-6 text-white'
														icon={faEdit}
													/>
												</div>
											)}
										<div
											onClick={() => {
												router.push("org/goals");
											}}
											className='w-[55%] pl-10 pr-5 py-[0.8rem] flex gap-10 items-center rounded-full bg-primary-400  cursor-pointer hover:shadow-lg transition duration-200'>
											<p className='grow text-white text-2xl'>
												Start
											</p>
											<div className='p-2 bg-primary-400 rounded-full border border-gray-200'>
												<FontAwesomeIcon
													className='w-[1rem] h-[1rem] text-gray-200 rounded-full'
													icon={faAngleRight}
												/>
											</div>
										</div>
									</div>
								)}
								{!session?.user?.id && (
									<div className='w-[90%] gap-7 flex justify-between'>
										<div
											onClick={() => toggleSignupModal()}
											className='w-[55%] pl-10 pr-5 py-[0.8rem] flex gap-10 items-center rounded-full bg-primary-400 cursor-pointer hover:shadow-lg transition duration-200'>
											<p className='grow text-white'>Register</p>
											<div className='p-2 bg-primary-400 rounded-full border border-gray-200'>
												<FontAwesomeIcon
													className='w-[1rem] h-[1rem] text-gray-200 rounded-full'
													icon={faAngleRight}
												/>
											</div>
										</div>
										<div
											onClick={() => toggleLoginModal()}
											className='w-[45%] pl-10 pr-5 py-[0.8rem] flex gap-10 items-center rounded-full bg-primary-400 cursor-pointer hover:shadow-lg transition duration-200'>
											<p className='grow text-white'>Log In</p>
											<div className='p-2 bg-primary-400 rounded-full border border-gray-200'>
												<FontAwesomeIcon
													className='w-[1rem] h-[1rem] text-gray-200 rounded-full'
													icon={faAngleRight}
												/>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className='hidden xl:block w-[50%] bg-[url("/Bars.svg")] bg-no-repeat bg-cover'></div>
				</div>
			</div>

			{/* login modal */}
			<Modal
				config={{
					isShown: isLoginOn,
					closeCallback: () => toggleLoginModal(false),
					className: "w-full min-w-[320px] max-w-[500px] p-5",
				}}>
				<Login
					closeCallback={() => {
						toggleLoginModal(false);
					}}
				/>
			</Modal>

			{/* signup modal */}
			<Modal
				config={{
					isShown: isSignupOn,
					closeCallback: () => toggleSignupModal(false),
					className: "w-full min-w-[320px] max-w-[700px]",
				}}>
				<Signup closeCallback={() => toggleSignupModal(false)} />
			</Modal>

			{/* video modal */}
			<Modal
				config={{
					isShown: isVideoModalOn,
					closeCallback: () => toggleVideoModal(false),
					className:
						"flex flex-col w-[90%] lg:w-2/3 max-w-[1320px] h-[90%] max-h-[600px] rounded-xl overflow-hidden",
				}}>
				<Video videoPropName={videoPropNamesEnum.introductoryVideo} />
				<div className='flex justify-center p-5 bg-black'>
					<button
						className='btn-diff bg-gray-100 hover:bg-gray-300 text-dark-400'
						onClick={() => toggleVideoModal(false)}>
						close
					</button>
				</div>
			</Modal>

			{/* video url form modal */}
			<Modal
				config={{
					isShown: isEditUrlModalOn,
					closeCallback: () => toggleEditVideoModal(false),
					className:
						"flex flex-col gap-5 lg:w-1/3 max-w-[1320px] rounded-xl overflow-hidden p-5",
				}}>
				<SharedVideoForm
					toggleEditVideoModal={() => toggleEditVideoModal(false)}
					videoPropName={videoPropNamesEnum.introductoryVideo}
					videoLabel='Introductory Video'
				/>
			</Modal>
		</>
	);
}
