import { instance } from "./AxiosCustom";
const linkBoook = "api/v1/book"
export const getBooks = (current = 1, pageSize = 5) => {
    const result = instance.get(`${linkBoook}?current=${current}&pageSize=${pageSize}`);
    return result;
}

export const uploadFile = (folder, file)=>{
    let config = {
        headers: {
            "upload-type": folder,
            "Content-type": "multipart/form-data"
        }
    }
    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", file);

    return instance.post("api/v1/file/upload", bodyFormData, config)
}

export const createBoook = (options) => {
    const result = instance.post(`${linkBoook}`,options);
    return result;
}

export const updateBoook = (options) => {
    const result = instance.put(`${linkBoook}`,options);
    return result;
}

export const DeleteBoook = (id) => {
    const result = instance.delete(`${linkBoook}/${id}`);
    return result;
}