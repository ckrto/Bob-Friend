package com.example.service.cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.cart.CartDAO;
import com.example.domain.CartVO;

@Service
public class CartServiceImpl implements CartService{
	
	@Autowired
	CartDAO cartDAO;

	// ���ο� ������ �޴��� ���� ��� ���� ��ٱ��ϸ� ���� �ٸ� ������ �޴� ���
	@Transactional
	@Override
	public void new_insert(CartVO vo) {
		// ���� ��ٱ��� ����
		cartDAO.allDelete(vo.getU_code());
		// ���ο� �޴� ���
		cartDAO.insert(vo);
	}
	
}
