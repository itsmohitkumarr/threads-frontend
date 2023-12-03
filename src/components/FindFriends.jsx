import { Avatar, Button, Divider, Flex, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link } from "react-router-dom";

const FindFriends = ({ user, index, array }) => {
  const [updating, setUpdating] = useState(false);
  const showToast = useShowToast();
  const currentUser = useRecoilValue(userAtom);
  const [following, setFollowing] = useState(
    user.followers.includes(currentUser?._id)
  );

  const handleFollowUnfollow = async () => {
    if (!currentUser) {
      showToast("Error", "Please login to follow", "error");
      return;
    }
    if (updating) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      if (following) {
        showToast("Success", `Unfollowed ${user.name}`, "success");
        user.followers.pop();
      } else {
        showToast("Success", `Followed ${user.name}`, "success");
        user.followers.push(currentUser?._id);
      }
      setFollowing(!following);
      //   console.log(data);
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      <Flex m={4} justifyContent={"space-between"}>
        <Link to={`/${user.username}`}>
          <Flex w={"full"} alignItems={"center"} gap={3}>
            <Avatar src={user.profilePic} size={"lg"} name="Mark Zuckerberg" />
            <Flex flexDirection={"column"}>
              <Flex>
                <Text fontSize={"lg"} fontWeight={"bold"}>
                  {user.name}
                </Text>
                <Image src="/verified.png" w={4} h={4} ml={2} mt={2} />
              </Flex>
              <Text fontSize={"sm"} fontWeight={"medium"}>
                {user.username}
              </Text>
            </Flex>
          </Flex>
        </Link>
        <Button
          size={"sm"}
          mt={4}
          onClick={() => handleFollowUnfollow(user)}
          isLoading={updating}
        >
          {following ? "Unfollow" : "Follow"}
        </Button>
      </Flex>
      {index !== array.length - 1 && <Divider />}
    </>
  );
};

export default FindFriends;
