import instance  from "@/api/instance";
const END_POINT = '/api';

const social = {
  getList: () => instance.get(`${END_POINT}/social-links`),
}


export default {
  social
}
