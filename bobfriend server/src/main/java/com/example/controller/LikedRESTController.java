package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.like.LikedDAO;
import com.example.domain.LikedVO;

@RestController
@RequestMapping("/api/liked")
public class LikedRESTController {

	@Autowired
	LikedDAO ldao;

	// Ư�� ������ ���ã�� ���
	@RequestMapping(value="/insert", method=RequestMethod.POST)
	public void insert(@RequestBody LikedVO vo) {
		ldao.insert(vo);
	}

	// Ư�� ������ ���ã�� ����
	@RequestMapping(value="/delete", method=RequestMethod.POST)
	public void delete(@RequestBody LikedVO vo) {
		ldao.delete(vo);
	}

}
