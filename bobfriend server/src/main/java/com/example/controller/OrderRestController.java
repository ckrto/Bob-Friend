package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.order.OrderDAO;
import com.example.domain.OrderVO;

@RestController
@RequestMapping("/api/order")
public class OrderRestController {
	
	// OrderDAO ¿¬°á
	@Autowired
	OrderDAO orderDAO;
	
	@RequestMapping("/list/{p_code}")
	public List<OrderVO> list(@PathVariable int p_code) {
		return orderDAO.list(p_code);
	}
	
}
