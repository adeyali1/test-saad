import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { NextPage } from "next";
import { object, string } from "yup";
import { IVideos } from "../../models/videos";
import * as clientApi from "../../http-client/videos.client";

interface Props {
	toggleEditUrlsModal: () => void;
	videos: any;
}

const VideosForm: NextPage<Props> = ({ videos, toggleEditUrlsModal }) => {
	const queryClient = useQueryClient();

	const { mutate: updateVideos, isLoading: isUpdatingVideos } = useMutation(
		(videos: IVideos) => {
			return clientApi.updateOne(videos);
		},
		{
			onMutate: (updated) => {
				queryClient.setQueryData([clientApi.Keys.all], updated);
			},
			onSuccess: (updated) => {
				queryClient.invalidateQueries([clientApi.Keys.all]);
				toggleEditUrlsModal();
			},
		}
	);

	const { mutate: createVideos, isLoading: isCreatingVideos } = useMutation(
		(videos: IVideos) => clientApi.insertOne(videos),
		{
			onMutate: (updated) => {
				queryClient.setQueryData([clientApi.Keys.all], updated);
			},
			onSuccess: (updated) => {
				queryClient.invalidateQueries([clientApi.Keys.all]);
				toggleEditUrlsModal();
			},
		}
	);

	const formik = useFormik({
		initialValues: videos,
		validationSchema: object({
			staffOnDemand: string().required("required"),
			communityAndCrowd: string().required("required"),
			algorithms: string().required("required"),
			leveragedAssets: string().required("required"),
			Engagement: string().required("required"),
			interface: string().required("required"),
			dashboard: string().required("required"),
			experimentation: string().required("required"),
			socialPlatforms: string().required("required"),
			ecoSystems: string().required("required"),
			autonomy: string().required("required"),
			infoIsPower: string().required("required"),
			OTCR: string().required("required"),
			valueDestruction: string().required("required"),
			customerJourney: string().required("required"),
			digitalPlatforms: string().required("required"),
			buildingCapacity: string().required("required"),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			values.goalsVideo =
				videos.goalsVideo ?? "https://www.youtube.com/embed/n3S1pojOENo";
			if (!values.id) {
				await createVideos(values);
			} else {
				await updateVideos(values);
			}
			setSubmitting(false);
		},
	});
	return (
		<>
			<h1 className='text-3xl text-gray-800 mb-5 font-hero-semibold'>
				Edit Video Urls
			</h1>
			<form className='grow overflow-auto pt-10 flex gap-5 flex-wrap'>
				<ul className='grow flex flex-col gap-3 mb-5'>
					<h2 className='mb-2 text-3xl text-dark-400 font-hero-semibold'>
						Scale
					</h2>
					<li className='flex gap-2 flex-col p-3 relative text-gray-800 text-lg'>
						<label>Staff on Demand</label>
						<input
							type='text'
							className='light-input'
							required
							{...formik.getFieldProps("staffOnDemand")}
						/>
						{formik.touched.staffOnDemand &&
						formik.errors.staffOnDemand ? (
							<div className='text-rose-400 text-lg'>
								<>{formik.errors.staffOnDemand}</>
							</div>
						) : null}
					</li>
					<li className='flex gap-2 flex-col p-3 relative text-gray-800 text-lg'>
						<label>Community and Crowd</label>
						<input
							type='text'
							className='light-input'
							required
							{...formik.getFieldProps("communityAndCrowd")}
						/>
						{formik.touched.communityAndCrowd &&
						formik.errors.communityAndCrowd ? (
							<div className='text-rose-400 text-lg'>
								<>{formik.errors.communityAndCrowd}</>
							</div>
						) : null}
					</li>
					<li className='flex gap-2 flex-col p-3 relative text-gray-800 text-lg'>
						<label>Algorithms</label>
						<input
							type='text'
							className='light-input'
							required
							{...formik.getFieldProps("algorithms")}
						/>
						{formik.touched.algorithms && formik.errors.algorithms ? (
							<div className='text-rose-400 text-lg'>
								<>{formik.errors.algorithms}</>
							</div>
						) : null}
					</li>
					<li className='flex gap-2 flex-col p-3 relative text-gray-800 text-lg'>
						<label>Leveraged Assets</label>
						<input
							type='text'
							className='light-input'
							required
							{...formik.getFieldProps("leveragedAssets")}
						/>
						{formik.touched.leveragedAssets &&
						formik.errors.leveragedAssets ? (
							<div className='text-rose-400 text-lg'>
								<>{formik.errors.leveragedAssets}</>
							</div>
						) : null}
					</li>
					<li className='flex gap-2 flex-col p-3 relative text-gray-800 text-lg'>
						<label>Engagement</label>
						<input
							type='text'
							className='light-input'
							required
							{...formik.getFieldProps("Engagement")}
						/>
						{formik.touched.Engagement && formik.errors.Engagement ? (
							<div className='text-rose-400 text-lg'>
								<>{formik.errors.Engagement}</>
							</div>
						) : null}
					</li>
				</ul>
				<ul className='grow flex flex-col gap-3 mb-5'>
					<h2 className='mb-2 text-3xl text-dark-400 font-hero-semibold'>
						Ideas
					</h2>
					<li className='flex gap-2 flex-col p-3 relative text-gray-800 text-lg'>
						<label>Interface</label>
						<input
							type='text'
							className='light-input'
							required
							{...formik.getFieldProps("interface")}
						/>
						{formik.touched.interface && formik.errors.interface ? (
							<div className='text-rose-400 text-lg'>
								<>{formik.errors.interface}</>
							</div>
						) : null}
					</li>
					<li className='flex gap-2 flex-col p-3 relative text-gray-800 text-lg'>
						<label>Dashboard</label>
						<input
							type='text'
							className='light-input'
							required
							{...formik.getFieldProps("dashboard")}
						/>
						{formik.touched.dashboard && formik.errors.dashboard ? (
							<div className='text-rose-400 text-lg'>
								<>{formik.errors.dashboard}</>
							</div>
						) : null}
					</li>
					<li className='flex gap-2 flex-col p-3 relative text-gray-800 text-lg'>
						<label>Experimentation</label>
						<input
							type='text'
							className='light-input'
							required
							{...formik.getFieldProps("experimentation")}
						/>
						{formik.touched.experimentation &&
						formik.errors.experimentation ? (
							<div className='text-rose-400 text-lg'>
								<>{formik.errors.experimentation}</>
							</div>
						) : null}
					</li>
					<li className='flex gap-2 flex-col p-3 relative text-gray-800 text-lg'>
						<label>Autonomy</label>
						<input
							type='text'
							className='light-input'
							required
							{...formik.getFieldProps("autonomy")}
						/>
						{formik.touched.autonomy && formik.errors.autonomy ? (
							<div className='text-rose-400 text-lg'>
								<>{formik.errors.autonomy}</>
							</div>
						) : null}
					</li>
					<li className='flex gap-2 flex-col p-3 relative text-gray-800 text-lg'>
						<label>Social Platforms</label>
						<input
							type='text'
							className='light-input'
							required
							{...formik.getFieldProps("socialPlatforms")}
						/>
						{formik.touched.socialPlatforms &&
						formik.errors.socialPlatforms ? (
							<div className='text-rose-400 text-lg'>
								<>{formik.errors.socialPlatforms}</>
							</div>
						) : null}
					</li>
				</ul>
				<ul className='grow flex flex-col gap-3 mb-5'>
					<h2 className='mb-2 text-[1.75rem] text-dark-400 font-hero-semibold'>
						7 Practical & Quick
					</h2>
					<li className='flex gap-2 flex-col p-3 relative text-gray-800 text-lg'>
						<label>Eco Systems</label>
						<input
							type='text'
							className='light-input'
							required
							{...formik.getFieldProps("ecoSystems")}
						/>
						{formik.touched.ecoSystems && formik.errors.ecoSystems ? (
							<div className='text-rose-400 text-lg'>
								<>{formik.errors.ecoSystems}</>
							</div>
						) : null}
					</li>
					<li className='flex gap-2 flex-col p-3 relative text-gray-800 text-lg'>
						<label>Info is Power</label>
						<input
							type='text'
							className='light-input'
							required
							{...formik.getFieldProps("infoIsPower")}
						/>
						{formik.touched.infoIsPower && formik.errors.infoIsPower ? (
							<div className='text-rose-400 text-lg'>
								<>{formik.errors.infoIsPower}</>
							</div>
						) : null}
					</li>
					<li className='flex gap-2 flex-col p-3 relative text-gray-800 text-lg'>
						<label>OTCR</label>
						<input
							type='text'
							className='light-input'
							required
							{...formik.getFieldProps("OTCR")}
						/>
						{formik.touched.OTCR && formik.errors.OTCR ? (
							<div className='text-rose-400 text-lg'>
								<>{formik.errors.OTCR}</>
							</div>
						) : null}
					</li>
					<li className='flex gap-2 flex-col p-3 relative text-gray-800 text-lg'>
						<label>Value Destruction</label>
						<input
							type='text'
							className='light-input'
							required
							{...formik.getFieldProps("valueDestruction")}
						/>
						{formik.touched.valueDestruction &&
						formik.errors.valueDestruction ? (
							<div className='text-rose-400 text-lg'>
								<>{formik.errors.valueDestruction}</>
							</div>
						) : null}
					</li>
					<li className='flex gap-2 flex-col p-3 relative text-gray-800 text-lg'>
						<label>Customer Journey</label>
						<input
							type='text'
							className='light-input'
							required
							{...formik.getFieldProps("customerJourney")}
						/>
						{formik.touched.customerJourney &&
						formik.errors.customerJourney ? (
							<div className='text-rose-400 text-lg'>
								<>{formik.errors.customerJourney}</>
							</div>
						) : null}
					</li>
					<li className='flex gap-2 flex-col p-3 relative text-gray-800 text-lg'>
						<label>Digital Platforms</label>
						<input
							type='text'
							className='light-input'
							required
							{...formik.getFieldProps("digitalPlatforms")}
						/>
						{formik.touched.digitalPlatforms &&
						formik.errors.digitalPlatforms ? (
							<div className='text-rose-400 text-lg'>
								<>{formik.errors.digitalPlatforms}</>
							</div>
						) : null}
					</li>
					<li className='flex gap-2 flex-col p-3 relative text-gray-800 text-lg'>
						<label>Building Capacity</label>
						<input
							type='text'
							className='light-input'
							required
							{...formik.getFieldProps("buildingCapacity")}
						/>
						{formik.touched.buildingCapacity &&
						formik.errors.buildingCapacity ? (
							<div className='text-rose-400 text-lg'>
								<>{formik.errors.buildingCapacity}</>
							</div>
						) : null}
					</li>
				</ul>
			</form>
			<div className='flex justify-end gap-3 pt-5'>
				<button
					className='btn-diff bg-gray-100 hover:bg-gray-300 text-dark-400'
					onClick={toggleEditUrlsModal}>
					close
				</button>
				<button
					type='button'
					onClick={() => {
						formik.handleSubmit();
					}}
					className={
						formik.isSubmitting || !formik.isValid
							? "btn-rev btn-disabled"
							: "btn-rev"
					}
					disabled={formik.isSubmitting || !formik.isValid}>
					Save
				</button>
			</div>
		</>
	);
};

export default VideosForm;
