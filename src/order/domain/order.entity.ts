export default class Order {
  id: number;

  createdAt: Date;

  total: number;

  customer: number;

  products: [];

  status: string;

  paidAt: Date;

  statusOrd: "pending" | "paid" | "canceled"; 

  canceledAt?: Date; 

  constructor(customerId: number, products: []) {
    if (!customerId) {
      throw new Error("customerId is required");
    }

    if (products.length > 2) {
      throw new Error("You can't add more than 2 products");
    }

    this.createdAt = new Date();
    this.customer = customerId;
    this.products = products;
    this.status = "cart";
    this.statusOrd = "pending";

    this.total = products.reduce((acc, product) => {
      return acc + 5;
    }, 0);
  }

  getId(): number {
    return this.id;
  }

  pay(): void {
    if (this.products.length === 0) {
      throw new Error("You can't pay an empty cart");
    }

    if (this.status === "paid") {
      throw new Error("Order already paid");
    }

    if (this.status === "canceled") {
      throw new Error("You can't pay a canceled order");
    }

    if (this.total === 0) {
      throw new Error("You can't pay an empty cart");
    }

    this.status = "paid";
    this.paidAt = new Date();
  }
}
