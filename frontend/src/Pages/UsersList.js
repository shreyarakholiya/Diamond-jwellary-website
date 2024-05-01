import { Button } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import MetaData from './MetaData';
import { DataGrid } from '@material-ui/data-grid';
import Sidebar from './Sidebar';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { getAllUsers, clearErrors, deleteUser } from "../actions/UserAction"
import { DELETE_USER_RESET } from '../constants/UserConstants';

const UsersList = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, users } = useSelector((state) => state.allUsers);

  const { error: deleteError, isDeleted } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("User DEleted successfully");
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, isDeleted]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.7 },
    { field: "email", headerName: "Email", maxWidth: 150, flex: 0.8 },
    { field: "name", headerName: "Name", maxWidth: 150, flex: 0.3 },
    {
      field: "role", headerName: "Role", maxWidth: 100, flex: 0.4,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin" ? "greenColor" : "redColor";
      }
    },
    {
      field: "actions", headerName: "Actions", minWidth: 120, flex: 0.3, type: "number", sortable: false,
      renderCell: (params) => {
        return (
          <div>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}><EditIcon /></Link>
            <Button onClick={() => deleteUserHandler(params.getValue(params.id, "id"))}><DeleteIcon /></Button>
          </div>
        )
      }
    }
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name
      })
    })

  return (
    <div>
      <MetaData title={`ALL USERS -Admin`} />
      <hr className='mb-0 pb-0' />

      <div className="row">
        <div className="col-lg-2  bg-dark ps-5">
          <Sidebar />
        </div>
        <div className="col-lg-10">
          <h1 className='text-center pt-2'>ALL USERS</h1>

          <DataGrid className='my-5 mx-5' rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
        </div>
      </div>

    </div>
  )
}

export default UsersList 