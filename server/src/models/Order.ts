import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  items: string[];
  deliveryStationId: mongoose.Types.ObjectId;
  orderStatus: 'pending' | 'in transit' | 'delivered';
  estimatedDeliveryTime: Date;
  deliveryPersonId: mongoose.Types.ObjectId;
}

const orderSchema = new Schema<IOrder>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: { type: [String], required: true },
  deliveryStationId: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryStation', required: false },
  orderStatus: { type: String, enum: ['pending', 'in transit', 'delivered'], default: 'pending' },
  estimatedDeliveryTime: { type: Date, required: true },
  deliveryPersonId: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPersonnel', required: false },
});

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;
