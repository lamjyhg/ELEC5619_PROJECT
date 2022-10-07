package com.elec5619.backend.utils;
import java.util.UUID;



public class HashGenerator {

    public String generateHash(){
        return UUID.randomUUID().toString();
    }
}
