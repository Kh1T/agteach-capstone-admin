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
  const { data, isLoading } = useIsLoginQuery();

  useEffect(() => {
    if (data && !isLoading) {
      dispatch(checkLoginStatus(data.IsAuthenticated));
    }
  }, [data, dispatch, isLoading]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
