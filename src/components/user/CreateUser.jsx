import { Button, Form, Input, Modal, notification } from "antd";
import './CreateUser.css'
import { useState } from "react";
import { CreateNewUser } from "../../services/UserServices";


function CreateUser(props) {
    const {isRender} = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();


    const handleSubmit = async (data) => {
        const result = await CreateNewUser(data);
        if (result.data) {
            form.resetFields();
            notification.success({
                message: 'Create User Seccessfully',
                showProgress: true,
            });
            setIsModalOpen(false);
            isRender();
        } else {
            notification.error({
                message: JSON.stringify(result.message),
                showProgress: true,
            })
        }
    }


    return (
        <>
            <div className="flex mt-20" >
                <h2>List User</h2>
                <Button onClick={() => setIsModalOpen(true)} type="primary" size="large">Create User</Button>

            </div>

                <Modal
                    open={isModalOpen}
                    onCancel={() => {
                        form.resetFields();
                        setIsModalOpen(false)
                    }}
                    okText="Create"
                    cancelText="Cancel"
                    okButtonProps={{
                        autoFocus: true,
                        htmlType: 'submit',
                    }}
                    destroyOnClose
                    modalRender={(dom) => (
                        <Form className="form"  onFinish={handleSubmit} form={form} >
                      {dom}
                        </Form>
                    )}
                >
                    <h2 className="center">Please Enter Form</h2>
                    <Form.Item
                        label="FullName"
                        labelCol={{ span: 24 }}
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your FullName!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        labelCol={{ span: 24 }}
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

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
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        labelCol={{ span: 24 }}
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Phone Number!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                </Modal>
        </>
    );
}

export default CreateUser;