package com.codedecode.restaurantlisting.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.codedecode.restaurantlisting.dto.RestaurantDTO;
import com.codedecode.restaurantlisting.service.RestaurantService;

@RestController
@RequestMapping("/restaurant")
@CrossOrigin
public class RestaurantController {
	@Autowired
	RestaurantService restaurantService;

	@GetMapping("/fetchAllRestaurants")
	public ResponseEntity<List<RestaurantDTO>> fetchAllRestaurants() {
		List<RestaurantDTO> allRestaurants = restaurantService.findAllRestaurants();
		return new ResponseEntity<>(allRestaurants, HttpStatus.OK);
	}

	@PostMapping("/addRestaurant")
	public ResponseEntity<RestaurantDTO> saveRestaurant(@RequestBody RestaurantDTO restaurantDTO) {
		RestaurantDTO restaurantAdded = restaurantService.addRestaurantInDB(restaurantDTO);
		return new ResponseEntity<>(restaurantAdded, HttpStatus.CREATED);
	}

	@GetMapping("fetchById/{id}")
	public ResponseEntity<RestaurantDTO> findRestaurantById(@PathVariable Integer id) {
		return restaurantService.fetchRestaurantById(id);
	}


}
