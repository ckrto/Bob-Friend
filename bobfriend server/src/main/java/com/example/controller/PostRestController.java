package com.example.controller;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import org.json.JSONException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.dao.order.OrderDAO;
import com.example.dao.post.PostDAO;
import com.example.domain.PostVO;
import com.example.service.fcm.AndroidFCMService;
import com.example.service.post.PostService;

@RestController
@RequestMapping("/api/post")
public class PostRestController {
	
	@Autowired
	PostDAO postDAO;
	
	@Autowired
	OrderDAO orderDAO;						// 주문
	
	@Autowired
	PostService postService;				// 게시글 및 조건 관련 서비스
	
	@Autowired
	AndroidFCMService androidFCMService;	// FCM (안드로이드 알림) 관련 서비스
	
	// 조건 insert 후 게시글 insert
	@RequestMapping(value="/insert", method=RequestMethod.POST)
	public void insert(@RequestBody PostVO vo){
		postService.insert(vo);
	}
	
	// 특정 가계의 게시글 목록
	@RequestMapping("/list/{s_code}")
	public List<PostVO> list(@PathVariable String s_code) {
		return postDAO.list(s_code);
	}
	
	//특정 게시글 정보
	@RequestMapping("/read/{p_code}")
	public PostVO read(@PathVariable int p_code){
		PostVO vo = postDAO.read(p_code);
		return vo;
	}
	
	// 게시글 참가 인원수 증가
	@RequestMapping(value="updateHeadcount", method=RequestMethod.POST)
	public int updateHeadcount(@RequestBody int p_code) {
		int result = 0;	// 0: 참여 실패, 1: 참여 성공
		PostVO postVO = postDAO.read(p_code);
		System.out.println("PostRestController - updateHeadcount : " + postVO.toString());
		
		// 인원수 확인
		if(postVO.getP_headcount() == postVO.getHeadcount()) {
			System.out.println("PostRestController - updateHeadcount : 참여 실패");
		} else {
			result = 1;
			orderDAO.insert(p_code, postVO.getU_code());
			postDAO.updateHeadcount(p_code);
			System.out.println("PostRestController - updateHeadcount : 참여 성공");
		}
		
		return result;
	}
	
	// 게시글 삭제 후 조건 삭제
	@RequestMapping(value="/delete/{p_code}", method=RequestMethod.POST)
	public void delete(@PathVariable int p_code){
		postService.delete(p_code);
	}
	
	// FCM Push Notification
	Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@RequestMapping("/send/{p_code}")
	public @ResponseBody ResponseEntity<String> send(@PathVariable int p_code) throws JSONException, InterruptedException {
		String notifications = orderDAO.notificationJson(p_code);
		HttpEntity<String> request = new HttpEntity<>(notifications);
		CompletableFuture<String> pushNotification = androidFCMService.send(request);
		
        CompletableFuture.allOf(pushNotification).join();

        try {
            String firebaseResponse = pushNotification.get();
            return new ResponseEntity<>(firebaseResponse, HttpStatus.OK);
        } catch (InterruptedException e){
            logger.debug("PostRestController - send : got interrupted!");
            throw new InterruptedException();
        } catch (ExecutionException e){
            logger.debug("PostRestController - send : execution error!");
        }
        return new ResponseEntity<>("PostRestController - send : Push Notification ERROR!", HttpStatus.BAD_REQUEST);
	}
	
}
