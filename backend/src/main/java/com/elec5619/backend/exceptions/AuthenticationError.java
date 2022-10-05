package com.elec5619.backend.exceptions;

import javax.naming.AuthenticationException;

public class AuthenticationError extends AuthenticationException {
    public AuthenticationError(String message) {
        super(message);
    }
}
