import instance  from "@/api/instance";
const END_POINT = '/api';

const product = {
  getVehicle: (data) => instance.get(`${END_POINT}/sale-vehicle`, data),
  getRepair: (data) => instance.get(`${END_POINT}/repairmen`, data),
  getShop: (data) => instance.get(`${END_POINT}/shop-item`, data),
  getOrder: (data) => instance.get(`${END_POINT}/order`, data),
  getService: (data) => instance.get(`${END_POINT}/user-vehicle`, data),
  getOperator: (data) => instance.get(`${END_POINT}/driver-application`, data),
  getDriver: (data) => instance.get(`${END_POINT}/driver-application`, data),
  getMyShop: (data) => instance.get(`${END_POINT}/my-shop`, data),
  checkMyShop: () => instance.get(`${END_POINT}/check-shop`),
}

export default {
  product
}
