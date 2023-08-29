import IdeasModal from "../../components/app/ideas-modal";
import useModalToggler from "../../hooks/use-modal-toggler";
import { useState } from "react";
import { stepNamesEnum, videoPropNamesEnum } from "../../models/enums";
import Modal from "../../components/common/modal";
import SharedVideoForm from "../../components/disruption/shared-video-form";
import Video from "../../components/disruption/video";
import ActionsNavbar from "../../components/common/actions-navbar";
import StepsNavbar from "../../components/common/steps-navbar";
import RedOceanContent from "../../components/red-ocean/content";
import RedOceanProductChart from "../../components/red-ocean/product-chart";
import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { IUserProduct } from "../../models/user-product";
import * as clientApi from "../../http-client/products.client";
import { IFactor, IProduct } from "../../models/types";
import Spinner from "../../components/common/spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const RedOceanCanvas = () => {
	const { data: session }: any = useSession();

	const [isIdeasModalOpen, toggleIdeasModal] = useModalToggler();
	const [isEditUrlsModalOn, toggleEditVideoModal] = useModalToggler();
	const [isVideoModalOn, toggleVideoModal] = useModalToggler();

	const emptyFactor = useMemo(() => {
		return {
			name: "",
			competitors: [],
		} as IFactor;
	}, []);

	const emptyUserProduct = useMemo(() => {
		return {
			id: "",
			userId: session?.user?.id,
			products: [],
		} as IUserProduct;
	}, [session?.user?.id]);

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
			emptyFactor.competitors =
				prod.competitors?.map((comp) => {
					return {
						uuid: comp.uuid,
						value: 1,
					};
				}) ?? [];
			if (!prod.factors?.length) {
				prod.factors = [
					{ ...emptyFactor, name: "" },
					{ ...emptyFactor, name: "" },
					{ ...emptyFactor, name: "" },
				];
			} else {
				prod.factors.forEach((factor) => {
					const existingCompetitorUuids = new Set(
						factor.competitors.map((c) => c.uuid)
					);

					const newfactorCompetitors = prod.competitors
						?.filter((comp) => !existingCompetitorUuids.has(comp.uuid))
						.map((comp) => {
							return {
								uuid: comp.uuid,
								value: 1,
							};
						});

					if (newfactorCompetitors?.length) {
						// Add competitors that exist in prod.competitors but not in factor.competitors
						factor.competitors =
							factor.competitors.concat(newfactorCompetitors);
					}

					// Remove competitors that exist in factor.competitors but not in prod.competitors
					factor.competitors = factor.competitors.filter((comp) =>
						prod.competitors?.some((c) => c.uuid === comp.uuid)
					);
				});
			}
		});
		if (data) {
			setUserProduct(data);
		}
		setUserProduct(data ?? emptyUserProduct);
	}, [data, emptyFactor, emptyUserProduct]);

	console.log("userProduct", userProduct);

	return (
		<>
			<div className='bg-gray-100 pt-9'>
				<div className='flex gap-[4.4rem] px-16 m-auto'>
					<div className='py-12'>
						<ActionsNavbar
							selectedStepTitle={stepNamesEnum.redOceanCanvas}
						/>
					</div>
					<div className='grow max-w-[1920px] flex flex-col py-12 mx-auto'>
						<StepsNavbar selectedNode={stepNamesEnum.redOceanCanvas} />
						<div className='content-container'>
							<div className='left-content max-w-[1220px]'>
								<RedOceanContent
									userProduct={userProduct}
									dispatchChartProducts={(products) => {
										setChartProducts(products);
									}}
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
										message='Loading red ocean charts...'
										className='p-5 items-center text-xl'
									/>
								)}
								{!isLoading &&
									!!chartProducts?.length &&
									chartProducts.map((product, index) => (
										<div key={index} className='h-[300px] mb-7'>
											<RedOceanProductChart product={product} />
										</div>
									))}
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
				<Video videoPropName={videoPropNamesEnum.redOcean} />
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
					videoPropName={videoPropNamesEnum.redOcean}
					videoLabel='Red Ocean Video'
				/>
			</Modal>
		</>
	);
};

export default RedOceanCanvas;
