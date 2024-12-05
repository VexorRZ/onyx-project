/* eslint-disable multiline-ternary */
import React from "react";

import {
  BrowserRouter as Routing,
  Route,
  Routes as Routers,
} from "react-router-dom";
import { PublicRoutes, PrivateRoutes } from "./index";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import DashBoard from "../Pages/Dashboard";
import ForgotPassword from "../Pages/ForgotPassword";
import Group from "../Pages/Group";
import Topic from "../Pages/Topic";
import Profile from "../Pages/Profile";
import CreateGroup from "../Pages/CreateGroup";
import ResetPassword from "../Pages/ResetPassword";
import UserGroups from "../Pages/UserGroups";
import Users from "../Pages/Users";
import GroupMembers from "../Pages/GroupMembers";
import GroupAdms from "../Pages/GroupAdms";
import GroupDescription from "../Pages/GroupDescription";
import GroupRules from "../Pages/GroupRules";
import { GroupProvider } from "../Contexts/GroupContext";
import { GroupMembersProvider } from "../Contexts/GroupContentContext";
import { UsersProvider } from "../Contexts/UsersContext";

const Routes = () => {
  return (
    <div>
      <Routing>
        <Routers>
          <Route
            path="/sign-up"
            element={
              <PublicRoutes>
                <SignUp />
              </PublicRoutes>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoutes>
                <ForgotPassword />
              </PublicRoutes>
            }
          />
          <Route
            path="/reset_password/:token"
            element={
              <PublicRoutes>
                <ResetPassword />
              </PublicRoutes>
            }
          />
          <Route
            path="/"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoutes>
                <GroupProvider>
                  <DashBoard />
                </GroupProvider>
              </PrivateRoutes>
            }
          />
          <Route
            path="/group/:group_id"
            element={
              <GroupProvider>
                <GroupMembersProvider>
                  <PrivateRoutes>
                    <Group />
                  </PrivateRoutes>
                </GroupMembersProvider>
              </GroupProvider>
            }
          />
          <Route
            path="/group/:group_id/members"
            element={
              <GroupProvider>
                <GroupMembersProvider>
                  <PrivateRoutes>
                    <GroupMembers />
                  </PrivateRoutes>
                </GroupMembersProvider>
              </GroupProvider>
            }
          />
          <Route
            path="/group/:group_id/adms"
            element={
              <GroupProvider>
                <PrivateRoutes>
                  <GroupAdms />
                </PrivateRoutes>
              </GroupProvider>
            }
          />
          <Route
            path="/group/:group_id/info"
            element={
              <GroupProvider>
                <PrivateRoutes>
                  <GroupDescription />
                </PrivateRoutes>
              </GroupProvider>
            }
          />
          <Route
            path="/group/:group_id/rules"
            element={
              <GroupProvider>
                <PrivateRoutes>
                  <GroupRules />
                </PrivateRoutes>
              </GroupProvider>
            }
          />
          <Route
            path="/topics/:group_id/:topic_id"
            element={
              <GroupProvider>
                <PrivateRoutes>
                  <Topic />
                </PrivateRoutes>
              </GroupProvider>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoutes>
                <Profile />
              </PrivateRoutes>
            }
          />
          <Route
            path="/create-group"
            element={
              <GroupProvider>
                <PrivateRoutes>
                  <CreateGroup />
                </PrivateRoutes>
              </GroupProvider>
            }
          />
          <Route
            path="/user-groups"
            element={
              <GroupProvider>
                <PrivateRoutes>
                  <UserGroups />
                </PrivateRoutes>
              </GroupProvider>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoutes>
                <UsersProvider>
                  <Users />
                </UsersProvider>
              </PrivateRoutes>
            }
          />
        </Routers>
      </Routing>
    </div>
  );
};

export default Routes;
