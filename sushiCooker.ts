import { Order } from "./order.ts"

export class SushiCooker {
    orderList: Order[]

    constructor () {
        this.orderList = []
    }

    add = (order: Order) => {
        this.orderList.push(order)

        if (this.orderList.length == 1) {
            this.cook()
        }
    }

    cook = async () => {
        const order = this.orderList[0]
        const nigiri: string = await this.cooker(order.demand)

        console.log("delivering: " + nigiri + " for " + order.demand)

        order.deliver(nigiri)
        this.orderList.shift()

        if (this.orderList.length > 0) {
            this.cook()
        }
    }

    cooker = (demand: string): Promise<string> => {
        return new Promise((resolve) => {
            const nigiri: string = "nigiri"
            setTimeout(() => {
                resolve(nigiri) 
            } , 1000)
        })
    }
}