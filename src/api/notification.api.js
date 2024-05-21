import instance  from "@/api/instance";
const END_POINT = '/api';

const notification = {
  getList: () => instance.get(`${END_POINT}/notifications`),
}


export default {
  notification
}
