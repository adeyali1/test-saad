import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FieldArray, Field, ErrorMessage } from "formik";
import { ICompetitor, IProduct } from "../../models/types";

interface Props {
	product: IProduct;
	index: number;
	formUtilities: any;
}

const CompetitorsProduct = ({ product, index, formUtilities }: Props) => {
	const emptyCompetitor = {
		uuid: crypto.randomUUID(),
		name: "",
		marketShare: 0,
	} as ICompetitor;

	return (
		<div className='flex justify-between text-lg bg-dark-50 rounded-2xl'>
			<div className='w-full'>
				<div key={index} className=''>
					<FieldArray name={`products.${index}.competitors`}>
						{({ remove, push }) => (
							<div className='relative'>
								<ul className='flex flex-col gap-5 mb-10 p-5'>
									{!product?.competitors?.length && (
										<div className='text-center bg-rose-50 text-sm text-rose-500 p-5'>
											Please, add at least one competitor
										</div>
									)}
									{!!product?.competitors?.length &&
										product?.competitors.map((comp, compIndex) => (
											<li
												key={compIndex}
												className='flex gap-[3.5rem] items-start relative'>
												{compIndex > 0 && (
													<>
														<div className='w-full md:w-1/2 flex flex-col gap-2'>
															<label>
																{!comp.isUntapped && (
																	<>
																		Competitor {compIndex - 1}
																	</>
																)}
																{comp.isUntapped && (
																	<>Untapped Market</>
																)}
															</label>
															<Field
																type='text'
																placeholder='name'
																className='w-full light-input'
																name={`products.${index}.competitors.${compIndex}.name`}
															/>
															<ErrorMessage
																name={`products.${index}.competitors.${compIndex}.name`}>
																{(msg) => (
																	<div className='text-sm text-rose-500'>
																		{msg}
																	</div>
																)}
															</ErrorMessage>
														</div>
													</>
												)}
												{compIndex === 0 && (
													<>
														<div className='w-full md:w-1/2 flex flex-col gap-2'>
															<label>My Product</label>
															<Field
																type='text'
																placeholder='product name'
																className='light-input'
																name={`products.${index}.name`}
															/>
														</div>
													</>
												)}
												<div className='relative w-full md:w-1/2 flex flex-col gap-2'>
													<label>Market share (USD)</label>
													<Field
														type='number'
														placeholder='percentage'
														className='light-input'
														name={`products.${index}.competitors.${compIndex}.marketShare`}
														min='0'
													/>
													<ErrorMessage
														name={`products.${index}.competitors.${compIndex}.marketShare`}>
														{(msg) => (
															<div className='w-full text-sm text-rose-500'>
																{msg}
															</div>
														)}
													</ErrorMessage>
													{compIndex > 1 && (
														<FontAwesomeIcon
															icon={faTimes}
															onClick={() => {
																if (compIndex > 0)
																	remove(compIndex);
															}}
															className='w-4 h-auto absolute top-[55%] right-5 cursor-pointer text-dark-300 hover:text-dark-400'
														/>
													)}
												</div>
											</li>
										))}
									<div>
										{!!formUtilities.errors?.competitors &&
											formUtilities.errors.competitors
												.product_uuid === product?.uuid && (
												<p className='text-rose-500'>
													{
														formUtilities.errors.competitors
															.errorMessage
													}
												</p>
											)}
									</div>
									<div className='flex'>
										<button
											type='button'
											onClick={() => {
												push(emptyCompetitor);
											}}
											className='btn-primary-light px-10'>
											<FontAwesomeIcon
												className='w-3 h-auto cursor-pointer hover:text-gray-600'
												icon={faPlus}
											/>
											Add New competitors
										</button>
									</div>
								</ul>
							</div>
						)}
					</FieldArray>
				</div>
			</div>
		</div>
	);
};

export default CompetitorsProduct;
