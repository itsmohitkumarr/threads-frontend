import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";

const useGetFriendsProfile = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await fetch(`/api/users/getAllUsers`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const Users = await res.json();
        if (Users.error) {
          useShowToast("Error", Users.error, "error");
          return;
        }
        setUsers(Users);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getFriends();
  }, [showToast]);

  return { loading, users };
};

export default useGetFriendsProfile;
