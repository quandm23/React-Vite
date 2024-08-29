import { Button, Col, Form, Input, notification, Row } from "antd";
import './register.css'
import { RightOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/UserServices";
import { useContext } from "react";
import { AuthContext } from "../components/auth/Authen";
const LoginPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        // console.log(event);
        const result = await login(event);
        if (result.data) {
            notification.success({
                message: "Đăng nhập Tài Khoản Thành Công"
            })
            localStorage.setItem("access_token",result.data.access_token);
            setUser(result.data.user);
               form.resetFields();
            navigate("/");
        } else {
            notification.error({
                message: JSON.stringify(result.message)
            })
        }
    }
    return (
        <div>
            <Row className="mt-20 flex-center" gutter={[20, 20]}>
                <Col span={24}>
                    <h1>Login</h1>
                </Col>
                <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                    <img className="register__image" src="./../../public/images/undraw_Fingerprint_login_re_t71l.png" />
                </Col>

                <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                    <Form className="form" form={form} layout="vertical"
                        onFinish={handleSubmit}
                    >
                        <h2>Form Login</h2>
                        <Form.Item
                            label="Email"
                            name="username"
                            rules={[{
                                required: true,
                                message: "Please Enter Email!"

                            }]}
                        >
                            <Input />
                        </Form.Item>



                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{
                                required: true,
                                message: "Please Enter password!"

                            }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" block onClick={() => form.submit()} >Login</Button>
                        </Form.Item>
                        <Form.Item>
                            <div className="flex-center">Đăng kí ngay:<Link to="/register" className="block">Register<RightOutlined /></Link></div>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default LoginPage;