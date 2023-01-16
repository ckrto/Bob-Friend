package com.example.service.user;

import java.util.HashMap;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.dao.like.LikedDAO;
import com.example.dao.report.ReportDAO;
import com.example.dao.review.ReviewDAO;
import com.example.dao.user.UserDAO;

import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserDAO userDAO;

	@Autowired
	ReviewDAO reviewdao;

	@Autowired
	ReportDAO reportdao;

	@Autowired
	LikedDAO likedDAO;
	

	// ���� ���� ���̺� ���� �� ���� ���
	@Transactional
	@Override
	public void delUser(String u_code) {
		userDAO.updateStatus(u_code);
		userDAO.delUser(u_code);
	}

	// ���� ���� ���̺��� Ư�� ���� ����
	@Transactional
	@Override
	public void reUser(String u_code) {
		userDAO.updateStatus(u_code);
		userDAO.reUser(u_code);
	}

	// ���� ���� ���̺��� 14�� �̻� ���� ���� ���� ����
	@Transactional
	@Override
	public void del_user() {
		reviewdao.update_del();
		reportdao.update_del();
		likedDAO.u_delete();
		userDAO.del_user();
	}
	
	// ���� ����
	@Override
	public void authPhoneNumber(String phoneNumber, String authNum) {
		String api_key = "NCSYQ6CPPVTTOVUM";
		String api_secret = "5OWEDMRN9DRE7GUJ2IKYTI8S7ZPG6ZPA";
		Message coolSMS = new Message(api_key, api_secret);
		
		HashMap<String, String> params = new HashMap<>();
		params.put("to", phoneNumber);		// ���� ��ȭ ��ȣ
		params.put("from", "���� �����ϴ� ��ȣ");	// �׽�Ʈ �� ���� ��ȣ �Է�
		params.put("type", "SMS");
		params.put("text", "���� ��ȣ�� [ " + authNum + " ] �Դϴ�.");	// ���� ����
		params.put("app_version", "test app 1.2");				// application name and version
		
		try {
			JSONObject object = (JSONObject)coolSMS.send(params);
			System.out.println("UserServiceImpl - authPhoneNumber : " + object.toString());
		} catch(CoolsmsException e) {
			System.out.println("UserServiceImpl - authPhoneNumber : " + e.getMessage());
			System.out.println("UserServiceImpl - authPhoneNumber : " + e.getCode());
		}
	}

}
