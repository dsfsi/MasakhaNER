import React from "react";
import AdminSideBar from "../../components/admin/AdminSideBar";

import {fetchUtils, Admin, Resource } from "react-admin";
import UserList from "../../components/admin/UserList";
import CreateUser from "../../components/admin/CreateUser";
import UserEdit from "../../components/admin/UserEdit";
import { Input } from "../../components/input/Input";
import simpleRestProvider from 'ra-data-simple-rest';
import axios from "axios";

export default function AdminUser() {

  const fetchJson = (url: string, options: any = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers.set('x-access-token', localStorage.getItem("token"));
    return fetchUtils.fetchJson(url, options);
}
  
  return (
      <Admin dataProvider={simpleRestProvider("http://localhost:3000", fetchJson)}>
        <Resource 
          name="users" 
          list={UserList} 
          create = {CreateUser} 
          edit = {UserEdit}
        />
        <Resource name="dashboard" list={Input} />
      </Admin>
  );
}
