package com.example.service.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.condition.ConditionDAO;
import com.example.dao.post.PostDAO;
import com.example.dao.store.StoreDAO;
import com.example.domain.ConditionVO;
import com.example.domain.PostVO;

@Service
public class PostServiceImpl implements PostService{
	
	@Autowired
	PostDAO postDAO;

	@Autowired
	ConditionDAO conditionDAO;
	
	@Autowired
	StoreDAO storeDAO;
	
	// ���� insert �� �Խñ� insert
	@Transactional
	@Override
	public void insert(PostVO vo) {
		// ���� ���̺� ������ ���
		ConditionVO cvo = new ConditionVO();
		cvo.setHeadcount(vo.getHeadcount());
		cvo.setGender(vo.getGender());
		cvo.setAge(vo.getAge());
//		System.out.println("PostServiceImpl - insert : " + cvo.toString());
		conditionDAO.insert(cvo);
//		cdao.insert(vo);
		
		// ���� ���̺��� ���� �ڵ� == �Խñ��� ���� �ڵ�
		// ������ ����� ���� �ڵ带 �Խñ��� ���� �ڵ�� ������ �� ���
//		System.out.println("PostServiceImpl - insert : " + vo.toString());
		postDAO.insert(vo);
		storeDAO.s_waiting(vo.getS_code(), +1);
	}
	
	// �Խñ� ���� �� ���� ����
	@Transactional
	@Override
	public void delete(int p_code) {
		// ���� ���̺��� ���� �ڵ� == �Խñ��� ���� �ڵ�
		// ������ �Խñ��� p_code�� ���� c_code�� ����
		int c_code = postDAO.get_c_code(p_code);
		String s_code = postDAO.read(p_code).getS_code();
		
		// �Խñ� ����
		postDAO.delete(p_code);
		// ������ ���� c_code�� ���� ����
		conditionDAO.delete(c_code);
		storeDAO.s_waiting(s_code, -1);
	}

}