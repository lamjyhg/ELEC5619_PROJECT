package com.elec5619.backend.utils;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.Date;

public class DateHandlers {
    public static Integer getDayOfWeek(LocalDateTime date){
        Integer day = date.getDayOfWeek().getValue()-1;
        System.out.println(date+"day"+day);

        return day;
    }
}
