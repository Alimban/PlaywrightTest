class APIutils
{
   constructor(apiContext,loginPayload)
   {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
   }
   
   
    async getToken()
    {
        const apiResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
                    {
                        data:this.loginPayload
                    });
        
                //expect(apiResponse.ok()).toBeTruthy();
        
                const loginResponseJson = await apiResponse.json();
        
                const token = loginResponseJson.token;
        
                console.log(token);
                return token;
    }

    async createOrder(createOrderPayload)
    {

        let response ={};  
        response.token = await this.getToken();    
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: createOrderPayload,
                headers: {
                            'Authorization': response.token,
                            'Content-Type': 'application/json'
                        }
            },
        );

        const orderResponseJson = await orderResponse.json();

        const orderAPIid = orderResponseJson.orders[0];

        console.log(orderResponseJson.message);

        response.orderAPIid = orderAPIid;

        return response;


    }

}
module.exports = {APIutils};