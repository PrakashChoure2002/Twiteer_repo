import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { POSTS } from "../../utils/db/dummy";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

const Posts = ({feedtype}) => {
	// const isLoading = false;
	const getPostEndpoint=()=>{
		switch(feedtype){
			case "for you":
				return "/api/post/allpost";
				case "following":
					return "/api/post/following";
					default:
						return "/api/post/allpost";
		}
	}

	const Post_ENDPOINT=getPostEndpoint()

	const {data:posts,isLoading,refetch,isRefetching}=useQuery({
		queryKey:["posts"],
		queryFn:async()=>{
			try {
				const res=await axios.get(Post_ENDPOINT)
				const data=res.data
				if(data.error){
					throw new Error(data.error || "something went wrong")
				}
				return data;
				
			} catch (error) {
				throw new Error(error)
				
			}
		}
	})

	useEffect(()=>{
		refetch();

	},[feedtype,refetch])

	return (
		<>
			{(isLoading || isRefetching )&& (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && !isRefetching && posts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading && posts && (
				<div>
					{posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;