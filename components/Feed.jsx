'use client';

import {useState,useEffect} from 'react';
import PromptCard from "./PropmtCard";

const PromptCardList = ({data,handleTagClick}) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => (
                <PromptCard key={post._id} post={post} handleTagClick={handleTagClick}/>
            ))}
        </div>
    )
}

const Feed = () => {
    const [posts,setPosts] = useState([]);

    const [searchText,setSearchText] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    const fetchPosts = async () => {
        const res = await fetch('/api/post');
        const data = await res.json();
        setPosts(data);
    }

    useEffect(() => {
        fetchPosts();
    },[]);

    const filterPosts = (searchText) => {
        const regex = new RegExp(searchText, "i");
        return posts.filter((p) => regex.test(p.creator.username) || regex.test(p.tag) || regex.test(p.post));
    }

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        setSearchTimeout(setTimeout(() => {
            const searchResult = filterPosts(e.target.value);
            setSearchedResults(searchResult);
        }, 500));
    }

    const handleTagClick = (tagName) => {
        setSearchText(tagName);

        const searchResult = filterPosts(tagName);
        setSearchedResults(searchResult);
    }

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>

            {
                searchText ? (
                    <PromptCardList
                        data={searchedResults}
                        handleTagClick={handleTagClick}
                    />
                ) : (
                    <PromptCardList
                        data={posts}
                        handleTagClick={handleTagClick}
                    />
                )
            }

        </section>
    );
};

export default Feed;
