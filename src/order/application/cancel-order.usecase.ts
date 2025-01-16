import OrderRepository from '../infrastructure/order.repository';
import Order from '../domain/order.entity';

export class CancelOrderUseCase {
    constructor(private orderRepository: OrderRepository) {}

    async execute(orderId: number): Promise<Order> {
        const order = await this.orderRepository.findById(orderId);

        if (!order) {
            throw new Error("Order not found");
        }

        if (order.status === "canceled") {
            throw new Error("Order is already canceled");
        }

        if (order.status !== "paid") {
            throw new Error("Only paid orders can be canceled");
        }

        order.status = "canceled";
        order.canceledAt = new Date();

        await this.orderRepository.save(order);

        return order;
    }
}