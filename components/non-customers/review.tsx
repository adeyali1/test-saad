import { IUserNonCustomers } from "../../models/user-non-customers";

interface Props {
	userNonCustomers: IUserNonCustomers;
}

const NonCustomersReview = ({ userNonCustomers }: Props) => {
	return (
		<>
			<div className='flex flex-col'>
				<div className='min-h-[15rem] flex flex-col gap-3 my-5 p-5 bg-dark-50 rounded-2xl'>
					<p className='text-[1.75rem] text-dark-400 font-hero-semibold'>
						Soon to be non-customers
					</p>
					<ul className='flex flex-col gap-3'>
						{!userNonCustomers.soonNonCustomers?.length && (
							<div className='w-full flex justify-start items-center'>
								<p className='px-5 text-lg text-center italic'>
									Start adding soon to be non customers...
								</p>
							</div>
						)}
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
									</li>
								)
							)}
					</ul>
				</div>
				<div className='min-h-[15rem] flex flex-col gap-3 my-5 p-5 bg-dark-50 rounded-2xl'>
					<p className='text-[1.75rem] text-dark-400 font-hero-semibold'>
						Refusing non-customers
					</p>
					<ul className='flex flex-col gap-3'>
						{!userNonCustomers.refusingNonCustomers?.length && (
							<div className='w-full flex justify-start items-center'>
								<p className='px-5 text-lg text-center italic'>
									Start adding refusing non-customers...
								</p>
							</div>
						)}
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
									</li>
								)
							)}
					</ul>
				</div>
				<div className='min-h-[15rem] flex flex-col gap-3 my-5 p-5 bg-dark-50 rounded-2xl'>
					<p className='text-[1.75rem] text-dark-400 font-hero-semibold'>
						Unwanted non-customers
					</p>

					<ul className='flex flex-col gap-3'>
						{!userNonCustomers.unwantedNonCustomers?.length && (
							<div className='w-full flex justify-start items-center'>
								<p className='px-5 text-lg text-center italic'>
									Start adding unwanted non-customers...
								</p>
							</div>
						)}
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
									</li>
								)
							)}
					</ul>
				</div>
			</div>
		</>
	);
};

export default NonCustomersReview;
