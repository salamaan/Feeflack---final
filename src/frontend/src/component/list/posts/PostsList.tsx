import React, {useState} from "react";
import ItemsList from "../ItemsList";
import {Page, Pageable} from "../../../model/data/Page";
import {Post} from "../../../model/entity/Post";
import "./PostsList.css"
import {PaginationService} from "../../../service/util/PaginationService";
import PostMapper from "../../util/mapper/PostMapper";
import {PostService} from "../../../service/entity/PostService";

interface PostsListProps {
    loadPosts: (pageable: Pageable) => Promise<Page<Post>>;
}

const PostsList = (props: PostsListProps) => {
    const [posts, setPosts] = useState<Page<Post>>(PaginationService.getDefaultPage<Post>());

    const {
        loadPosts
    } = props;

    const setIsLikedByIssuer = (isLiking: boolean, postId: string) => {
        let newLikesCount = {...posts.content.filter(post => post.id === postId).at(0)}.likesCount;

        if (isLiking) {
            newLikesCount! += 1;
        } else {
            newLikesCount! -= 1;
        }

        setPosts(prev => {
            const newContent = posts.content.map(post =>
                post.id === postId
                    ? {...post, isLikedByIssuer: isLiking, likesCount: newLikesCount!}
                    : post
            )

            return {...prev, content: newContent};
        })
    };

    const deleteHandler = (postId: string) => {
        PostService.deletePost(postId).then(() => setPosts(prev => {
                const newContent = posts.content.filter(post => post.id !== postId);
                return {...prev, content: newContent};
            })
        )
    }

    const mapPost = (post: Post) => {
        return <PostMapper
            post={post}
            setIsLikedByIssuer={(isLiking: boolean) => setIsLikedByIssuer(isLiking, post.id)}
            deletePost={deleteHandler}
        />
    }

    return <ItemsList
        loadItems={loadPosts}
        mapItem={mapPost}
        items={posts}
        setItems={setPosts}
    />
}

export default PostsList;
