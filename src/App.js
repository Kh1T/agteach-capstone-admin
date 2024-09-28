import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";
import { RouterProvider } from "react-router-dom";
import { router } from "./route";
import { CssBaseline } from "@mui/material";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkLoginStatus } from "./feature/slice/authSlice";
import { useIsLoginQuery } from "./services/api/authApi";

function App() {
  const dispatch = useDispatch();
  const { data } = useIsLoginQuery();

  useEffect(() => {
    if (data) {
      dispatch(checkLoginStatus(data.IsAuthenticated));
      console.log(data);
    }
  }, [data, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
