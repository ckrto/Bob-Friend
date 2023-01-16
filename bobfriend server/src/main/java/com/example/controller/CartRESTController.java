package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.cart.CartDAO;
import com.example.domain.CartVO;
import com.example.service.cart.CartService;

@RestController
@RequestMapping("/api/cart")
public class CartRESTController {

	@Autowired
	CartDAO cartDAO;
	
	@Autowired
	CartService cartService;
	
	// ��ٱ��Ͽ� �޴� ���
	@RequestMapping(value="/insert", method=RequestMethod.POST)
	public void insert(@RequestBody CartVO vo){
//		System.out.println("CartRestController - insert : " + vo);
		// ����Ϸ��� �޴��� ��ٱ��Ͽ� �̹� ���� �ϴ��� Ȯ��
		CartVO read = cartDAO.read(vo);
//		System.out.println("CartRestController - insert : " + cartDAO.read(vo));
		
		// ����Ϸ��� �޴��� ��ٱ��Ͽ� ���� �� ���
		try{
			if(read.getM_name().equals(vo.getM_name())){
				System.out.println("CartRestController - insert :: ������ : " + read.getAmount());
				System.out.println("CartRestController - insert :: �߰��Ǵ� �� : " + vo.getAmount());
				// �߰��� ��� ���� ������Ʈ
				vo.setAmount(read.getAmount() + vo.getAmount());
				System.out.println("CartRestController - insert :: ����  : " + vo.getAmount());
				cartDAO.update(vo);
			}
		} catch(NullPointerException e) {	// ��ٱ��Ͽ� ����Ϸ��� �޴��� ������� ���� ���
			// ��ٱ��Ͽ� ���ο� �޴� ���
			cartDAO.insert(vo);
		}
	}
	
	//���� ��ٱ��Ͽ� ��� ���Կ� ���� ��� ���԰� �ٸ� ��� ���� ��ٱ��� ���� ���� ���
	@RequestMapping(value="/new_insert", method=RequestMethod.POST)
	public void new_insert(@RequestBody CartVO vo){
		cartService.new_insert(vo);
	}
	
	// ��ٱ��Ͽ� ��� ���Կ��� ��ġ ���θ� Ȯ���ϱ� ����
	@RequestMapping("/getS_code/{u_code}")
	public String getS_code(@PathVariable String u_code){
//		System.out.println("CartRestController - getS_code : " + u_code);
		return cartDAO.getS_code(u_code);
	}
	
	@RequestMapping("/orderlist/{p_code}")
	public List<CartVO> orderlist(@PathVariable String p_code){
		return cartDAO.orderlist(p_code);
	}
	
	// Ư�� ������ ��ٱ��� ���
	@RequestMapping("/list/{u_code}")
	public List<CartVO> list(@PathVariable String u_code){
		return cartDAO.list(u_code);
	}
	
	// Ư�� ������ ��ٱ��Ͽ� ��� �޴� ���� ����
	@RequestMapping(value="/update", method=RequestMethod.POST)
	public void update(@RequestBody CartVO vo){
		cartDAO.update(vo);
	}
	
	// Ư�� ������ ��ٱ����� �޴� ����
	@RequestMapping(value="/delete", method=RequestMethod.POST)
	public void delete(@RequestBody CartVO vo){
		cartDAO.delete(vo);
	}
	
}
