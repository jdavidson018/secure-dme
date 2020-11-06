/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import ShoppingCartSharpIcon from '@material-ui/icons/ShoppingCartSharp';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import BubbleChart from "@material-ui/icons/BubbleChart";
// import LocationOn from "@material-ui/icons/LocationOn";
// import Notifications from "@material-ui/icons/Notifications";
// import Unarchive from "@material-ui/icons/Unarchive";
// import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
// import Typography from "views/Typography/Typography.js";
// import Icons from "views/Icons/Icons.js";
// import Maps from "views/Maps/Maps.js";
// import NotificationsPage from "views/Notifications/Notifications.js";
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import LoginButton from "components/Login/LoginButton";
import MainForm from "views/Form/MainForm";


export const unAuthorizedRoutes = [
  {
    path: "/login",
    name: "Login",
    rtlName: "",
    icon: "",
    component: LoginButton,
    layout: "/admin"
  }
]

export const clientRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/form",
    name: "Form",
    rtlName: "",
    icon: FormatAlignJustifyIcon,
    component: MainForm,
    layout: "/admin"
  },
  {
    path: "/dispenses",
    name: "Dispenses",
    rtlName: "",
    icon: ExitToAppIcon,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/physicians",
    name: "Physicians",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/inventory",
    name: "Inventory",
    icon: ShoppingCartSharpIcon,
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Testing",
    icon: "content_paste",
    component: DashboardPage,
    layout: "/admin"
  },
];

export const providerRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/form",
    name: "clients",
    rtlName: "",
    icon: "",
    component: MainForm,
    layout: "/admin"
  },
];

export const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/form",
    name: "Form",
    rtlName: "",
    icon: "",
    component: MainForm,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Order History",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Inventory",
    icon: "content_paste",
    component: TableList,
    layout: "/admin"
  },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin"
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // }
];
