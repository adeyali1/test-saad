import { useEffect } from "react";
import { useFormikContext } from "formik";
import { IUserProduct } from "../../models/user-product";

interface Props {
	dispatch: (userProduct: IUserProduct) => void;
}

const FormikContextChild = ({ dispatch }: Props) => {
	const { values: userProduct }: any = useFormikContext();
	useEffect(() => {
		dispatch(userProduct);
	}, [userProduct.products]);
	return <></>;
};

export default FormikContextChild;
