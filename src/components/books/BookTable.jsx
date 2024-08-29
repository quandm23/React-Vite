import { Button, message, notification, Popconfirm, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { DeleteBoook, getBooks } from "../../services/BookServices";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import InforBook from "./InforBook";
import UpdateBook from "./UpdateBook";
function BookTable(props) {
    // Data Book 
    const [dataBook, setDataBook] = useState();
    const [isOpenInfor, setIsOpenInfor] = useState(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [userProps, setUserProps] = useState();


    // Pagi
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const {render,setRender} = props;
    // Render 
    useEffect(() => {
        const fet = async () => {
            const result = await getBooks(current, pageSize);
            setDataBook(result.data.result);
            setCurrent(result.data.meta.current);
            setPageSize(result.data.meta.pageSize);
            setPageSize(result.data.meta.pageSize);
            setTotal(result.data.meta.total);
        }
        fet();
    }, [current, pageSize,render]);

    // Onchage Pagi
    const handleChangePagination = (event) => {
        setCurrent(event.current);
        setPageSize(parseInt(event.pageSize))
    }

    const handleInfor = (user)=>{
        setIsOpenInfor(true);
        setUserProps(user);
    }

    const handleUpdate = (user)=>{
        // console.log(user)
        setIsOpenUpdate(true);
        setUserProps(user);
    }

    const handleDelete = async (user)=>{
       const result = await DeleteBoook(user._id);
       if(result && result.data){
        setRender(!render)
        message.open({
            type: 'success',
            content: 'Delete Thành Công',
          })
       }else{
        notification.error({
             message : "Create Book",
      description : JSON.stringify(result.message)
        })
       }
    }

    const columns = [
        {
            title: <Button type="link" >ID</Button>,
            dataIndex: '_id',
            key: '_id',
            render: (_, record) => <Button type="link" onClick={()=>{handleInfor(record)}}>{record._id}</Button>,

        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
            key: 'mainText',
        },
        {
            title: 'Tác Giả',
            dataIndex: 'author',
            key: 'author',
            render: (_, record) => <Tag color="success">{record.author}</Tag>
        }, {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(record.price)

        }, {
            title: 'Tồn Kho',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Hành Động',
            // dataIndex: 'action',
            key: 'action',
            render: (_, record) => (<><Tag color="warning" onClick={()=>handleUpdate(record)}><EditOutlined style={{ fontSize: '18px' }} /></Tag>
                <Popconfirm title="Delete the Book"
                    description="Are you sure to delete this Book?" placement="topLeft" onConfirm={()=>handleDelete(record)} ><Tag color="error"><DeleteOutlined style={{ fontSize: '18px' }} /></Tag></Popconfirm>
            </>)

        },
    ];

    return (<>
        <Table dataSource={dataBook} onChange={handleChangePagination} columns={columns} pagination={{
            total: total,
            showSizeChanger: true,
            // showTotal:{(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            current: current,
            pageSize: pageSize
        }} />
        <InforBook isOpenInfor={isOpenInfor} setIsOpenInfor={setIsOpenInfor} userProps={userProps} setUserProps={setUserProps} />
        <UpdateBook isOpenUpdate={isOpenUpdate} setIsOpenUpdate={setIsOpenUpdate} userProps={userProps} setUserProps={setUserProps} render={render} setRender={setRender}/> 
    </>

    );
}
export default BookTable;