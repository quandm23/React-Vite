import { Button, Form, Input, Modal, notification, Tag } from "antd";
import './CreateUser.css'
import { useEffect, useState } from "react";
import {UpdateNewUser} from './../../services/UserServices'

function UpdateUser(props) {
    const {isModalOpenUpdate ,setIsModalOpenUpdate,userChange,isRender} = props;
    const [dataUserNew , setUserNew] = useState(userChange);
    const [form] = Form.useForm();
 
    useEffect(()=>{
        setUserNew(userChange);
    },[userChange])

    const handleSubmit = async (data) =>{

        const result = await UpdateNewUser(dataUserNew);
        if (result.data) {
            form.resetFields();
            notification.success({
                message: 'Update User Seccessfully',
                showProgress: true,
            });
            setIsModalOpenUpdate(false);
            isRender();
        } else {
            notification.error({
                message: JSON.stringify(result.message),
                showProgress: true,
            })
        }
    }
 const handeleChange = (data)=>{
    // let rowNew = data.target.id;
    const dataChange = {
        ...dataUserNew,
        [data.target.id] : data.target.value
    }
    setUserNew(dataChange);
 }
 console.log(dataUserNew);
 
    return (
        <>
           {userChange &&  <Modal
                open={isModalOpenUpdate}
                onCancel={() => {
                    form.resetFields();
                    setIsModalOpenUpdate(false)
                }}
                okText="Update"
                cancelText="Cancel"
                okButtonProps={{
                    autoFocus: true,
                    htmlType: 'submit',
                }}
                destroyOnClose
                modalRender={(dom) => (
                    <Form className="form" onFinish={handleSubmit} form={form} onChange={handeleChange} >
                        {dom}
                    </Form>
                )}
            >
                <h2 className="center">Please Enter Form Update</h2>
                <Form.Item
                    label="ID"
                    labelCol={{ span: 24 }}
                    name="_id"
                // rules={[
                //     {
                //         required: true,
                //         message: 'Please change your Email!',
                //     },
                // ]}
                >
                    <Input defaultValue={userChange._id} disabled />
                </Form.Item>

                <Form.Item
                    label="FullName"
                    labelCol={{ span: 24 }}
                    name="fullName"
                // rules={[
                //     {
                //         required: true,
                //         message: 'Please change your FullName!',
                //     },
                // ]}
                >
                    <Input defaultValue={userChange.fullName} />
                </Form.Item>

                {/* 
                <Form.Item
                    label="Password"
                    labelCol={{ span: 24 }}
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input.password defaultValue={user.password} />
                </Form.Item> */}

                <Form.Item
                    label="Phone Number"
                    labelCol={{ span: 24 }}
                    name="phone"
                // rules={[
                //     {
                //         required: true,
                //         message: 'Please input your Phone Number!',
                //     },
                // ]}
                >
                    <Input defaultValue={userChange.phone} />
                </Form.Item>

            </Modal>}
        </>
    );
}

export default UpdateUser;