import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import objectPath from "object-path";
import { useEffect, useState } from "react";
import { IVideos } from "../../models/videos";
import * as clientApi from "../../http-client/videos.client";
import Spinner from "../common/spinner";

interface Props {
	videoPropName: string;
}

const Video: NextPage<Props> = ({ videoPropName }) => {
	const [videos, setVideos] = useState<IVideos>();

	const { data, isLoading } = useQuery<IVideos>({
		queryKey: [clientApi.Keys.all],
		queryFn: clientApi.getOne,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (data) {
			setVideos({
				id: data.id,
				[videoPropName]: objectPath.get(data, videoPropName),
			} as any);
		}
	}, [data]);

	if (isLoading) {
		return (
			<div className='h-full flex justify-center items-center'>
				<Spinner className='' message='Loading video' />
			</div>
		);
	}

	if (!videos?.id || !objectPath.get(videos ?? {}, videoPropName)) {
		return (
			<div className='h-full flex justify-center items-center'>
				<p className='italic text-3xl'>Add a video link !</p>
			</div>
		);
	}

	return (
		<>
			<iframe
				className='w-full grow'
				src={objectPath.get(videos ?? {}, videoPropName) ?? ""}
				title='YouTube video player'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
				allowFullScreen></iframe>
		</>
	);
};

export default Video;
