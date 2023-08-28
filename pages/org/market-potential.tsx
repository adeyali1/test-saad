import IdeasModal from "../../components/app/ideas-modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";
import Modal from "../../components/common/modal";
import SharedVideoForm from "../../components/disruption/shared-video-form";
import Video from "../../components/disruption/video";
import ActionsNavbar from "../../components/common/actions-navbar";
import StepsNavbar from "../../components/common/steps-navbar";
import MarketPotentialContent from "../../components/market-potential/content";
import * as _ from "lodash";
import MarketPotentialProductChart from "../../components/market-potential/product-chart";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as clientApi from "../../http-client/products.client";
import { IUserProduct } from "../../models/user-product";
import { useSession } from "next-auth/react";
import Spinner from "../../components/common/spinner";
import { ICompetitor, IProduct } from "../../models/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const Competitors = () => {
	const { data: session }: any = useSession();

	const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
	const [isEditUrlsModalOn, toggleEditVideoModal] = useModalToggler();
	const [isVideoModalOn, toggleVideoModal] = useModalToggler();

	const emptyCompetitor = () => {
		const uuid = crypto.randomUUID();
		return {
			uuid: uuid,
			name: "",
			marketShare: 0,
		} as ICompetitor;
	};

	const emptyUserProduct = {
		id: "",
		userId: session?.user?.id,
		products: [],
	} as IUserProduct;

	const [userProduct, setUserProduct] =
		useState<IUserProduct>(emptyUserProduct);

	const [chartProducts, setChartProducts] = useState<IProduct[]>([]);

	const { data, isLoading } = useQuery<IUserProduct>({
		queryKey: [clientApi.Keys.All],
		queryFn: clientApi.getAll,
		refetchOnWindowFocus: false,
		enabled: !!session?.user?.id,
	});

	useEffect(() => {
		data?.products?.forEach((prod) => {
			if (
				!prod.competitors ||
				(prod.competitors && prod.competitors.length === 0)
			) {
				prod.competitors = [
					{ ...emptyCompetitor(), name: "Me" },
					{ ...emptyCompetitor(), name: "", isUntapped: true },
					{ ...emptyCompetitor(), name: "" },
				];
			}
		});
		if (data) {
			setUserProduct(data);
		}
		setChartProducts(data?.products || []);
	}, [data]);

	return (
		<>
			<div className='bg-gray-100 pt-9'>
				<div className='flex gap-[4.4rem] px-16 m-auto'>
					<div className='py-12'>
						<ActionsNavbar
							selectedStepTitle={stepNamesEnum.marketPotential}
						/>
					</div>
					<div className='grow max-w-[1920px] flex flex-col py-12 mx-auto'>
						<StepsNavbar selectedNode={stepNamesEnum.marketPotential} />
						<div className='content-container'>
							<div className='left-content'>
								<MarketPotentialContent
									userProduct={userProduct}
									dispatchChartProducts={setChartProducts}
									isLoading={isLoading}
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
								<div className='p-1 bg-white rounded-xl'>
									<button
										type='button'
										onClick={() => {
											toggleVideoModal(true);
										}}
										className='w-full btn-primary-light rounded-xl'>
										Watch Video Tutorial
									</button>
								</div>
								{session?.user?.role === "admin" && (
									<div className='p-1 bg-white rounded-xl'>
										<button
											type='button'
											onClick={() => toggleEditVideoModal(true)}
											className='w-full btn-primary-light rounded-xl'>
											<span>Edit video Url</span>
											<FontAwesomeIcon
												className='w-7'
												icon={faEdit}
											/>
										</button>
									</div>
								)}
								{isLoading && (
									<Spinner
										message='Loading product competitors charts...'
										className='p-5 items-center text-xl'
									/>
								)}
								{!isLoading &&
									!!chartProducts?.length &&
									chartProducts.map((product, index) => (
										<div key={index} className='h-[300px]'>
											<MarketPotentialProductChart
												product={product}
											/>
										</div>
									))}
							</div>
						</div>

						{/* <div className='w-1/2'>
							<div className='flex flex-wrap justify-start items-center gap-4 pl-10 py-5 mx-auto'>
								<ConsultantReview
									pageTitle={"Market potential"}></ConsultantReview>
								{(session?.user as any)?.role === "admin" && (
									<button
										className='p-3 rounded inline-flex gap-5 items-center btn text-black-eerie hover:text-blue-ncs w-max'
										onClick={() => toggleEditVideoModal(true)}>
										<span>Edit video Url</span>
										<FontAwesomeIcon className='w-7' icon={faEdit} />
									</button>
								)}
								<button
									className='p-3 rounded inline-flex gap-5 items-center btn text-black-eerie hover:text-blue-ncs w-max'
									onClick={() => toggleVideoModal(true)}>
									<span>Watch Video Tutorial</span>
									<FontAwesomeIcon className='w-7' icon={faEye} />
								</button>
							</div>
						</div> */}
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
				<Video videoPropName={videoPropNamesEnum.marketPotential} />
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
					isShown: isEditUrlsModalOn,
					closeCallback: () => toggleEditVideoModal(false),
					className:
						"flex flex-col lg:w-1/3 max-w-[1320px] rounded-xl overflow-hidden p-5 lg:p-10",
				}}>
				<SharedVideoForm
					toggleEditVideoModal={() => toggleEditVideoModal(false)}
					videoPropName={videoPropNamesEnum.marketPotential}
					videoLabel='Market Potential Video'
				/>
			</Modal>
		</>
	);
};

export default Competitors;
