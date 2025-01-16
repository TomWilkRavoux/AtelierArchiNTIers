import Order from "../domain/order.entity";

export default class OrderRepository {
  private orders: Order[] = [];

  create(order: Order): Order {
    const orderWithId = { ...order, id: this.orders.length + 1 } as unknown as Order;

    this.orders.push(orderWithId);

    return orderWithId;
  }

  findAll(): Order[] {
    return this.orders;
  }

  findById(id: number): Order | undefined {
    return this.orders.find((order) => order.getId() === id);
  }

  update(order: Order): Order {
    this.orders = this.orders.map((orderInList) => {
      if (orderInList.getId() === order.getId()) {
        return order;
      }

      return orderInList;
    });

    return order;
  }

  async save(order: Order): Promise<void> {
    const index = this.orders.findIndex(o => o.id === order.id);
    if (index === -1) {
      this.orders.push(order);
    } else {
      this.orders[index] = order;
    }
  }
}
