import { Button, Popconfirm, notification, Table, Tag } from "antd";
import CreateUser from "./CreateUser";
import { useState, useEffect } from "react";
import { DeleteUser, GetAllUser } from './../../services/UserServices'
import UpdateUser from "./UpdateUser";
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import InforUser from "./InforUser";

function UserList() {
  const [dataUser, setDataUser] = useState();
  const [userChange, setUserChange] = useState();
  const [render, setRender] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [open, setOpen] = useState(false);

  //Pagin
  const [current,setCurrent] = useState(1);
  const [pageSize,setPageSize] = useState(10);
  const [total,setTotal] = useState(0);
  total

  const fet = async () => {
    const result = await GetAllUser(current,pageSize);
    setDataUser(result.data.result.reverse());
    setCurrent(result.data.meta.current);
    setPageSize(result.data.meta.pageSize);
    setTotal(result.data.meta.total);
  }

  useEffect(() => {
    fet();
  }, [isModalOpenUpdate, render, userChange,current,pageSize]);

  const isRender = () => {
    setRender(!render);
  }

  const handleDelete = async (id) => {
    const result = await DeleteUser(id);
    if (result.statusCode === 200) {
      notification.success({
        message: 'Delete User Seccessfully',
        showProgress: true,
      });
      isRender();
    } else {
      notification.error({
        message: JSON.stringify(result.message),
        showProgress: true,
      })
    }
  }

  const onChange = (pagination) => {
         setCurrent(pagination.current);
         setPageSize(pagination.pageSize);
   };
  const columns = [
    {
      title: 'ID',
      key: "_id",
      render: (_, record) => (<>
        <Button type="link" onClick={() => {
          setOpen(true);
          setUserChange(record)
        }
        } >{record._id}</Button>
      </>)
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (<>
        <Tag className="mt-20" onClick={() => {
          setUserChange(record);
          setIsModalOpenUpdate(true);
        }
        } bordered={false} color="warning">
          <UploadOutlined size="large" style={{ fontSize: '18px' }} />
        </Tag>

        <Popconfirm title="Delete the User"
          description="Are you sure to delete this User?"
          okText="Yes"
          placement="leftBottom"
          cancelText="No" onConfirm={() => handleDelete(record._id)}>
          <Tag className="mt-20" bordered={false} color="error">
            <DeleteOutlined style={{ fontSize: '18px' }} />
          </Tag>
        </Popconfirm>
      </>)
    }
  ];

  return (
    <>
      <CreateUser isRender={isRender} />
      <Table dataSource={dataUser} columns={columns} pagination={
        {
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          itemRender : (_, type, originalElement) => {
            if (type === 'prev') {
              return <a>Previous</a>;
            }
            if (type === 'next') {
              return <a>Next</a>;
            }
            return originalElement;
          },
         
        }
  
      }
      onChange={onChange}
      />;

      <UpdateUser isRender={isRender} isModalOpenUpdate={isModalOpenUpdate} setIsModalOpenUpdate={setIsModalOpenUpdate} userChange={userChange} />
      <InforUser open={open} setOpen={setOpen} user={userChange} isRender={isRender} />
    </>
  );
}

export default UserList;