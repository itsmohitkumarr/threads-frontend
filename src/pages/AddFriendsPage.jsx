import { Flex, Spinner } from "@chakra-ui/react";
import useGetFriendsProfile from "../hooks/useGetFriendsProfile";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import FindFriends from "../components/FindFriends";

const AddFriendsPage = () => {
  const { loading, users } = useGetFriendsProfile();
  const currentUser = useRecoilValue(userAtom);

  return (
    <>
      {loading && (
        <Flex justify="center">
          <Spinner size="xl" />
        </Flex>
      )}
      {users
        .filter((user) => currentUser?._id !== user._id)
        .map((user, index, array) => (
          <FindFriends key={user._id} user={user} index={index} array={array} />
        ))}
    </>
  );
};

export default AddFriendsPage;
