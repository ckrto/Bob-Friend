package com.example.dao.order;

import java.util.List;

import com.example.domain.OrderVO;

public interface OrderDAO {
	public List<OrderVO> list(int p_code);
	
	public void insert(int p_code, String u_code);

	public String notificationJson(int p_code);

}
