import { Button, Form, Input, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { updateBoook, uploadFile } from "../../services/BookServices";

function UpdateBook(props) {
    const { isOpenUpdate, setIsOpenUpdate, userProps, setUserProps, setRender, render } = props;
    const [form] = Form.useForm();

    const [selectedFileUpdate, setselectedFileUpdate] = useState();
    const [previewUpdate, setpreviewUpdate] = useState();

    const handleCancel = () => {
        form.resetFields();
        // setselectedFileUpdate(undefined);
        setIsOpenUpdate(false);
        setUserProps(undefined);
        setselectedFileUpdate(undefined);
    }

    useEffect(() => {
        if (userProps) {
            form.setFieldsValue({
                mainText: userProps.mainText || '',  // Nếu thiếu giá trị sẽ mặc định là chuỗi rỗng
                author: userProps.author || '',
                price: userProps.price || 0, // Có thể đặt giá trị mặc định là 0 nếu price undefined
                quantity: userProps.quantity || 1, // Có thể đặt giá trị mặc định là 1 nếu quantity undefined
                category: userProps.category || '',
                // thumbnail: userProps.thumbnail ? [`${import.meta.env.VITE_BACKEND_URL}/images/book/${userProps.thumbnail}`] : []
            });
            const img = document.querySelector("#thumbnail-view");
            img.src = `${import.meta.env.VITE_BACKEND_URL}/images/book/${userProps.thumbnail}`;
            img.style.display = "block";
        }
    }, [userProps]);

    useEffect(() => {
        if (!selectedFileUpdate) {
            setpreviewUpdate(undefined);
            return
        }

        const objectUrl = URL.createObjectURL(selectedFileUpdate)
        setpreviewUpdate(objectUrl);
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFileUpdate])

    const onSelectFileUpload = e => {
        console.log("run 2");
        if (!e.target.files || e.target.files.length === 0) {
            setselectedFileUpdate(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setselectedFileUpdate(e.target.files[0])
    }

    const handleSubmit = async (data) => {
        console.log(data);
        if (data.thumbnail) {
            const image = await uploadFile("book", selectedFileUpdate);
            if (image && image.data) {
                const dataNew = {
                    ...data,
                    price: parseInt(data.price),
                    quantity: parseInt(data.quantity),
                    _id: userProps._id,
                    thumbnail: image.data.fileUploaded
                }
                const result = await updateBoook(dataNew);
                if (result && result.data) {
                    setIsOpenUpdate(false);
                    setUserProps(undefined);
                    setselectedFileUpdate(undefined);
                    setRender(!render);
                    form.resetFields();
                    notification.success({
                        message: "Update Book",
                        description: "Update thành công"
                    })
                } else {
                    notification.error({
                        message: "Update Book",
                        description: JSON.stringify(result.message)
                    })
                }
            } else {
                notification.error({
                    message: "Update Book",
                    description: JSON.stringify(image.message)
                })
            }

        } else {
            const dataNew = {
                ...data,
                price: parseInt(data.price),
                quantity: parseInt(data.quantity),
                _id: userProps._id,
                thumbnail: userProps.thumbnail
            }
            const result = await updateBoook(dataNew);
            if (result && result.data) {
                setIsOpenUpdate(false);
                setUserProps(undefined);
                setselectedFileUpdate(undefined);
                setRender(!render);
                form.resetFields();
                notification.success({
                    message: "Update Book",
                    description: "Update thành công"
                })
            } else {
                notification.error({
                    message: "Update Book",
                    description: JSON.stringify(result.message)
                })
            }
        }
    }
    return (
        <>
            <Modal
                open={isOpenUpdate}
                title="Input form Book Update"
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
                        <Input type="Number" />
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
                        htmlFor="thumbnail"
                        className="changeAvatar"
                    >
                        <Input style={{ display: "none" }} onChange={onSelectFileUpload} type="file" id="thumbnail" />
                    </Form.Item>

                    <Form.Item>
                        <img id="thumbnail-view" style={{ display: "none" }} />
                    </Form.Item>

                    {previewUpdate && <Form.Item>
                        <div>Ảnh Thay:</div>
                        <img src={previewUpdate} />
                    </Form.Item>}

                    <Form.Item>
                        <Button type="primary" block htmlType="submit">Update Book</Button>
                    </Form.Item>


                </Form>
            </Modal>
        </>
    );
}

export default UpdateBook;