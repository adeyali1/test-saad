import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { object, string } from "yup";
import { IVideos } from "../../models/videos";
import * as clientApi from "../../http-client/videos.client";
import { useEffect, useState } from "react";
import { videoPropNamesEnum } from "../../models/enums";
import objectPath from "object-path";
import Spinner from "../common/spinner";

interface Props {
	toggleEditVideoModal: () => void;
	videoPropName: videoPropNamesEnum;
	videoLabel: string;
}

const SharedVideoForm = ({
	toggleEditVideoModal,
	videoPropName,
	videoLabel,
}: Props) => {
	const emptyVideo: any = {
		id: "",
		[videoPropName]: "",
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
				[videoPropName]: objectPath.get(data, videoPropName) ?? "",
			} as any);
		}
	}, [data]);

	const queryClient = useQueryClient();

	const { mutate: updateVideoUrl } = useMutation(
		(videos: IVideos) => {
			return clientApi.updateOne(videos);
		},
		{
			onMutate: (updated) => {
				queryClient.setQueryData([clientApi.Keys.all], updated);
			},
			onSuccess: (updated) => {
				queryClient.invalidateQueries([clientApi.Keys.all]);
				toggleEditVideoModal();
			},
		}
	);

	const formik = useFormik({
		initialValues: { ...videos } as IVideos,
		validationSchema: object({
			id: string().required("required"),
			[videoPropName]: string().required("required"),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			await updateVideoUrl(values);
			setSubmitting(false);
		},
		enableReinitialize: true,
	});

	return (
		<div className='flex flex-col gap-10'>
			<p className='text-4xl text-gray-800 font-hero-semibold'>
				{!!videos[videoPropName] ? "Edit Video Url" : "Add Video Url"}
			</p>
			{isLoading && (
				<Spinner message='Loading...' className='items-center' />
			)}
			<form className='flex gap-5 flex-col'>
				<div className='flex flex-col'>
					<label>{videoLabel}</label>
					<input
						type='text'
						className='light-input'
						{...formik.getFieldProps(videoPropName)}
					/>
					{objectPath.get(formik, `touched?.${videoPropName}`) &&
						objectPath.get(formik, `errors?.${videoPropName}`) && (
							<div className='text-rose-400 text-lg'>
								<>{objectPath.get(formik, `errors.${videoPropName}`)}</>
							</div>
						)}
				</div>
			</form>
			<div className='flex justify-end gap-3 pt-5'>
				<button
					className='btn-diff bg-gray-100 hover:bg-gray-300 text-dark-400'
					onClick={() => toggleEditVideoModal()}>
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
		</div>
	);
};

export default SharedVideoForm;
