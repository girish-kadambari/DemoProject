package com.ts.springblog.dto;


import lombok.Data;

@Data
public class LoginRequest {
    String username;
    String password;
}
