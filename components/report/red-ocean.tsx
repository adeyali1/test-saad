import { Fragment } from "react";
import { IFactorCompetitor, IProduct } from "../../models/types";
import { IUserProduct } from "../../models/user-product";
import Spinner from "../common/spinner";
import RedOceanProductChart from "../red-ocean/product-chart";

interface Props {
	userProduct?: IUserProduct;
	isLoading: boolean;
}
const RedOceanReport = ({ userProduct, isLoading }: Props) => {
	const calcExcellenceLevel = (value: string | number) => {
		if (value == "1") return "Poor";
		if (value == "2") return "Moderate";
		if (value == "3") return "Good";
		if (value == "4") return "Excellent";
	};

	const getTableHeaderCellTSX = (
		product: IProduct,
		factorComp: IFactorCompetitor
	) => {
		const correspondingComp = product.competitors?.find(
			(comp) => comp.uuid === factorComp.uuid
		);

		if (!correspondingComp || correspondingComp.isUntapped) return;

		return <th className='p-3 border'>{correspondingComp.name + ""}</th>;
	};

	const getTableDataCellTSX = (
		product: IProduct,
		factorComp: IFactorCompetitor
	) => {
		const correspondingComp = product.competitors?.find(
			(comp) => comp.uuid === factorComp.uuid
		);

		if (!correspondingComp || correspondingComp.isUntapped) return;

		return (
			<td className='p-3 border'>{calcExcellenceLevel(factorComp.value)}</td>
		);
	};

	return (
		<div>
			<div className='mb-5'>
				<h2 className='report-header-4 font-hero-bold'>Red Ocean Canvas</h2>
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
						userProduct?.products?.map((product) => (
							<li key={product.uuid} className='list-decimal p-3'>
								<p className='report-header-3 font-hero-semibold mr-3 mb-3 py-5'>
									{product.name}
								</p>
								<div className='relative h-[300px] mb-10'>
									<RedOceanProductChart
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
											<th className='p-3 border'>Factor</th>
											{product.factors?.length &&
												product.factors[0]?.competitors?.map(
													(competitor) => (
														<Fragment key={competitor.uuid}>
															{getTableHeaderCellTSX(
																product,
																competitor
															)}
														</Fragment>
													)
												)}
										</tr>
									</thead>
									<tbody>
										{product.factors?.map((factor, factorIndex) => (
											<tr
												key={factor.name + factorIndex}
												className='even:bg-slate-50'>
												<td className='p-3 border'>
													{factor.name}
												</td>
												{factor.competitors?.map(
													(comp: IFactorCompetitor) => (
														<Fragment key={comp.uuid}>
															{getTableDataCellTSX(
																product,
																comp
															)}
														</Fragment>
													)
												)}
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

export default RedOceanReport;
