import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom";

import logoIcon from "../assets/logo.svg";
import avtarChip from "../assets/baby-mummy.png";
import logoutIcon from "../assets/red-circle-logout.png";
import {
  Avatar,
  Container,
  Link,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SIDEBARROUTE from "../constants/sideBarConstant";
import { useLogoutMutation } from "../services/api/authApi";
import { useState } from "react";

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

  const appBarHeader = SIDEBARROUTE.find((element) => {
    if (element.route.includes("id")) {
      const dynamicPath = `/${pathname.split("/")[1]}/id`;
      if (element.route === dynamicPath) {
        return element.route === dynamicPath;
      }
    }
    return element.route === pathname;
  });
  const description = appBarHeader && appBarHeader.description;
  const headerTitle = appBarHeader && appBarHeader.title;

  const [logout, { isLoading, isSuccess }] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    if (isSuccess || !isLoading) navigate("/login");
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleNavigateSetting = () => {
    navigate("/setting");
  };

  const getActiveStyle = (route, pathname) => {
    // Special case for the dashboard route "/"
    if (route === "/") {
      return pathname === "/";
    }
    // Highlight routes that match the start of the pathname
    return pathname.startsWith(route);
  };

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
          {SIDEBARROUTE.map(
            ({ title, Icon, route }, index) =>
              Icon && (
                <Link
                  component={RouterLink}
                  to={route}
                  key={title}
                  underline="none"
                  sx={{
                    "& .MuiListItem-root": {
                      backgroundColor: getActiveStyle(route, pathname)
                        ? "purple.main"
                        : "common.white",
                      borderRadius: 1,
                    },
                    "& .MuiTypography-root": {
                      color: getActiveStyle(route, pathname)
                        ? "common.white"
                        : "dark.300",
                    },
                  }}
                >
                  <ListItem key={title} disablePadding>
                    <ListItemButton>
                      <Icon
                        sx={{
                          mr: "15px",
                          color: getActiveStyle(route, pathname)
                            ? "common.white"
                            : "dark.300",
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
        <ListItemButton onClick={handleClickOpen}>
          <LogoutOutlinedIcon sx={{ color: "dark.300", mr: "20px" }} />
          <Typography variant="bmdr" sx={{ color: "dark.300" }}>
            Logout
          </Typography>
        </ListItemButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent
            fullWidth
            sx={{
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={logoutIcon}
              height={100}
              width={100}
              m={5}
            ></Box>
            <DialogContentText
              id="alert-dialog-title"
              color="dark.500"
              variant="bmdsm"
              px={4}
            >
              Are you sure you want to logout?
            </DialogContentText>
          </DialogContent>
          <DialogActions
            fullWidth
            sx={{ justifyContent: "center", gap: "12px", pb: "16px" }}
          >
            <Button
              onClick={() => {
                handleLogout();
                handleClose();
              }}
              variant="contained"
              color="error"
              autoFocus
              sx={{ textTransform: "uppercase" }}
            >
              Logout
            </Button>
            <Button onClick={handleClose} variant="contained" color="grey.500" sx={{ textTransform: "uppercase" }}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
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
            <Button
              onClick={handleNavigateSetting}
              sx={(theme) => ({
                minWidth: "auto",
                p: 0.5,
                bgcolor: "common.white",
                width: "hug-content",
                borderRadius: "100%",
                border: "2px solid transparent",
                background: `linear-gradient(${theme.palette.common.white}, ${theme.palette.common.white}) padding-box, 
                 linear-gradient(to right, ${theme.palette.teal.main}, ${theme.palette.blue.main}) border-box`,
                backgroundClip: "padding-box, border-box",
              })}
            >
              <Avatar src={avtarChip} sx={{ width: 35, height: 35 }} />
            </Button>
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
