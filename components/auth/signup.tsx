import { useMutation } from "@tanstack/react-query";
import { authProviderEnum } from "../../models/enums";
import { IUser } from "../../models/user";
import { signIn } from "next-auth/react";
import * as api from "../../http-client/auth.client";
import { useState } from "react";
import Spinner from "../common/spinner";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useRouter } from "next/router";

interface Props {
	closeCallback: () => void;
}

const Signup = ({ closeCallback }: Props) => {
	const router = useRouter();

	const [authState, setAuthState] = useState({
		isLoading: false,
		error: "",
	});

	const formik = useFormik({
		initialValues: {
			fullName: "",
			email: "",
			phoneNumber: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema: object({
			fullName: string().required("required"),
			email: string().email("wrong email validation").required("required"),
			// phoneNumber: string().matches(type the RegExp, 'Phone number is not valid').required("required"),
			phoneNumber: string().required("required"),
			password: string().required("required"),
			confirmPassword: string()
				.required("required")
				.test(
					"password-should-match",
					"Passwords must match",
					function (value) {
						return this.parent.password === value;
					}
				),
		}),
		onSubmit: (values) => {
			const { confirmPassword, ...payload } = values;
			mutate({
				...payload,
				provider: authProviderEnum.credentials,
			} as IUser);
		},
	});

	const { mutate, isLoading: signUpLoading } = useMutation<
		{ id: string },
		Error,
		IUser
	>(api.singUp, {
		onSuccess: async (res) => {
			if (res.id) {
				await trySignIn(
					formik.values.email ?? "",
					formik.values.password ?? ""
				);
			}
		},
		onError: async (err) => {
			const { data: error } = (err as any)?.response;
			if (error) {
				setAuthState({
					isLoading: false,
					error: error.message,
				});
			}
		},
	});

	async function trySignIn(email: string, password: string) {
		const result = await signIn("credentials", {
			redirect: false,
			email: email,
			password: password,
		});

		if (!result?.error) {
			//handle successful login.. close sign up modal, and stay in place.
			closeCallback();
			router.push("org/goals");
		} else {
			setAuthState((old) => ({
				...old,
				isLoading: false,
				error: "Invalid Login",
			}));
		}
	}

	return (
		<>
			<div className='flex flex-col p-3 p-5'>
				<div className='flex items-center justify-between min-h-[58px] p-3'>
					<div className='flex flex-col gap-5'>
						<p className='text-gray-gunmetal text-4xl font-hero-semibold'>
							Create new account
						</p>
					</div>
				</div>

				{authState.error && (
					<div className='bg-red-100 p-2 mt-2  text-red-900'>
						{authState.error}
					</div>
				)}

				{authState.isLoading && (
					<div className='flex flex-col items-center justify-center mt-5'>
						<Spinner
							className=''
							message='trying to login, please wait ...'></Spinner>
					</div>
				)}

				{signUpLoading && (
					<div className='flex flex-col items-center justify-center mt-5'>
						<Spinner
							className=''
							message='Signing you up, please wait ...'></Spinner>
					</div>
				)}

				<div className='relative flex-auto p-3 overflow-auto'>
					<div id='validation-errors'></div>
					{/* submit form then redirect to app/goals */}
					<form
						onSubmit={formik.handleSubmit}
						className='flex flex-col gap-5'>
						<div>
							<input
								id='fullName'
								type='text'
								placeholder='Full Name'
								className='light-input w-full text-[1rem]'
								{...formik.getFieldProps("fullName")}
							/>
							{formik.errors?.fullName && (
								<div className='pl-4 text-rose-400 text-[1rem]'>
									{formik.errors.fullName}
								</div>
							)}
						</div>
						<div>
							<input
								id='email'
								type='email'
								placeholder='Email'
								className='light-input w-full text-[1rem]'
								{...formik.getFieldProps("email")}
							/>
							{formik.errors.email && (
								<div className='pl-4 text-rose-400 text-[1rem]'>
									{formik.errors.email}
								</div>
							)}
						</div>
						<div>
							<input
								id='phoneNumber'
								type='text'
								placeholder='Phone Number'
								className='light-input w-full text-[1rem]'
								{...formik.getFieldProps("phoneNumber")}
							/>
							{formik.errors?.phoneNumber && (
								<div className='pl-4 text-rose-400 text-[1rem]'>
									{formik.errors.phoneNumber}
								</div>
							)}
						</div>
						<div>
							<input
								id='password'
								type='password'
								placeholder='Password'
								className='light-input w-full text-[1rem]'
								{...formik.getFieldProps("password")}
							/>
							{formik.errors?.password && (
								<div className='pl-4 text-rose-400 text-[1rem]'>
									{formik.errors.password}
								</div>
							)}
						</div>
						<div>
							<input
								id='confirmPassword'
								type='password'
								placeholder='Confirm Password'
								className='light-input w-full text-[1rem]'
								{...formik.getFieldProps("confirmPassword")}
							/>
							{formik.errors?.confirmPassword && (
								<div className='pl-4 text-rose-400 text-[1rem]'>
									{formik.errors.confirmPassword}
								</div>
							)}
						</div>
						<div className='flex justify-end'>
							<button type='submit' className='btn-rev'>
								Register
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};
export default Signup;
