'use client';

import {useState} from 'react';
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

import Form from '@components/Form';

const CreatePost = () => {
    const router = useRouter();
    const {data:session} = useSession();

    const [submitting,setSubmitting] = useState(false);
    const [post,setPost] = useState({
        post: '',
        tag: '',
    });

    const handleCreatePost = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch('/api/post/new', {
                method: 'POST',
                body: JSON.stringify({
                    post: post.post,
                    userId: session?.user.id,
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
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={handleCreatePost}
        />
    );
};

export default CreatePost;
