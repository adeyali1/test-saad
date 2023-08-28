import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { takeawayTypeEnums } from "../../../models/enums";
import { IUserTakeaways } from "../../../models/user-takeaways";
import { useSession } from "next-auth/react";
import * as api from "../../../http-client/takeaways.client";
import DisruptionReportTakeaways from "./takeaways";
import Spinner from "../../common/spinner";

const DisruptionReport = () => {
	const { data: session }: any = useSession();

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

	const { data: userTakeawaysRes, isLoading } = useQuery<IUserTakeaways>(
		[api.Keys.all, userTakeaways.id],
		api.getOne,
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
	return (
		<div className='flex flex-col gap-5'>
			<div>
				<h2 className='report-header-4 font-hero-bold'>Disruption</h2>
			</div>
			<div className='flex gap-5'>
				{isLoading && (
					<Spinner
						message='loading takeaways...'
						className='items-center'
					/>
				)}
			</div>
			<DisruptionReportTakeaways
				userTakeaways={userTakeaways}
				isLoading={isLoading}
				className='flex flex-col gap-10 xl:flex-nowrap w-full'
			/>
		</div>
	);
};

export default DisruptionReport;
