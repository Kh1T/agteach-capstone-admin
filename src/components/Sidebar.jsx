import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import {
  useLocation,
  Link as RouterLink,
  useParams,
  useNavigate,
} from "react-router-dom";

import logoIcon from "../assets/logo.svg";
import avtarChip from "../assets/avatar-chip.png";
import { Avatar, Chip, Container, Link, Stack } from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import sidebarList from "../data/sideBarData";
import { useLogoutMutation } from "../services/api/authApi";
import { useGetInfoQuery } from "../services/api/adminApi";

/**
 * Sidebar component that renders a drawer and app bar with content.
 *
 * This component accepts a children prop which is rendered between the app bar and drawer.
 * The app bar will render a title and description based on the route that is currently active.
 * The drawer will render a list of links based on the sidebarList data.
 *
 * @prop {React.ReactNode} children - The content to be rendered between the app bar and drawer.
 * @returns {React.ReactNode} A React component that renders a drawer and app bar with content.
 */
export default function Sidebar({ children }) {
  const { pathname } = useLocation();
  const drawerWidth = 250;
  const param = useParams();
  const head = sidebarList.find((element) => {
    if (param.productId) element.route = `/product/${param.productId}/edit`;
    if (param.courseId) element.route = `/course/${param.courseId}/edit`;
    if (element.route !== pathname) return false;
    return element.route === pathname;
  });
  const des = sidebarList.find((element) => element.route === pathname);
  const description = des && des.description;
  const headerTitle = head && head.title;

  const [logout, { isLoading, isError, error, isSuccess }] =
    useLogoutMutation();
  const nagivate = useNavigate();

  const handleLogout = async () => {
    await logout();
    if (isSuccess || !isLoading) nagivate("/login");
  };

  const { data } = useGetInfoQuery();
  let adminInfo = {};
  if (data) {
    adminInfo = data.data;
  }

  const drawerContent = (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          px: "20px",
          py: 5,
          borderRight: "dashed 1px lightgray",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Stack
        direction="column"
        sx={{
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <List>
          <Link component={RouterLink} to="/" underline="none">
            <Box
              component="img"
              sx={{
                ml: 2,
                height: 48,
                width: 38,
              }}
              alt="logo"
              src={logoIcon}
            />
          </Link>
          <Toolbar />
          {sidebarList.map(
            ({ title, Icon, route }, index) =>
              Icon && (
                <Link
                  component={RouterLink}
                  to={route}
                  key={title}
                  underline="none"
                  sx={{
                    "& .MuiListItem-root": {
                      backgroundColor:
                        route === pathname ? "purple.main" : "common.white",
                      borderRadius: 1,
                    },
                    "& .MuiTypography-root": {
                      color: route === pathname ? "common.white" : "dark.300",
                    },
                  }}
                >
                  <ListItem key={title} disablePadding>
                    <ListItemButton>
                      <Icon
                        sx={{
                          mr: "15px",
                          color:
                            route === pathname ? "common.white" : "dark.300",
                        }}
                      />
                      <Typography variant="bmdr">{title}</Typography>
                    </ListItemButton>
                  </ListItem>
                </Link>
              )
          )}
        </List>
      </Stack>

      <Box>
        <ListItemButton onClick={handleLogout}>
          <LogoutOutlinedIcon sx={{ color: "dark.300", mr: "20px" }} />
          <Typography variant="bmdr" sx={{ color: "dark.300" }}>
            Logout
          </Typography>
        </ListItemButton>
      </Box>
    </Drawer>
  );
  const appBarContent = (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        pt: 5,
        ml: `${drawerWidth}px`,
        backgroundColor: "common.white",
        color: "common.black",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            maxWidth: 1300,
            borderBottom: 1,
            borderBottomStyle: "dashed",
            borderColor: "grey.300",
          }}
        >
          <Stack
            direction="row"
            sx={{
              width: "100%",
              pb: 2,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Stack direction="column" spacing="2">
              <Typography variant="h3">{headerTitle && headerTitle}</Typography>
              <Typography variant="bsr" sx={{ color: "dark.300" }}>
                {description}
              </Typography>
            </Stack>
            <Chip
              avatar={<Avatar src={avtarChip} label="Avatar" />}
              label={adminInfo.username || "Admin"}
              sx={{
                height: "40px",
                borderRadius: "63px",
                backgroundColor: "common.black",
                "& .MuiChip-label": {
                  color: "common.white",
                  fontSize: 18,
                },
              }}
            />
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
  const childContent = (
    <Container
      maxWidth="1300px"
      sx={{
        mt: 20,
        maxWidth: "1300px",
      }}
    >
      {children}
    </Container>
  );
  const sideBarContent = (
    <Box sx={{ display: "flex" }}>
      {appBarContent}
      {drawerContent}
      {childContent}
    </Box>
  );
  return sideBarContent;
}
