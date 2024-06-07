import { useGetCategory } from "../../api/categories";

export default function CategoryDetails(props) {

    const { data, isLoading, error } = useGetCategory(1);

    console.log(data);


    return <p>category details</p>
}