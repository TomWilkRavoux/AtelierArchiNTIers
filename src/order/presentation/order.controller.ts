import express from "express";
const router = express.Router();

import { CreateOrderUseCase } from "../application/create-order.usecase";
import { PayOrderUseCase } from "../application/pay-order.usecase";
import { CancelOrderUseCase } from "../application/cancel-order.usecase";
import  OrderRepository  from "../infrastructure/order.repository";


router.post("", (request, response) => {
  const customerId = request.body.customerId;
  const products = request.body.products;

  const createOrderUseCase = new CreateOrderUseCase();

  try {
    const order = createOrderUseCase.createOrder(customerId, products);
    response.status(201).json(order);
  } catch (error: any) {
    response.status(400).json({ error: error.message });
  }
});

router.patch("/:orderId/pay", (request, response) => {
  const orderId = parseInt(request.params.orderId);

  const payOrderUseCase = new PayOrderUseCase();

  try {
    const order = payOrderUseCase.payOrder(orderId);
    response.status(200).json(order);
  } catch (error: any) {
    response.status(400).json({ error: error.message });
  }
});

router.patch("/:orderId/cancel", async (request, response) => {
  const orderId = parseInt(request.params.orderId);
  const orderRepository = new OrderRepository();
  const cancelOrderUseCase = new CancelOrderUseCase(orderRepository); 

  try {
    const order = await cancelOrderUseCase.execute(orderId); 
    response.status(200).json(order);
  } catch (error: any) {
    response.status(400).json({ error: error.message });
  }
});

export default router;
