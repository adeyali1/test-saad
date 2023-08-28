import { IUserProduct } from "../../models/user-product";
import { useSession } from "next-auth/react";
import Spinner from "../common/spinner";
import MarketPotentialProductChart from "../market-potential/product-chart";

interface Props {
	userProduct?: IUserProduct;
	isLoading: boolean;
}
const MarketPotentialReport = ({ userProduct, isLoading }: Props) => {
	return (
		<div>
			<div className='mb-5'>
				<h2 className='report-header-4 font-hero-bold'>Market Potential</h2>
			</div>
			<div className='flex gap-5'>
				{isLoading && (
					<Spinner
						message='loading products...'
						className='items-center'
					/>
				)}
			</div>
			{!isLoading && !userProduct?.products?.length && (
				<p className='p-3 text-yellow-700'>No products are added yet</p>
			)}
			<div className='pl-6'>
				<ul className='list-outside'>
					{!isLoading &&
						userProduct?.products?.map((product, productIndex) => (
							<li
								key={product.name + productIndex}
								className='list-decimal p-3'>
								<p className='report-header-3 font-hero-semibold mr-3 mb-3 py-5'>
									{product.name}
								</p>
								<div className='relative h-[300px] mb-10'>
									<MarketPotentialProductChart
										product={product}
										customOptions={{
											backgroundColor: "#f8fafc",
											titleTextStyle: {
												fontSize: 13, // Don't specify px
											},
											legend: {
												position: "right",
												alignment: "start",
												textStyle: {
													fontSize: 13,
												},
											},
										}}
									/>
									<div className='absolute inset-0'></div>
								</div>
								<table className='table-auto w-full border'>
									<thead>
										<tr className='bg-slate-50'>
											<th className='p-3 border'>Competitor</th>
											<th className='p-3 border'>Market Share</th>
										</tr>
									</thead>
									<tbody>
										{product.competitors?.map(
											(competitor, competitorIndex) => (
												<tr
													key={competitorIndex}
													className='even:bg-slate-50'>
													<td className='p-3 border'>
														{competitor.name}
													</td>
													<td className='p-3 border'>
														{competitor.marketShare}
													</td>
												</tr>
											)
										)}
									</tbody>
								</table>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};

export default MarketPotentialReport;
