import Order from "../domain/order.entity";
import OrderRepository from "../infrastructure/order.repository";
import { OrderContainer } from "../order.container";

export class PayOrderUseCase {
  // je créé une propriété privée orderRepository de type OrderRepository
  private orderRepository: OrderRepository;

  // je créé un constructeur, qui est appelé automatiquement
  // quand la classe PayOrderUseCase est instanciée
  // mon constructeur ici récupère l'instance de OrderRepository
  // depuis le container
  // et la stocke dans la propriété orderRepository
  constructor() {
    this.orderRepository = OrderContainer.getOrderRepository();
  }

  payOrder(orderId: number): Order {
    // j'utilise la propriété orderRepository
    const order = this.orderRepository.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.pay();

    const orderUpdated = this.orderRepository.update(order);

    return orderUpdated;
  }
}
