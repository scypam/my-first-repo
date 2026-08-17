import { test, expect } from '@playwright/test';

test.describe ("API-тесты для Restful-booker", () => {
    test.describe.configure({ mode: 'serial' }); //для последовательного запуска тестов
    const baseURL = "https://restful-booker.herokuapp.com/";
    let bookingid; 
    const bookingData = { //  создала объект тут, чтобы на всех тестах его юзать
            "firstname" : "Jim",
            "lastname" : "Brown",
            "totalprice" : 111,
            "depositpaid" : true,
            "bookingdates" : {
                "checkin" : "2018-01-01",
                "checkout" : "2019-01-01"
            },
            "additionalneeds" : "Breakfast"
        };


    test ("Создание бронирования", async ({request}) => {  
        const response = await request.post(`${baseURL}booking`, {data: bookingData}); 

        console.log(`Статус: ${response.status()}`);
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        console.log("Ответ:", responseBody)

        expect(responseBody).toHaveProperty("bookingid");

        expect(responseBody.booking).toEqual(expect.objectContaining(bookingData));

        bookingid = responseBody.bookingid;
    });


    test ("Получение информации о бронировании", async ({request}) => {
        const response = await request.get(`${baseURL}booking/${bookingid}`); 
        console.log(`Статус: ${response.status()}`);
        expect(response.status()).toBe(200);
       
        const responseBody = await response.json();
        console.log("Ответ:", responseBody);

        expect(responseBody).toEqual(expect.objectContaining(bookingData));
    });


    test ("Обновление бронирования", async ({request}) => {
        //Авторизация
        const userData = {
            "username" : "admin",
            "password" : "password123"
        };

        const response = await request.post(`${baseURL}auth`, {data: userData});
        console.log(`Статус: ${response.status()}`);
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        console.log("Ответ:", responseBody);

        //Изменение бронирования
        const newBookingData = {
            ...bookingData,       // все поля из оригинала
            firstname: "Polina",  
            totalprice: 322       
        };
        
        const config = {
            headers: {
                "Cookie" : `token=${responseBody.token}`
            }
        };

        const responsePUT = await request.put(`${baseURL}booking/${bookingid}`, {
            data: newBookingData,
            ...config
        }); 
        
        console.log(`Статус PUT: ${responsePUT.status()}`);
        expect(responsePUT.status()).toBe(200);

        const responseBodyPUT = await responsePUT.json();
        console.log("Ответ PUT:", responseBodyPUT);
        
        expect(responseBodyPUT.firstname).toBe("Polina");
        expect(responseBodyPUT.totalprice).toBe(322);
    });


    test ("Удаление бронирования", async ({request}) => {
        //Авторизация
        const userData = {
            "username" : "admin",
            "password" : "password123"
        };

        const response = await request.post(`${baseURL}auth`, {data: userData});
        console.log(`Статус: ${response.status()}`);
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        console.log("Ответ:", responseBody);

        //Удаление бронирования
        const config = {
            headers: {
                "Cookie" : `token=${responseBody.token}`
            }
        };

        const responseDELETE = await request.delete(`${baseURL}booking/${bookingid}`, {
            ...config
        });
        console.log(`Статус DELETE: ${responseDELETE.status()}`);
        expect(responseDELETE.status()).toBe(201);


        //Дополнительно
        const responseGET = await request.get(`${baseURL}booking/${bookingid}`); 
        console.log(`Статус: ${responseGET.status()}`);
        expect(responseGET.status()).toBe(404);

    });
});

