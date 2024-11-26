import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import PeopleOutlineOutlined from '@mui/icons-material/PeopleOutlineOutlined'

/** @type {*} 
 * title for Appbar title
 * Icon is for Appbar icon
 * route for Appbar route
 * description for Appbar description
 * 
*/
const sidebarList = [
    {
      title: "Dashboard",
      Icon: DashboardOutlinedIcon,
      route: "/",
      description: "Overview App dashboard",
    },
    {
      title: "User",
      Icon: PeopleOutlineOutlined,
      route: "/user",
      description: "View all registered user",
    },
    {
      title: "User Detail",
      Icon: null,
      route: "/user/id",
      description: "View user detail",
    },
    {
      title: "Category",
      Icon: CategoryOutlinedIcon,
      route: "/category",
      description: "View all categories",
    },
    {
      title: "Create Category",
      Icon: null,
      route: "/category/new",
      description: "Create new category",
    },
    {
      title: "Edit Categroy",
      Icon: null,
      route: "/categroy/abc/edit",
      description: "Edit categroy",
    },
    
    {
      title: "Setting",
      Icon: SettingsApplicationsOutlinedIcon,
      route: "/setting",
      description: "Make change to your profile",
    },
    
    {
      title: "Login",
      Icon: null,
      route: "/login",
      description: "Login to your account",
    },

  ];

  export default sidebarList;