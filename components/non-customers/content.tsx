import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import * as clientApi from "../../http-client/non-customers.client";
import { IUserNonCustomers } from "../../models/user-non-customers";
import Spinner from "../../components/common/spinner";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Image from "next/image";

interface Props {
	userNonCustomers: IUserNonCustomers;
	dispatchUserNonCustomers: (userNonCustomers: any) => void;
	isLoading: boolean;
}

const NonCustomersContent = ({
	userNonCustomers,
	dispatchUserNonCustomers,
	isLoading,
}: Props) => {
	const { data: session }: any = useSession();

	const router = useRouter();

	const [nonCustomerToBeAdded, setNonCustomerToBeAdded] = useState<string>("");
	const [refusingNonCustomerToBeAdded, setRefusingNonCustomerToBeAdded] =
		useState<string>("");
	const [unwantedNonCustomerToBeAdded, setUnwantedNonCustomerToBeAdded] =
		useState<string>("");

	const queryClient = useQueryClient();

	const {
		mutate: updateUserNonCustomers,
		isLoading: isUpdatingUserNonCustomers,
	} = useMutation(
		(userNonCustomers: IUserNonCustomers) => {
			return clientApi.updateOne(userNonCustomers);
		},
		{
			onMutate: (updated) => {
				queryClient.setQueryData(
					[clientApi.Keys.All, userNonCustomers.id],
					updated
				);
			},
			onSuccess: (updated) => {
				queryClient.invalidateQueries([
					clientApi.Keys.All,
					userNonCustomers.id,
				]);
				queryClient.invalidateQueries([clientApi.Keys.All]);
			},
		}
	);

	const {
		mutate: createUserNonCustomers,
		isLoading: isCreatingUserNonCustomers,
	} = useMutation(
		(userNonCustomers: IUserNonCustomers) =>
			clientApi.insertOne(userNonCustomers),
		{
			onMutate: (updated) => {
				queryClient.setQueryData(
					[clientApi.Keys.All, userNonCustomers.id],
					updated
				);
			},
			onSuccess: (updated) => {
				queryClient.invalidateQueries([
					clientApi.Keys.All,
					userNonCustomers.id,
				]);
				queryClient.invalidateQueries([clientApi.Keys.All]);
			},
		}
	);

	return (
		<>
			<h3 className='title-header mb-0'>Non customers</h3>
			{isLoading && (
				<Spinner
					className='flex items-center px-1 text-2xl'
					message='Loading non customers...'
				/>
			)}
			{!isLoading && (
				<form className='flex flex-col'>
					<div className='flex flex-col gap-5 my-5 p-5 bg-dark-50 rounded-2xl'>
						<p className='text-[1.75rem] text-dark-400 font-hero-semibold'>
							Soon to be non-customers
						</p>
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
								Who are the customers most likely to be left out in this
								transformation ?
							</h3>
						</div>
						<ul className='flex flex-col gap-3'>
							{!userNonCustomers.soonNonCustomers?.length &&
								!isLoading && (
									<div className='w-full flex justify-start items-center'>
										<p className='p-5 text-dark-400 text-xl text-center italic'>
											Start adding soon to be non customers...
										</p>
									</div>
								)}
							<div className='w-full flex gap-5 items-center'>
								<input
									type='text'
									className='w-[69%] light-input'
									placeholder='Enter Soon to be Non-Customer here'
									value={nonCustomerToBeAdded}
									onChange={(e) => {
										setNonCustomerToBeAdded(e.target.value);
									}}
								/>
								<button
									type='button'
									onClick={() => {
										userNonCustomers.soonNonCustomers.push(
											nonCustomerToBeAdded
										);
										dispatchUserNonCustomers({
											...userNonCustomers,
										} as IUserNonCustomers);
										setNonCustomerToBeAdded("");
									}}
									disabled={!nonCustomerToBeAdded}
									className={
										!!nonCustomerToBeAdded
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
							{!!userNonCustomers.soonNonCustomers?.length &&
								userNonCustomers.soonNonCustomers.map(
									(nonCustomer, index) => (
										<li
											key={index}
											className='relative w-[69%] flex items-center'>
											<input
												type='text'
												className='dark-input'
												value={nonCustomer}
												readOnly
											/>
											<button
												type='button'
												onClick={() => {
													userNonCustomers.soonNonCustomers =
														userNonCustomers.soonNonCustomers.filter(
															(nonC, i) => i !== index
														);
													dispatchUserNonCustomers({
														...userNonCustomers,
													});
												}}
												className='btn-delete'>
												<FontAwesomeIcon
													icon={faTimes}
													className='w-4 text-dark-300 hover:text-dark-400'
												/>
											</button>
										</li>
									)
								)}
						</ul>
					</div>
					<div className='min-h-[28rem] flex flex-col gap-3 my-5 p-5 bg-dark-50 rounded-2xl'>
						<p className='text-[1.75rem] text-dark-400 font-hero-semibold'>
							Refusing non-customers
						</p>
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
								Who are the customers most likely to be refusing of this
								transformation ?
							</h3>
						</div>
						<ul className='flex flex-col gap-5'>
							{!userNonCustomers.refusingNonCustomers?.length &&
								!isLoading && (
									<div className='w-full flex justify-start items-center'>
										<p className='p-5 text-dark-400 text-xl text-center italic'>
											Start adding refusing non-customers...
										</p>
									</div>
								)}
							<div className='w-full flex gap-5 items-center'>
								<input
									type='text'
									className='w-[69%] light-input'
									placeholder='Enter refusing Non-Customer here'
									value={refusingNonCustomerToBeAdded}
									onChange={(e) => {
										setRefusingNonCustomerToBeAdded(e.target.value);
									}}
								/>
								<button
									type='button'
									onClick={() => {
										userNonCustomers.refusingNonCustomers.push(
											refusingNonCustomerToBeAdded
										);
										dispatchUserNonCustomers({
											...userNonCustomers,
										} as IUserNonCustomers);
										setRefusingNonCustomerToBeAdded("");
									}}
									disabled={!refusingNonCustomerToBeAdded}
									className={
										!!refusingNonCustomerToBeAdded
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
							{!!userNonCustomers.refusingNonCustomers?.length &&
								userNonCustomers.refusingNonCustomers.map(
									(refusingCustomer, index) => (
										<li
											key={index}
											className='relative w-[69%] flex items-center'>
											<input
												type='text'
												className='dark-input'
												value={refusingCustomer}
												readOnly
											/>
											<button
												type='button'
												onClick={() => {
													userNonCustomers.refusingNonCustomers =
														userNonCustomers.refusingNonCustomers.filter(
															(nonC, i) => i !== index
														);
													dispatchUserNonCustomers({
														...userNonCustomers,
													});
												}}
												className='btn-delete'>
												<FontAwesomeIcon
													icon={faTimes}
													className='w-4 text-dark-300 hover:text-dark-400'
												/>
											</button>
										</li>
									)
								)}
						</ul>
					</div>
					<div className='min-h-[28rem] flex flex-col gap-3 my-5 p-5 bg-dark-50 rounded-2xl'>
						<p className='text-[1.75rem] text-dark-400 font-hero-semibold'>
							Unwanted non-customers
						</p>
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
								Who are the customers you don&apos;t want in this
								transformation ?
							</h3>
						</div>

						<ul className='flex flex-col gap-5'>
							{!userNonCustomers.unwantedNonCustomers?.length &&
								!isLoading && (
									<div className='w-full flex justify-start items-center'>
										<p className='p-5 text-dark-400 text-xl text-center italic'>
											Start adding unwanted non-customers...
										</p>
									</div>
								)}
							<div className='w-full flex gap-5 items-center'>
								<input
									type='text'
									className='w-[69%] light-input'
									placeholder='Enter unwanted Non-Customer here'
									value={unwantedNonCustomerToBeAdded}
									onChange={(e) => {
										setUnwantedNonCustomerToBeAdded(e.target.value);
									}}
								/>
								<button
									type='button'
									onClick={() => {
										userNonCustomers.unwantedNonCustomers.push(
											unwantedNonCustomerToBeAdded
										);
										dispatchUserNonCustomers({
											...userNonCustomers,
										} as IUserNonCustomers);
										setUnwantedNonCustomerToBeAdded("");
									}}
									disabled={!unwantedNonCustomerToBeAdded}
									className={
										!!unwantedNonCustomerToBeAdded
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
							{!!userNonCustomers.unwantedNonCustomers?.length &&
								userNonCustomers.unwantedNonCustomers.map(
									(unwantedCustomer, index) => (
										<li
											key={index}
											className='relative w-[69%] flex items-center'>
											<input
												type='text'
												className='dark-input'
												value={unwantedCustomer}
												readOnly
											/>
											<button
												type='button'
												onClick={() => {
													userNonCustomers.unwantedNonCustomers =
														userNonCustomers.unwantedNonCustomers.filter(
															(nonC, i) => i !== index
														);
													dispatchUserNonCustomers({
														...userNonCustomers,
													});
												}}
												className='btn-delete'>
												<FontAwesomeIcon
													icon={faTimes}
													className='w-4 text-dark-300 hover:text-dark-400'
												/>
											</button>
										</li>
									)
								)}
						</ul>
					</div>
					<div className='h-10'>
						{(isUpdatingUserNonCustomers ||
							isCreatingUserNonCustomers) && (
							<Spinner
								className='flex items-center px-1 text-xl'
								message='Saving non customers...'
							/>
						)}
					</div>
					<div className='flex flex-wrap gap-5 justify-between py-3'>
						<button
							type='button'
							onClick={() => {
								const newObj = {
									...userNonCustomers,
								};
								newObj.userId = session?.user?.id;
								if (!userNonCustomers.id) {
									createUserNonCustomers(newObj);
								} else {
									updateUserNonCustomers(newObj);
								}
							}}
							className='btn-rev'>
							Save
						</button>
						{!!userNonCustomers.id && (
							<div
								className='cursor-pointer bg-dark-300 hover:shadow-lg px-9 py-3 rounded-full'
								onClick={() => {
									router.push("../org/step-up-step-down");
								}}>
								<span className='text-xl text-md text-white'>
									Go to next -{" "}
									<span className='text-white'>
										Step-up step-down model
									</span>
								</span>
							</div>
						)}
					</div>
				</form>
			)}
		</>
	);
};

export default NonCustomersContent;
