package com.example.dao.order;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.domain.OrderVO;

@Repository
public class OrderDAOImpl implements OrderDAO{
	
	@Autowired
	SqlSession session;
	
	String namespace = "com.example.mapper.OrderMapper";

	@Override
	public void insert(int p_code, String u_code) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("p_code", p_code);
		map.put("u_code", u_code);
		
		session.insert(namespace + ".insert", map);
	}
	
	@Override
	public List<OrderVO> list(int p_code) {
		return session.selectList(namespace + ".list", p_code);
	}
	
	// 토큰 값 받아서 알림 보내기 - PostRestController에서 사용함
	public String notificationJson(int p_code) throws JSONException {
		JSONObject body = new JSONObject();
		
		List<String> tokenList = session.selectList(namespace + ".getTokenList", p_code);
		System.out.println(tokenList);

		// 각 디바이스 토큰 값
		JSONArray array = new JSONArray();
		for (int i = 0; i < tokenList.size(); i++) {
			array.put(tokenList.get(i));
		}
		body.put("registration_ids", array);

		JSONObject notification = new JSONObject();
		notification.put("title", "hello!"); // 알림 제목
		notification.put("body", "This is notification test"); // 알림 내용
		body.put("notification", notification);

		System.out.println(body.toString());

		return body.toString();
	}

}
