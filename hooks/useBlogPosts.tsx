import { PostInformationInterface } from "@/model/post.interface";
import PostRepository from "@/repository/posts.repository";

export default function useBlogPosts(): PostInformationInterface[] {
    return PostRepository.allInformation()
}
