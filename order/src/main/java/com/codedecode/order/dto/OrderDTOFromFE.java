package com.codedecode.order.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTOFromFE {
	private List<FoodItemsDTO> foodItemsList;
	private Integer userId;
	private Restaurant restaurant;

}
