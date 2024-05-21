import instance  from "@/api/instance";
const END_POINT = '/api';

const adverts = {
    getVehicles: () => instance.get(`${END_POINT}/my-sale-vehicles`),
   
}


export default {
    adverts
}
