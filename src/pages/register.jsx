import { Button, Col, Form, Input, notification, Row } from "antd";
import './register.css'
import { register } from "../services/UserServices";
import {Link, useNavigate} from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';
const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const handleSubmit =async (event) =>{
         const result = await register(event);
         if(result.data){
            notification.success({
                title : "Đăng Kí Tài Khoản",
                message : "Đăng kí Tài Khoản Thành Công"
            })
            form.resetFields();
            navigate("/login");
         }else{
            notification.error({
                title : "Đăng Kí Tài Khoản",
                message : JSON.stringify(result.message)
            })
         }
    }
    return (
        <Row className="mt-20 flex-center"  gutter={[20,20]}>
            <Col span={24}><h1>Register</h1></Col>
            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
            <img className="register__image" src="./../../public/images/undraw_Agree_re_hor9.png"/>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
            <Form className="form" form={form} layout="vertical"
            onFinish={handleSubmit}
            >
                <h2>Form Register</h2>
                <Form.Item
                label="Full Name"
                name="fullName"
                rules={[{ 
                    required: true,
                    message : "Please Enter Full Name!"

                 }]}
                >
                 <Input/>
                </Form.Item>

                <Form.Item
                label="Email"
                name="email"
                rules={[{ 
                    required: true,
                    message : "Please Enter Email!"

                 }]}
                >
                 <Input/>
                </Form.Item>

                <Form.Item
                label="Password"
                name="password"
                rules={[{ 
                    required: true,
                    message : "Please Enter password!"

                 }]}
                >
                 <Input.Password/>
                </Form.Item>


                <Form.Item
                label="Phone Number"
                name="phone"
                rules={[{ 
                    required: true,
                    pattern: new RegExp(/(0[3|5|7|8|9])+([0-9]{8})\b/g),
                    message : "Please Enter Phone Number 10 character!"

                 }]}
                >
                 <Input/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" block onClick={()=> form.submit()} >Register</Button>
                </Form.Item>

                <Form.Item>
                    <div  className="flex-center">Đăng Nhập ngay:<Link to="/login" className="block">Register<RightOutlined /></Link></div>
                </Form.Item>
            </Form>
            </Col>
        </Row>
    )
}

export default RegisterPage;