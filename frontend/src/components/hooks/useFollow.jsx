import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const useFollow = () => {
	const queryClient = useQueryClient();

	const { mutate: follow, isPending } = useMutation({
		mutationFn: async (userId) => {
			try {
				const res= await axios.post(`/api/user/follow/${userId}`)
                const data=res.data
                if(data.error) throw new Error(data.error)

				return;
			} catch (error) {
				throw new Error(error.message);
			}
		},
		onSuccess: () => {
			Promise.all([
				queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] }),
				queryClient.invalidateQueries({ queryKey: ["authUser"] }),
			]);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return { follow, isPending };
};

export default useFollow;