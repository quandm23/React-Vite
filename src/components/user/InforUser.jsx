import { Drawer, notification } from "antd";
import './InforUser.css'
import { useEffect, useState } from "react";
import { UpdateFile, UpdateNewUser } from "../../services/UserServices";
function InforUser(props) {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const { open, setOpen, user,isRender } = props;

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const handeleChangeAvatar = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(event.target.files[0])
    }

    const handleSaveAvatar = async ()=>{
        // Đẩy file vào folder avatar
       const result = await UpdateFile(selectedFile,"avatar");
       if(result.data && result.data.fileUploaded){
           const data = {
            ...user,
            avatar : result.data.fileUploaded
           }

           // Update avatar user
           const rs = await UpdateNewUser(data);
           if(rs){
            setSelectedFile(undefined);
            setPreview(undefined);
            setOpen(false);
            isRender();
            notification.success({
                message : "Update Thành Công"
            })
           }else{
            notification.error({
                message : JSON.stringify(rs.message)
            })
           }
       }else{
    //    console.log(result)
       notification.error({
        message : JSON.stringify(result.message)
    })
       }
    }

    return (<><Drawer width={"40vw"} title="Information User" onClose={() => setOpen(false)} open={open}>
        {user && <><strong>ID:</strong><p>{user._id}</p>
            <div> <strong>FullName:</strong><p>{user.fullName}</p></div>
            <div> <strong>Email:</strong><p>{user.email}</p></div>
            <div> <strong>PhoneNumber:</strong><p>{user.phone}</p></div>
            <div>
                <strong>Avatar:</strong>
                <div><img src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`} /></div>
            </div>
            <label className="changeAvatar" htmlFor="changeAvater">Change Avatar</label>
            <input onChange={handeleChangeAvatar} type="file" id="changeAvater" className="hidden" />
            {preview && (<div>
                <strong>Avatar Change:</strong>
                <div><img src={`${preview}`} /></div> 
                <button className="changeAvatar" onClick={handleSaveAvatar}>Save</button>
                </div>

                )}</>

        }
    </Drawer></>)
}

export default InforUser;