import { Drawer } from "antd";
import './InforBook.css'
function InforBook(props){
const {isOpenInfor, setIsOpenInfor,userProps, setUserProps} = props;

return (
    <>
      {userProps && 
      (
        <Drawer title="Infor Book" onClose={()=> setIsOpenInfor(false)} open={isOpenInfor}>
        <div><strong>ID:</strong><span>{userProps._id}</span></div>
        <div><strong>Tiêu Đề:</strong><span>{userProps.mainText}</span></div>
        <div><strong>Tác Giả:</strong><span>{userProps.author}</span></div>
        <div><strong>Thể Loại:</strong><span>{userProps.category}</span></div>
        <div><strong>Giá Tiền:</strong><span>{userProps.price}</span></div>
        <div><strong>Số Lượng Tồn Kho:</strong><span>{userProps.quantity}</span></div>
        <div><strong>Đã Bán:</strong><span>{userProps.sold}</span></div>
        <div><strong>Ảnh</strong></div>
        <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${userProps.thumbnail}`} />

      
      </Drawer>
      )}
    </>
  );
}
export default InforBook;