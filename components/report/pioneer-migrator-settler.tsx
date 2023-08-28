import { IUserProduct } from "../../models/user-product";
import Spinner from "../common/spinner";
import Chart from "react-google-charts";
import useFuturesChart from "../../hooks/use-futures-chart";

interface Props {
	userProduct?: IUserProduct;
	isLoading: boolean;
}

const PioneerMigratorSettlerReport = ({ userProduct, isLoading }: Props) => {
	const [chart] = useFuturesChart(userProduct?.products ?? []);

	return (
		<div>
			<div className='mb-10'>
				<h2 className='report-header-4 font-hero-bold'>
					Pioneer, Migrator, Settler
				</h2>
			</div>
			<div className='flex gap-5'>
				{isLoading && (
					<Spinner
						message='loading products...'
						className='items-center'
					/>
				)}
			</div>
			{!isLoading && !!userProduct?.products?.length && (
				<div className='h-[500px]'>
					<Chart {...{ ...chart, height: "100%" }} legendToggle />
				</div>
			)}
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
								<table className='table-auto w-full border'>
									<thead>
										<tr className='bg-slate-50'>
											<th className='p-3 border'>Year</th>
											<th className='p-3 border'>Sales</th>
											<th className='p-3 border'>Level</th>
										</tr>
									</thead>
									<tbody>
										{product.futures?.map((future, futureIndex) => (
											<tr
												key={futureIndex}
												className='even:bg-slate-50'>
												<td className='p-3 border'>
													{future.year}
												</td>
												<td className='p-3 border'>
													{future.level}
												</td>
												<td className='p-3 border'>
													{future.sales}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};

export default PioneerMigratorSettlerReport;
