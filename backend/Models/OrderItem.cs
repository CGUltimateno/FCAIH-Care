namespace backend.Models
{
    public class OrderItem
    {
        public int OrderItemID { get; set; }
        public int ProductID { get; set; }
        public int Quantity { get; set; }
        public int OrderID { get; set; }

        public OrderItem(int orderItemID, int quantity, int orderID, int productID)
        {
            OrderItemID = orderItemID;
            ProductID = productID;
            Quantity = quantity;
            OrderID = orderID;

        }
    }
}
