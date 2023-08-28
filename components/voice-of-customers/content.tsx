import { useFormik } from "formik";
import { array, object, string } from "yup";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useMemo, useState, useEffect } from "react";
import { IUserCustomers } from "../../models/user-customers";
import * as clientApi from "../../http-client/customers.client";
import Spinner from "../../components/common/spinner";
import { useRouter } from "next/router";
import Image from "next/image";

const VoiceOfCustomersContent = () => {
	const { data: session }: any = useSession();

	const router = useRouter();

	const emptyUserCustomers = useMemo(() => {
		return {
			id: "",
			userId: session?.user?.id,
			topCategories: ["", "", "", "", ""],
			wishlist: ["", "", "", "", ""],
			fulfill: ["", "", "", "", ""],
		} as IUserCustomers;
	}, []);

	const [userCustomers, setUserCustomers] =
		useState<IUserCustomers>(emptyUserCustomers);

	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery<IUserCustomers>({
		queryKey: [clientApi.Keys.All],
		queryFn: clientApi.getOne,
		refetchOnWindowFocus: false,
		enabled: !!session?.user?.id,
	});

	useEffect(() => {
		if (data) {
			setUserCustomers(data);
		}
	}, [data]);

	const { mutate: updateUserCustomers, isLoading: isUpdatingUserCustomers } =
		useMutation(
			(userCustomers: IUserCustomers) => {
				return clientApi.updateOne(userCustomers);
			},
			{
				onMutate: (updated) => {
					queryClient.setQueryData(
						[clientApi.Keys.All, userCustomers.id],
						updated
					);
				},
				onSuccess: (updated) => {
					queryClient.invalidateQueries([
						clientApi.Keys.All,
						userCustomers.id,
					]);
					queryClient.invalidateQueries([clientApi.Keys.All]);
				},
			}
		);

	const { mutate: createUserCustomers, isLoading: isCreatingUserCustomers } =
		useMutation(
			(userCustomers: IUserCustomers) => clientApi.insertOne(userCustomers),
			{
				onMutate: (updated) => {
					queryClient.setQueryData(
						[clientApi.Keys.All, userCustomers.id],
						updated
					);
				},
				onSuccess: (updated) => {
					queryClient.invalidateQueries([
						clientApi.Keys.All,
						userCustomers.id,
					]);
					queryClient.invalidateQueries([clientApi.Keys.All]);
				},
			}
		);

	const formik = useFormik({
		initialValues: {
			...userCustomers,
		},
		validationSchema: object({
			topCategories: array(string()),
			wishlist: array(string()),
			fulfill: array(string()),
		}),
		onSubmit: async (values, { setSubmitting }) => {
			values.userId = session?.user?.id;
			if (!values.id) {
				await createUserCustomers(values);
			} else {
				await updateUserCustomers(values);
			}
			setSubmitting(false);
		},
		enableReinitialize: true,
	});
	return (
		<>
			<h3 className='title-header'>Voice of customers</h3>
			{isLoading && (
				<Spinner
					className='flex items-center text-2xl'
					message='Loading Customers...'
				/>
			)}
			{!isLoading && (
				<>
					<div className='pill-yellow-50 p-3 lg:w-full mb-5'>
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
							what do your top customer categories want and how can you
							fulfill their needs?
						</h3>
					</div>
					<div className='flex gap-5 flex-wrap xl:flex-nowrap p-5 bg-dark-50 rounded-2xl'>
						<div className='grow flex flex-col gap-3'>
							<h4 className='text-[1.75rem] text-dark-400 font-hero-semibold'>
								Customer categories
							</h4>
							<ul className='flex flex-col gap-5'>
								<li>
									<input
										type='text'
										placeholder='Write your notes here...'
										{...formik.getFieldProps("topCategories.0")}
										className='light-input w-full'
									/>
								</li>
								<li>
									<input
										type='text'
										placeholder='Write your notes here...'
										{...formik.getFieldProps("topCategories.1")}
										className='light-input w-full'
									/>
								</li>
								<li>
									<input
										type='text'
										placeholder='Write your notes here...'
										{...formik.getFieldProps("topCategories.2")}
										className='light-input w-full'
									/>
								</li>
								<li>
									<input
										type='text'
										placeholder='Write your notes here...'
										{...formik.getFieldProps("topCategories.3")}
										className='light-input w-full'
									/>
								</li>
								<li>
									<input
										type='text'
										placeholder='Write your notes here...'
										{...formik.getFieldProps("topCategories.4")}
										className='light-input w-full'
									/>
								</li>
							</ul>
						</div>
						<div className='grow flex flex-col gap-3'>
							<h4 className='text-[1.75rem] text-dark-400 font-hero-semibold'>
								What they want
							</h4>
							<ul className='flex flex-col gap-5'>
								<li>
									<input
										type='text'
										placeholder='Write your notes here...'
										{...formik.getFieldProps("wishlist.0")}
										className='light-input w-full'
									/>
								</li>
								<li>
									<input
										type='text'
										placeholder='Write your notes here...'
										{...formik.getFieldProps("wishlist.1")}
										className='light-input w-full'
									/>
								</li>
								<li>
									<input
										type='text'
										placeholder='Write your notes here...'
										{...formik.getFieldProps("wishlist.2")}
										className='light-input w-full'
									/>
								</li>
								<li>
									<input
										type='text'
										placeholder='Write your notes here...'
										{...formik.getFieldProps("wishlist.3")}
										className='light-input w-full'
									/>
								</li>
								<li>
									<input
										type='text'
										placeholder='Write your notes here...'
										{...formik.getFieldProps("wishlist.4")}
										className='light-input w-full'
									/>
								</li>
							</ul>
						</div>
						<div className='grow flex flex-col gap-3'>
							<h4 className='text-[1.75rem] text-dark-400 font-hero-semibold'>
								How to fulfill it
							</h4>
							<ul className='flex flex-col gap-5'>
								<li>
									<input
										type='text'
										placeholder='Write your notes here...'
										{...formik.getFieldProps("fulfill.0")}
										className='light-input w-full'
									/>
								</li>
								<li>
									<input
										type='text'
										placeholder='Write your notes here...'
										{...formik.getFieldProps("fulfill.1")}
										className='light-input w-full'
									/>
								</li>
								<li>
									<input
										type='text'
										placeholder='Write your notes here...'
										{...formik.getFieldProps("fulfill.2")}
										className='light-input w-full'
									/>
								</li>
								<li>
									<input
										type='text'
										placeholder='Write your notes here...'
										{...formik.getFieldProps("fulfill.3")}
										className='light-input w-full'
									/>
								</li>
								<li>
									<input
										type='text'
										placeholder='Write your notes here...'
										{...formik.getFieldProps("fulfill.4")}
										className='light-input w-full'
									/>
								</li>
							</ul>
						</div>
					</div>
					<div className='mt-20'>
						<div className='h-10'>
							{(isUpdatingUserCustomers || isCreatingUserCustomers) && (
								<Spinner
									className='flex items-center text-xl'
									message='Saving Customers...'
								/>
							)}
						</div>
						<div className='flex gap-5 justify-between items-center'>
							<button
								type='button'
								onClick={() => {
									formik.handleSubmit();
								}}
								className={
									formik.isSubmitting || !formik.isValid
										? "btn-rev btn-disabled"
										: "btn-rev"
								}
								disabled={formik.isSubmitting || !formik.isValid}>
								Save
							</button>
							{!!userCustomers.id && (
								<div
									className='cursor-pointer bg-dark-300 hover:shadow-lg px-9 py-3 rounded-full'
									onClick={() => {
										router.push("../org/blue-ocean");
									}}>
									<span className='text-xl text-md text-white'>
										Go to next -{" "}
										<span className='text-white'>
											Blue Ocean Canvas
										</span>
									</span>
								</div>
							)}
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default VoiceOfCustomersContent;
