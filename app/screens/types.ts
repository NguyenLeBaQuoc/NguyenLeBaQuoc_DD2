// types.ts
export type RootStackParamList = {
    Feed: undefined;  // Không có tham số khi điều hướng tới Feed
    ProductDetail: { productId: number };  // ProductDetail nhận tham số productId
    Cart: undefined;  // Không có tham số khi điều hướng tới Cart
  };
  