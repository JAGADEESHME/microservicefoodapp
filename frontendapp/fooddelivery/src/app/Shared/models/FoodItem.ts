export interface FoodItem {
    isDisabled: boolean;
    id?: number;
    itemName?: string;
    itemDescription?: string;
    isVeg?: boolean;
    price?: number;
    restaurantId?: number;
    quantity: number;
}