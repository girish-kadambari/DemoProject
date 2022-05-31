package com.ts.springblog.controller;


import com.ts.springblog.dto.LoginRequest;
import com.ts.springblog.dto.RegisterRequest;
import com.ts.springblog.service.AuthService;
import com.ts.springblog.service.AuthenticationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity signUp(@RequestBody RegisterRequest registerRequest){
        authService.signUp(registerRequest);
        return  new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/fd")
    public String hello(){
       return "hello";
    }

    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody LoginRequest loginRequest){
        return  authService.login(loginRequest);
    }

    private boolean signupCheck(String field){
        if(field.trim().length() >= 0){
            return  true;
        }
        else{
            return  false;
        }
    }

}
