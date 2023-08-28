import objectPath from "object-path";
import { NextPage } from "next";
import { ErrorMessage, Field, FieldArray } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";
import ConfirmModal from "../common/confirm-dialog";
import { ConfirmDialog, IFuture, IProduct } from "../../models/types";

interface Props {
	product: IProduct;
	index: number;
	onRemove: any;
}

const Product: NextPage<Props> = ({ product, index, onRemove }) => {
	const [confirmDialogConfig, setConfirmDialogConfig] =
		useState<ConfirmDialog>({
			isShown: false,
			title: "Delete Product",
			message: "Are you sure to delete this product ?",
			actionBtnText: "Delete",
			cancelBtnText: "Cancel",
			actionCallback: () => {},
			cancelCallback: () => {
				setConfirmDialogConfig((latestConfig) => {
					latestConfig.isShown = false;
					return { ...latestConfig };
				});
			},
			isDangerAction: true,
			isLoading: false,
			loadingMessage: "Deleting Product...",
		});

	const emptyFuture = useMemo(() => {
		return {
			year:
				(product.futures
					? product.futures[product.futures?.length - 1]?.year ??
					  new Date().getFullYear()
					: new Date().getFullYear()) + 1,
			level: 2,
			sales: 50,
		} as IFuture;
	}, []);

	return (
		<>
			<div key={index} className='flex p-5 rounded-2xl bg-[#f8f9f9] text-lg'>
				<div className='grow'>
					<div className='flex flex-col'>
						<div className='flex flex-col gap-3 pb-5'>
							<div className='flex items-center gap-5'>
								<div className='grow flex flex-col gap-2 px-2'>
									<label>Product name</label>
									<Field
										type='text'
										className='light-input'
										placeholder='Name'
										name={`products.${index}.name`}
									/>
									<ErrorMessage name={`products.${index}.name`}>
										{(msg) => (
											<div className='text-rose-500'>{msg}</div>
										)}
									</ErrorMessage>
								</div>
							</div>
						</div>
						<FieldArray name={`products.${index}.futures`}>
							{({ remove, push, form }) => {
								return (
									<div className='flex flex-col gap-5'>
										<div>
											{!!product.futures?.length &&
												product.futures?.map(
													(future, futureIndex) => {
														return (
															<div
																key={futureIndex}
																className='flex flex-col'>
																<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'>
																	<div className='p-2 flex flex-col gap-2'>
																		<label>
																			{futureIndex === 0
																				? `Present`
																				: `Future ${futureIndex}`}{" "}
																		</label>
																		<Field
																			type='number'
																			className='light-input'
																			placeholder='year'
																			name={`products.${index}.futures.${futureIndex}.year`}
																		/>
																		<ErrorMessage
																			name={`products.${index}.futures.${futureIndex}.year`}>
																			{(msg) => (
																				<div className='text-rose-500'>
																					{msg}
																				</div>
																			)}
																		</ErrorMessage>
																	</div>
																	<div className='p-2 flex flex-col gap-2'>
																		<label>Level</label>
																		<Field
																			as='select'
																			name={`products.${index}.futures.${futureIndex}.level`}
																			className='accent-blue-true light-input'>
																			<option value='1'>
																				Settler
																			</option>
																			<option value='2'>
																				Migrator
																			</option>
																			<option value='3'>
																				Pioneer
																			</option>
																		</Field>
																		<ErrorMessage
																			name={`products.${index}.futures.${futureIndex}.level`}>
																			{(msg) => (
																				<div className='text-rose-500'>
																					{msg}
																				</div>
																			)}
																		</ErrorMessage>
																	</div>
																	<div className='p-2 flex flex-col gap-3'>
																		<label>Sales (USD)</label>
																		<Field
																			type='number'
																			name={`products.${index}.futures.${futureIndex}.sales`}
																			min='0'
																			className='accent-blue-true light-input'
																		/>
																		<ErrorMessage
																			name={`products.${index}.futures.${futureIndex}.sales`}>
																			{(msg) => (
																				<div className='text-rose-500'>
																					{msg}
																				</div>
																			)}
																		</ErrorMessage>
																	</div>
																</div>
															</div>
														);
													}
												)}
											{!product.futures?.length &&
												!!objectPath.get(
													form,
													`errors.products.${index}.futures`
												) && (
													<div className='w-full flex items-center'>
														<p className='grow text-lg p-3 text-center bg-rose-50 text-rose-500'>
															{objectPath.get(
																form,
																`errors.products.${index}.futures`
															)}
														</p>
													</div>
												)}
										</div>
										<div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
											<div className='p-2'>
												<button
													type='button'
													onClick={() => {
														const newFuture = { ...emptyFuture };
														if (product.futures?.length) {
															newFuture.year =
																product.futures.reduce(
																	(max, future) =>
																		future.year <= 2099 &&
																		max.year > future.year
																			? max
																			: future
																).year + 1; // to get the greatest year + 1
															if (newFuture.year > 2099) {
																newFuture.year = 2099;
															}
														}
														push(newFuture);
													}}
													className='w-full btn-primary-light'>
													<FontAwesomeIcon
														className='w-[0.8rem] h-auto cursor-pointer'
														icon={faPlus}
													/>
													<span>Add New Future</span>
												</button>
											</div>
											{!!product.futures?.length &&
												product.futures?.length > 0 && (
													<div className='p-2'>
														<button
															type='button'
															onClick={() => {
																if (product.futures) {
																	remove(
																		product.futures.length - 1
																	);
																}
															}}
															className='w-full btn-primary-light'>
															<FontAwesomeIcon
																className='w-2 h-auto cursor-pointer hover:text-rose-500'
																icon={faMinus}
															/>
															<span>Remove Last Future</span>
														</button>
													</div>
												)}
											<div className='p-2'>
												<button
													type='button'
													onClick={() => {
														setConfirmDialogConfig(
															(latestConfig) => {
																latestConfig.isShown = true;
																latestConfig.actionCallback =
																	() => {
																		onRemove();
																		setConfirmDialogConfig(
																			(latestConfig) => {
																				latestConfig.isShown =
																					false;
																				return {
																					...latestConfig,
																				};
																			}
																		);
																	};
																return { ...latestConfig };
															}
														);
													}}
													className='w-full btn-danger'>
													<FontAwesomeIcon
														className='w-4 cursor-pointer text-rose-50'
														icon={faTrash}
													/>
													<span>Delete Product</span>
												</button>
											</div>
										</div>
									</div>
								);
							}}
						</FieldArray>
					</div>
				</div>
			</div>

			<ConfirmModal config={confirmDialogConfig}></ConfirmModal>
		</>
	);
};

export default Product;
