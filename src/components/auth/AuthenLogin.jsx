import { useContext } from "react";
import { AuthContext } from "./Authen";
import { Button, Result } from "antd";

function AuthenLogin(props) {
    const { user } = useContext(AuthContext);
    {
        if (user && user.id) {
            return (
                <>
                    {props.children}
                </>)
        }
        return (<Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary">Login</Button>}
    />)
    }
}
export default AuthenLogin