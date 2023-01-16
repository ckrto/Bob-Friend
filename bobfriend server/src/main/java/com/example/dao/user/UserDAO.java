package com.example.dao.user;

import java.util.List;

import com.example.domain.UserVO;

public interface UserDAO {
	
	// �Ϲ� ����� �ڵ� �ο�
	public String newCode();
	
	// īī�� ȸ������ ����� �ڵ� �ο�
	public String newKakaoCode(String number);
	
	// ȸ������
	public void insert(UserVO userVO);
	
	public List<UserVO> list(String column, String query, int page, int num);

	public int total(String column, String query);
	
	public void update(UserVO vo);

	public void updateStatus(String u_code);

	public void delUser(String u_code);

	public void reUser(String u_code);

	public UserVO read(String u_code);

	public void del_user();

	public UserVO loginRead(String u_id);
	
	public int getAge(String birthday);
	
}
