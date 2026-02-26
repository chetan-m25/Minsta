import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import { AuthProvider } from "./features/auth/context/auth.context";
import { PostContextProvider } from "./features/posts/context/post.context";
import "./features/shared/style/global.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <ToastContainer
          position="top-right"
          autoClose={2200}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="system"
          toastStyle={{
            borderRadius: "14px",
            fontSize: "14px",
            backdropFilter: "blur(6px)",
          }}
        />
        <RouterProvider router={router} />
      </PostContextProvider>
    </AuthProvider>
  );
};

export default App;
