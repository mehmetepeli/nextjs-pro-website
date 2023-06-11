'use client';

import {useState,useEffect} from 'react';
import {useRouter,useSearchParams} from "next/navigation";

import Form from '@components/Form';

const UpdatePost = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const postId = searchParams.get('id');

    const [submitting,setSubmitting] = useState(false);
    const [post,setPost] = useState({
        post: '',
        tag: '',
    });

    useEffect(() => {
        const getPostDetails = async () => {
            const res = await fetch(`/api/post/${postId}`);
            const data = await res.json();

            setPost({
                post: data.post,
                tag: data.post
            })
        }

        if(postId) getPostDetails();
    },[postId]);

    const handleUpdatePost = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if(!postId) return alert('Missing Post ID');

        try {
            const res = await fetch(`/api/post/${postId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    post: post.post,
                    tag: post.tag,
                }),
            });

            if(res.ok) {
                router.push('/');
            }
        } catch (e) {
            console.log(e);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={handleUpdatePost}
        />
    );
};

export default UpdatePost;
