import instance  from "@/api/instance";
const END_POINT = '/api';

const productAdd = {
    vehicleSale: (data) => instance.post(`${END_POINT}/sale-vehicle-register`, data),
    vehicle: (data) => instance.post(`${END_POINT}/vehicle-register`, data),
    repair: (data) => instance.post(`${END_POINT}/repairmen-register`, data),
    order: (data) => instance.post(`${END_POINT}/order-register`, data),
    orderUpdate: (data) => instance.post(`${END_POINT}/order-update`, data),
    vehicleUpdate: (data) => instance.post(`${END_POINT}/sale-vehicle-update`, data),
    serviceUpdate: (data) => instance.post(`${END_POINT}/vehicle-update`, data),
    driver: (data) => instance.post(`${END_POINT}/driver-application`, data),
    driverUpdate: (data) => instance.post(`${END_POINT}/driver-application-update`, data),
    shop: (data) => instance.post(`${END_POINT}/shop-register`, data),
    shopItem: (data) => instance.post(`${END_POINT}/shop-item-register`, data),
    shopItemUpdate: (data) => instance.post(`${END_POINT}/shop-item-update`, data),
    removeVehicle: (data) => instance.post(`${END_POINT}/delete-sale-vehicles`, data),
    removeOrder: (data) => instance.post(`${END_POINT}/remove-order`, data),
    removeRepair: (data) => instance.post(`${END_POINT}/delete-repairmen`, data),
    removeService: (data) => instance.post(`${END_POINT}/delete-vehicle`, data),
    removeShopItem: (data) => instance.post(`${END_POINT}/delete-shop-item`, data),
    removeDriver: (id) => instance.delete(`${END_POINT}/driver-application/${id}`),
}


export default {
    productAdd
}
