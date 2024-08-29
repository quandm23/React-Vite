import { Button, Flex, Form, Input, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import './CreateBook.css'
import { createBoook, uploadFile } from "../../services/BookServices";

function CreateBook(props) {
  const {setRender,render} = props;
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = e => {
    console.log("run");
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])
  }

  const handleCancel = () => {
    form.resetFields();
    setSelectedFile(undefined);
    setPreview(undefined); 
    setOpenModal(false);
  }
  
  const handleSubmit = async (data) => {
   if(data.thumbnail){
    const file = await uploadFile("book",selectedFile);
    if(file){
      const dataNew = {
        ...data,
        price : parseInt(data.price),
        quantity : parseInt(data.quantity),
        thumbnail : file.data.fileUploaded
      }
    // console.log(dataNew)
      const result = await createBoook(dataNew);
      if(result && result.data){
        form.resetFields();
        setSelectedFile(undefined);
        // setPreview(undefined); 
        setOpenModal(false);
        setRender(!render)
        notification.success({
          message : "Create Book",
          description : "Create thành công"
        })
  
      }else{
        notification.error({
          message : "Create Book",
          description : JSON.stringify(result.message)
        })
      }  
    }
   }else{
    notification.error({
      message : "Create Book",
      description : "Please nhập Image"
    })
   }
    setLoading(false);
  }


  return (
    <>

      <Flex className="mt-20" justify="space-between" align="center">
        <h1>List Book Management</h1>
        <Button type="primary" size="large" onClick={() => setOpenModal(true)}>Create Book</Button>
      </Flex>

      <Modal
        open={openModal}
        title="Input form Book"
        onCancel={handleCancel}
        footer={[]}

      >
        <Form layout="vertical" form={form} onFinish={handleSubmit} className="over">
          <Form.Item
            label="Tiêu đề"
            name="mainText"
            rules={[
              {
                required: true,
                message: 'Please input Tiêu đề!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tác Giả"
            name="author"
            rules={[
              {
                required: true,
                message: 'Please input Tác Giả!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá Tiền"
            name="price"
            rules={[
              {
                required: true,
                message: 'Please input Price!',
              },
            ]}
          >
            <Input type="Number"  />
          </Form.Item>

          <Form.Item
            label="Số Lượng"
            name="quantity"
            rules={[
              {
                required: true,
                message: 'Please input Số Lượng!',
              },
            ]}
          >
            <Input type="Number" />
          </Form.Item>

          <Form.Item
            label="Thể Loại"
            name="category"
            rules={[
              {
                required: true,
                message: 'Please input Thể Loại!',
              },
            ]}
          >
            <Select
              // defaultValue="Arts"
              options={[
                { value: 'Arts', label: 'Arts' },
                { value: 'Business', label: 'Business' },
                { value: 'Comics', label: 'Comics' },
                { value: 'Cooking', label: 'Cooking' },
                { value: 'Entertainment', label: 'Entertainment' },
                { value: 'History', label: 'History' },
                { value: 'Music', label: 'Music' },
                { value: 'Sports', label: 'Sports' },
                { value: 'Teen', label: 'Teen' },
                { value: 'Travel', label: 'Travel' },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Upload Ảnh"
            name="thumbnail"
            htmlFor="thumbnailupdate"
            className="changeAvatar"
          >
            <Input type="file" style={{ display: "none" }} onChange={onSelectFile} id="thumbnailupdate" />
          </Form.Item>

          {preview && <Form.Item>
            <img src={preview} />
          </Form.Item>}

          <Form.Item>
            <Button type="primary" loading={loading} block htmlType="submit" onClick={()=> setLoading(true)}>Create Book</Button>
          </Form.Item>


        </Form>
      </Modal>
    </>
  );
}
export default CreateBook;