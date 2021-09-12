import { useEffect, useState, useContext } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
axios.defaults.headers.common['x-access-token'] = cookies.get('access_token')?cookies.get('access_token'):''; // for all requests

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
      </div>
    </>
  );
}
