import { Container } from "@chakra-ui/react";
import Header from "./components/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import CreatePost from "./components/CreatePost";
import AddFriendsPage from "./pages/AddFriendsPage";

function App() {
  const user = useRecoilValue(userAtom);
  return (
    <Container maxW="620px" h={"100vh"}>
      <Header />
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route
          path="/update"
          element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />}
        />

        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:pid" element={<PostPage />} />
        <Route path="/addfriends" element={<AddFriendsPage />} />
      </Routes>
      {user && <CreatePost />}
    </Container>
  );
}

export default App;
