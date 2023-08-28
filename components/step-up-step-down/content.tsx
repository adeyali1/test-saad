import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { IUserAnalysis } from "../../models/user-analysis";
import * as clientApi from "../../http-client/analysis.client";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../../components/common/spinner";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

interface Props {
	userAnalysis: IUserAnalysis;
	dispatchUserAnalysis: (userAnalysis: any) => void;
	isLoading: boolean;
}

const StepUpStepDownContent = ({
	userAnalysis,
	dispatchUserAnalysis,
	isLoading,
}: Props) => {
	const { data: session }: any = useSession();

	const router = useRouter();

	const [aboveCustomerToBeAdded, setAboveCustomerToBeAdded] =
		useState<string>("");
	const [currentCustomerToBeAdded, setCurrentCustomerToBeAdded] =
		useState<string>("");
	const [belowCustomerToBeAdded, setBelowCustomerToBeAdded] =
		useState<string>("");

	const queryClient = useQueryClient();

	const { mutate: updateUserAnalysis, isLoading: isUpdatingUserAnalysis } =
		useMutation(
			(userAnalysis: IUserAnalysis) => {
				return clientApi.updateOne(userAnalysis);
			},
			{
				onMutate: (updated) => {
					queryClient.setQueryData(
						[clientApi.Keys.All, userAnalysis.id],
						updated
					);
				},
				onSuccess: (updated) => {
					queryClient.invalidateQueries([
						clientApi.Keys.All,
						userAnalysis.id,
					]);
					queryClient.invalidateQueries([clientApi.Keys.All]);
				},
			}
		);

	const { mutate: createUserAnalysis, isLoading: isCreatingUserAnalysis } =
		useMutation(
			(userAnalysis: IUserAnalysis) => clientApi.insertOne(userAnalysis),
			{
				onMutate: (updated) => {
					queryClient.setQueryData(
						[clientApi.Keys.All, userAnalysis.id],
						updated
					);
				},
				onSuccess: (updated) => {
					queryClient.invalidateQueries([
						clientApi.Keys.All,
						userAnalysis.id,
					]);
					queryClient.invalidateQueries([clientApi.Keys.All]);
				},
			}
		);

	return (
		<>
			<h3 className='title-header'>Step-up step-down</h3>
			{isLoading && (
				<Spinner
					className='flex items-center px-1 text-2xl'
					message='Loading customers...'
				/>
			)}
			{!isLoading && (
				<form className='flex flex-col gap-10'>
					<div className='flex flex-col gap-5 p-5 bg-dark-50 rounded-2xl'>
						<h6 className='text-dark-400 text-[1.75rem] font-hero-semibold'>
							10% above
						</h6>
						<div className='pill-yellow-50 p-3'>
							<div className='w-[3rem] h-[3rem]'>
								<Image
									src='/bulb.svg'
									alt='Bulb Icon'
									width={0}
									height={0}
									className='w-full h-auto'
								/>
							</div>
							<h3 className='text-xl text-dark-300'>
								Who are your customers if you step up 10% above?
							</h3>
						</div>
						<ul className='flex flex-col gap-5'>
							{!userAnalysis.above?.length && !isLoading && (
								<div className='w-full flex justify-start items-center'>
									<p className='p-5 text-dark-400 text-xl text-center italic'>
										Start adding step up customers...
									</p>
								</div>
							)}
							<div className='w-full flex gap-5 items-center'>
								<input
									type='text'
									className='w-[69%] light-input'
									placeholder='Enter step up customer'
									value={aboveCustomerToBeAdded}
									onChange={(e) => {
										setAboveCustomerToBeAdded(e.target.value);
									}}
								/>
								<button
									type='button'
									onClick={() => {
										userAnalysis.above.push(aboveCustomerToBeAdded);
										dispatchUserAnalysis({
											...userAnalysis,
										});
										setAboveCustomerToBeAdded("");
									}}
									disabled={!aboveCustomerToBeAdded}
									className={
										!!aboveCustomerToBeAdded
											? "btn-primary"
											: "btn-primary-light hover:bg-primary-300 cursor-not-allowed"
									}>
									<FontAwesomeIcon
										className='w-3 h-auto cursor-pointer hover:text-gray-600'
										icon={faPlus}
									/>
									Add more
								</button>
							</div>
							{!!userAnalysis.above?.length &&
								userAnalysis.above.map((item, index) => (
									<li
										key={index}
										className='relative w-[69%] flex items-center'>
										<input
											type='text'
											className='dark-input'
											value={item}
											readOnly
										/>
										<button
											type='button'
											onClick={() => {
												userAnalysis.above =
													userAnalysis.above.filter(
														(item, i) => index !== i
													);
												dispatchUserAnalysis(
													(prevValue: IUserAnalysis) => {
														return {
															...prevValue,
														};
													}
												);
											}}
											className='btn-delete'>
											<FontAwesomeIcon
												icon={faTimes}
												className='w-4 text-dark-300 hover:text-dark-400'
											/>
										</button>
									</li>
								))}
						</ul>
					</div>
					<div className='flex flex-col gap-5 p-5 bg-dark-50 rounded-2xl'>
						<h6 className='text-dark-400 text-[1.75rem] font-hero-semibold'>
							Your Customers
						</h6>
						<div className='pill-yellow-50 p-3'>
							<div className='w-[3rem] h-[3rem]'>
								<Image
									src='/bulb.svg'
									alt='Bulb Icon'
									width={0}
									height={0}
									className='w-full h-auto'
								/>
							</div>
							<h3 className='text-xl text-dark-300'>
								Who are your current customers?
							</h3>
						</div>
						{!userAnalysis.customers?.length && !isLoading && (
							<div className='w-full flex justify-start items-center'>
								<p className='p-5 text-dark-400 text-xl text-center italic'>
									Start adding current customers...
								</p>
							</div>
						)}
						<div className='w-full flex gap-5 items-center'>
							<input
								type='text'
								className='w-[69%] light-input'
								placeholder='Enter current customer'
								value={currentCustomerToBeAdded}
								onChange={(e) => {
									setCurrentCustomerToBeAdded(e.target.value);
								}}
							/>
							<button
								type='button'
								onClick={() => {
									userAnalysis.customers.push(
										currentCustomerToBeAdded
									);
									dispatchUserAnalysis({
										...userAnalysis,
									});
									setCurrentCustomerToBeAdded("");
								}}
								disabled={!currentCustomerToBeAdded}
								className={
									!!currentCustomerToBeAdded
										? "btn-primary"
										: "btn-primary-light hover:bg-primary-300 cursor-not-allowed"
								}>
								<FontAwesomeIcon
									className='w-3 h-auto cursor-pointer hover:text-gray-600'
									icon={faPlus}
								/>
								Add more
							</button>
						</div>
						<ul className='flex flex-col gap-5'>
							{!!userAnalysis.customers?.length &&
								userAnalysis.customers.map((item, index) => (
									<li
										key={index}
										className='relative w-[69%] flex items-center'>
										<input
											type='text'
											className='dark-input'
											value={item}
											readOnly
										/>
										<button
											type='button'
											onClick={() => {
												userAnalysis.customers =
													userAnalysis.customers.filter(
														(item, i) => index !== i
													);
												dispatchUserAnalysis(
													(prevValue: IUserAnalysis) => {
														return {
															...prevValue,
														};
													}
												);
											}}
											className='btn-delete'>
											<FontAwesomeIcon
												icon={faTimes}
												className='w-4 text-dark-300 hover:text-dark-400'
											/>
										</button>
									</li>
								))}
						</ul>
					</div>
					<div className='flex flex-col gap-5 p-5 bg-dark-50 rounded-2xl'>
						<h6 className='text-dark-400 text-[1.75rem] font-hero-semibold'>
							10% below
						</h6>
						<div className='pill-yellow-50 p-3'>
							<div className='w-[3rem] h-[3rem]'>
								<Image
									src='/bulb.svg'
									alt='Bulb Icon'
									width={0}
									height={0}
									className='w-full h-auto'
								/>
							</div>
							<h3 className='text-xl text-dark-300'>
								Who are your customers if you step down 10% below?
							</h3>
						</div>
						{!userAnalysis.below?.length && !isLoading && (
							<div className='w-full flex justify-start items-center'>
								<p className='p-5 text-dark-400 text-xl text-center italic'>
									Start adding step down customers...
								</p>
							</div>
						)}
						<div className='w-full flex gap-5 items-center'>
							<input
								type='text'
								className='w-[69%] light-input'
								placeholder='Enter step down customer'
								value={belowCustomerToBeAdded}
								onChange={(e) => {
									setBelowCustomerToBeAdded(e.target.value);
								}}
							/>
							<button
								type='button'
								onClick={() => {
									userAnalysis.below.push(belowCustomerToBeAdded);
									dispatchUserAnalysis({
										...userAnalysis,
									});
									setBelowCustomerToBeAdded("");
								}}
								disabled={!belowCustomerToBeAdded}
								className={
									!!belowCustomerToBeAdded
										? "btn-primary"
										: "btn-primary-light hover:bg-primary-300 cursor-not-allowed"
								}>
								<FontAwesomeIcon
									className='w-3 h-auto cursor-pointer hover:text-gray-600'
									icon={faPlus}
								/>
								Add more
							</button>
						</div>
						<ul className='flex flex-col gap-5'>
							{!!userAnalysis.below?.length &&
								userAnalysis.below.map((item, index) => (
									<li
										key={index}
										className='relative w-[69%] flex items-center'>
										<input
											type='text'
											className='dark-input'
											value={item}
											readOnly
										/>
										<button
											type='button'
											onClick={() => {
												userAnalysis.below =
													userAnalysis.below.filter(
														(item, i) => index !== i
													);
												dispatchUserAnalysis(
													(prevValue: IUserAnalysis) => {
														return {
															...prevValue,
														};
													}
												);
											}}
											className='btn-delete'>
											<FontAwesomeIcon
												icon={faTimes}
												className='w-4 text-dark-300 hover:text-dark-400'
											/>
										</button>
									</li>
								))}
						</ul>
					</div>
					<div className='h-10'>
						{(isUpdatingUserAnalysis || isCreatingUserAnalysis) && (
							<Spinner
								className='flex items-center px-1 text-xl'
								message='Saving customers...'
							/>
						)}
					</div>
					<div className='flex gap-5 justify-between items-center flex-wrap'>
						<button
							type='button'
							onClick={() => {
								console.log(userAnalysis.customers);
								userAnalysis.userId = session?.user?.id;
								if (!userAnalysis.id) {
									createUserAnalysis(userAnalysis);
								} else {
									updateUserAnalysis(userAnalysis);
								}
							}}
							className='btn-rev'>
							Save
						</button>
						{!!userAnalysis.id && (
							<div
								className='cursor-pointer bg-dark-300 hover:shadow-lg px-9 py-3 rounded-full'
								onClick={() => {
									router.push("../org/roadmap");
								}}>
								<span className='text-xl text-md text-white'>
									Go to next -{" "}
									<span className='text-white'>Road Map </span>
								</span>
							</div>
						)}
					</div>
				</form>
			)}
		</>
	);
};

export default StepUpStepDownContent;
