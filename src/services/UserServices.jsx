
import {instance} from "./AxiosCustom";

const linkUser = "api/v1/user";

export const CreateNewUser = (options)=>{
    const result = instance.post(linkUser, options);
    return result;
}

export const GetAllUser = (current=1,pageSize=10)=>{
    const result = instance.get(`${linkUser}/?current=${current}&pageSize=${pageSize}`);
    return result;
}

export const UpdateNewUser = (options)=>{
    const result = instance.put(linkUser, options);
    return result;
}

export const DeleteUser = (id)=>{
    const result = instance.delete(linkUser+"/"+id);
    return result;
}

export const UpdateFile = (file,folder)=>{
    let config = {
        headers: {
          "upload-type":folder,
          'Content-Type': 'multipart/form-data'
        }
      }
      const bodyFormData = new FormData();
      bodyFormData.append("fileImg",file);
      const result = instance.post("api/v1/file/upload", bodyFormData, config)
    return result;
}


export const register = (options)=>{
    const result = instance.post(`${linkUser}/register`, options);
    return result;
}

export const login = (options)=>{
    const result = instance.post(`api/v1/auth/login`, options);
    return result;
}

export const getAccount = ()=>{
    const result = instance.get(`api/v1/auth/account`);
    return result;
}