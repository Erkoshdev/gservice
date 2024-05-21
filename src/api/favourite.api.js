import instance  from "@/api/instance";
const END_POINT = '/api';

const favourites = {
  getList: (data) => instance.get(`${END_POINT}/user-favourites`, data),
}


export default {
  favourites
}
