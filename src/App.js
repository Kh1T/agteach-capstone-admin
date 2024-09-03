import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";
import { RouterProvider } from "react-router-dom";
import { router } from "./route";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
