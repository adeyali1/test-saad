import IdeasModal from "../../components/app/ideas-modal";
import Modal from "../../components/common/modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import { useMemo, useState } from "react";
import VideosForm from "../../components/disruption/videos-form";
import Video from "../../components/disruption/video";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";
import ActionsNavbar from "../../components/common/actions-navbar";
import StepsNavbar from "../../components/common/steps-navbar";
import DisruptionContent from "../../components/disruption/content";
import { IVideos } from "../../models/videos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";

const Disruption = () => {
	const emptyVideos: IVideos = useMemo(() => {
		return {
			id: "",
			staffOnDemand: "",
			communityAndCrowd: "",
			algorithms: "",
			leveragedAssets: "",
			Engagement: "",
			interface: "",
			dashboard: "",
			experimentation: "",
			socialPlatforms: "",
			ecoSystems: "",
			autonomy: "",
			infoIsPower: "",
			OTCR: "",
			valueDestruction: "",
			customerJourney: "",
			digitalPlatforms: "",
			buildingCapacity: "",
		} as IVideos;
	}, []);

	const [selectedVideoPropName, setSelectedVideoPropName] =
		useState<videoPropNamesEnum>(videoPropNamesEnum.goalsVideo);
	const [videos, setVideos] = useState<IVideos>(emptyVideos);
	const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
	const [isVideoModalOn, toggleVideoModal] = useModalToggler();
	const [isEditUrlsModalOn, toggleEditUrlsModal] = useModalToggler();

	return (
		<>
			<div className='bg-gray-100 pt-9'>
				<div className='flex gap-[4.4rem] px-16 m-auto'>
					<div className='py-12'>
						<ActionsNavbar
							selectedStepTitle={stepNamesEnum.disruption}
						/>
					</div>
					<div className='grow max-w-[1920px] flex flex-col py-12 mx-auto'>
						<StepsNavbar selectedNode={stepNamesEnum.disruption} />
						<div className='content-container'>
							<div className='left-content'>
								<DisruptionContent
									videos={videos}
									dispatchVideos={setVideos}
									setSelectedVideoPropName={setSelectedVideoPropName}
									toggleEditUrlsModal={toggleEditUrlsModal}
									toggleVideoModal={toggleVideoModal}
								/>
							</div>
							<div className='right-content'>
								<div className='p-1 bg-white rounded-xl'>
									<button
										type='button'
										onClick={() => {
											toggleIdeasModal(true);
										}}
										className='w-full btn-primary-light rounded-xl'>
										My Ideas
									</button>
								</div>
								<div className='px-10 py-5'>
									<h4 className='mb-3 text-[1.75rem] text-dark-400 font-hero-bold'>
										7 Practical &amp; Quick
									</h4>
									<ul className='flex flex-col gap-3 mb-5'>
										<li className='pill-primary-300 text-xl'>
											Eco Systems
											<div
												className='cursor-pointer hover:scale-[115%] transition duration-100'
												onClick={() => {
													setSelectedVideoPropName(
														videoPropNamesEnum.ecoSystems
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
											Info is Power
											<div
												className='cursor-pointer hover:scale-[115%] transition duration-100'
												onClick={() => {
													setSelectedVideoPropName(
														videoPropNamesEnum.infoIsPower
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
											OTCR
											<div
												className='cursor-pointer hover:scale-[115%] transition duration-100'
												onClick={() => {
													setSelectedVideoPropName(
														videoPropNamesEnum.OTCR
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
											Value Destruction
											<div
												className='cursor-pointer hover:scale-[115%] transition duration-100'
												onClick={() => {
													setSelectedVideoPropName(
														videoPropNamesEnum.valueDestruction
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
											Customer Journey
											<div
												className='cursor-pointer hover:scale-[115%] transition duration-100'
												onClick={() => {
													setSelectedVideoPropName(
														videoPropNamesEnum.customerJourney
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
											Digital Platforms
											<div
												className='cursor-pointer hover:scale-[115%] transition duration-100'
												onClick={() => {
													setSelectedVideoPropName(
														videoPropNamesEnum.digitalPlatforms
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
											Building Capacity
											<div
												className='cursor-pointer hover:scale-[115%] transition duration-100'
												onClick={() => {
													setSelectedVideoPropName(
														videoPropNamesEnum.buildingCapacity
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
						</div>
					</div>
				</div>
			</div>

			{/* ideas modal */}
			<IdeasModal
				isOpen={isIdeasModalOpen}
				toggle={() => toggleIdeasModal()}
			/>

			{/* video modal */}
			<Modal
				config={{
					isShown: isVideoModalOn,
					closeCallback: () => toggleVideoModal(false),
					className:
						"flex flex-col w-[90%] lg:w-2/3 max-w-[1320px] h-[90%] max-h-[600px] rounded-xl overflow-hidden ",
				}}>
				<Video videoPropName={selectedVideoPropName} />
				<div className='flex justify-center p-5 bg-black'>
					<button
						className='btn-diff bg-gray-100 hover:bg-gray-300 text-dark-400'
						onClick={() => toggleVideoModal(false)}>
						close
					</button>
				</div>
			</Modal>

			{/* video urls form modal */}
			<Modal
				config={{
					isShown: isEditUrlsModalOn,
					closeCallback: () => toggleEditUrlsModal(false),
					className:
						"flex flex-col w-[90%] lg:w-2/3 max-w-[1320px] h-[90%] max-h-[750px] rounded-xl overflow-hidden p-5 lg:p-10",
				}}>
				<VideosForm
					videos={videos}
					toggleEditUrlsModal={() => toggleEditUrlsModal(false)}
				/>
			</Modal>
		</>
	);
};

export default Disruption;
