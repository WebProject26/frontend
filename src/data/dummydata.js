import faker from "faker"

export const generateOrderItem = () => {
    return {
        id: Math.floor(Math.random() * 10000), 
        name:faker.commerce.product(),
        description: faker.commerce.productDescription(),
        cost: faker.commerce.price(0,10),
        imageURL: "",
        foodcategory: "",
        restaurantid: Math.floor(Math.random() * 10000),
        active: true,
    }
}