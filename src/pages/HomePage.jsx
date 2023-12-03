import { Button, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import { IoPersonAddSharp } from "react-icons/io5";
import { Link, Link as RouterLink } from "react-router-dom";

const HomePage = () => {
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      setPosts([]);
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getFeedPosts();
  }, [showToast, setPosts]);

  return (
    <>
      {!loading && posts.length === 0 && (
        <Flex w={"full"} flexDirection={"column"} alignItems={"center"} gap={4}>
          <Link as={RouterLink} to={`/addfriends`}>
            <Flex
              w={"full"}
              flexDirection={"column"}
              alignItems={"center"}
              gap={4}
            >
              <h1>Follow some users to see the feeds.</h1>
              <Button gap={2}>
                <IoPersonAddSharp /> Add friends
              </Button>
            </Flex>
          </Link>
        </Flex>
      )}
      {loading && (
        <Flex justify="center">
          <Spinner size="xl" />
        </Flex>
      )}
      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          postedBy={post.postedBy}
          createdAt={post.createdAt}
        />
      ))}
    </>
  );
};

export default HomePage;
