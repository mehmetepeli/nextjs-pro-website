"use client";

import {useState,useEffect} from 'react';
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
    const router = useRouter();
    const {data:session} = useSession();

    const [posts,setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = res.json();

            setPosts(data);
        }

        if(session?.user.id) fetchPosts();
    }, [])
    const handleEdit = (post) => {
        router.push(`update-post?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this post?");

        if(hasConfirmed) {
            try {
                await fetch(`api/post/${post._id.toString()}`, {
                    method: 'DELETE'
                });

                const filtered = posts.filter((p) => p._id !== post._id);

                setPosts(filtered);
            } catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <div>
            <Profile
                name="My"
                desc="Welcome to your personalized profile page"
                data={posts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </div>
    );
};

export default MyProfile;
