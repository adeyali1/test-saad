import { IUserAnalysis } from "../../models/user-analysis";
import Spinner from "../common/spinner";

interface Props {
	userAnalysis: IUserAnalysis;
	isLoading: boolean;
}

const StepUpStepDownCustomersReview = ({ userAnalysis, isLoading }: Props) => {
	return (
		<>
			<div className='flex flex-col gap-5 rounded-2xl'>
				<div className='min-h-[15rem] flex flex-col gap-3 p-5 my-5 bg-dark-50 rounded-2xl'>
					<h6 className='text-dark-400 text-[1.75rem] font-hero-semibold'>
						10% above
					</h6>
					<ul className='flex flex-col gap-5'>
						{!userAnalysis.above?.length && !isLoading && (
							<div className='w-full flex justify-start items-center'>
								<p className='px-5 text-lg text-center italic'>
									Start adding above customers...
								</p>
							</div>
						)}
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
								</li>
							))}
					</ul>
				</div>
				<div className='min-h-[15rem] flex flex-col gap-3 p-5 my-5 bg-dark-50 rounded-2xl'>
					<h6 className='text-dark-400 text-[1.75rem] font-hero-semibold'>
						Your Customers
					</h6>
					<ul className='flex flex-col gap-5'>
						{!userAnalysis.customers?.length && !isLoading && (
							<div className='w-full flex justify-start items-center'>
								<p className='px-5 text-lg text-center italic'>
									Start adding current customers...
								</p>
							</div>
						)}
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
								</li>
							))}
					</ul>
				</div>
				<div className='min-h-[15rem] flex flex-col gap-3 p-5 my-5 bg-dark-50 rounded-2xl'>
					<h6 className='text-dark-400 text-[1.75rem] font-hero-semibold'>
						10% below
					</h6>
					<ul className='flex flex-col gap-5'>
						{!userAnalysis.below?.length && !isLoading && (
							<div className='w-full flex justify-start items-center'>
								<p className='px-5 text-lg text-center italic'>
									Start adding below customers...
								</p>
							</div>
						)}
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
								</li>
							))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default StepUpStepDownCustomersReview;
