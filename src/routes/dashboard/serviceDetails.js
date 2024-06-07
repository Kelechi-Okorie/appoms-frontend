import { useGetService } from "../../api/services";

export default function ServiceDetails(props) {

    const { data, isLoading, error } = useGetService(1);

    console.log(data);


    return <p>service details</p>
}