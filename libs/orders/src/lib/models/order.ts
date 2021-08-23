import { OrderItem } from './order-item';
import {UserModel} from "../../../../users/src/lib/models/userModel";

export class Order {
  id?: string;
  orderItems?: OrderItem;
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: number;
  totalPrice?: string;
  user?: UserModel;
  dateOrdered?: string;
}
