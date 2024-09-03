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
      description: "Overview intructor dashboard",
    },
    {
      title: "User",
      Icon: PeopleOutlineOutlined,
      route: "/user",
      description: "View or List more courses",
    },
    {
      title: "UserDetail",
      Icon: null,
      route: "/course/new",
      description: "Create new courses for your portfolio",
    },
    {
      title: "Category",
      Icon: CategoryOutlinedIcon,
      route: "/category",
      description: "View or List more products",
    },
    {
      title: "Create Categroy",
      Icon: null,
      route: "/category/new",
      description: "Create new product for your porfolio",
    },
    {
      title: "Edit Categroy",
      Icon: null,
      route: "/categroy/abc/edit",
      description: "Edit categroy for your porfolio",
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