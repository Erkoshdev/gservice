import instance  from "@/api/instance";
const END_POINT = '/api';
const add = (data) => instance.post(`${END_POINT}/add-favourite`, data);
const remove = (data) => instance.post(`${END_POINT}/delete-favourite`,data);

export default {
    add,
    remove
}
