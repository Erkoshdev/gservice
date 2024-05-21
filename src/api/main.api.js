import instance  from "@/api/instance";
const END_POINT = '/api';

const main = {
    getList: () => instance.get(`${END_POINT}/index`),
    getFaq: () => instance.get(`${END_POINT}/guides`),
}


export default {
    main
}
