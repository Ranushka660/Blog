import { useEffect, useState, useContext } from "react";
import Posts from "../../components/posts/Posts";
import "./posts.css";
import axios from "axios";
import { useLocation } from "react-router";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
axios.defaults.headers.common['x-access-token'] = cookies.get('access_token')?cookies.get('access_token'):''; // for all requests

export default function PostsAll() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts_all" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <div className="home">
        <Posts posts={posts} />
      </div>
    </>
  );
}
