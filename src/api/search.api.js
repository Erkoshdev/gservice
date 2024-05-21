import instance  from "@/api/instance";
const END_POINT = '/api';

const search = {
  getList: (data) => instance.get(`${END_POINT}/search`, data),
}


export default {
  search
}
