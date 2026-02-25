import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import { AuthProvider } from "./features/auth/context/auth.context";
import { PostContextProvider } from "./features/posts/context/post.context";
import "./features/shared/style/global.scss";

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <RouterProvider router={router} />
      </PostContextProvider>
    </AuthProvider>
  );
};

export default App;
