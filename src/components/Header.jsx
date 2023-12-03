import { Flex, Image, useColorMode, Link, Avatar } from "@chakra-ui/react";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";
import { AiFillHome } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);

  return (
    <Flex justifyContent={"space-between"} mt={6} mb="12">
      {user && (
        <Link as={RouterLink} to="/">
          <AiFillHome size={24} />
        </Link>
      )}
      <Image
        cursor={"pointer"}
        alt="Logo"
        w={6}
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
      />
      {user && (
        <Link as={RouterLink} to={`/${user.username}`}>
          {user.profilePic && (
            <Avatar size="sm" name={user.name} src={user.profilePic} />
          )}
          {!user.profilePic && (
            <Avatar
              size="sm"
              name={user.name}
              src="https://bit.ly/broken-link"
            />
          )}
        </Link>
      )}
    </Flex>
  );
};

export default Header;
