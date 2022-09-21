package com.elec5619.backend.utils.validators;

import lombok.SneakyThrows;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.atomic.AtomicReference;

public class TradingHoursValidator implements
        ConstraintValidator<TradingHoursConstraint, Map<Integer, Map<String, Time>>> {


    @SneakyThrows
    @Override
    public boolean isValid(Map<Integer, Map<String, Time>> value, ConstraintValidatorContext context) {
        AtomicReference<Boolean> isValid = new AtomicReference<>(true);
        Set<Integer> days = value.keySet();
        SimpleDateFormat parser = new SimpleDateFormat("HH:mm");

        for (Integer day : days) {
            if (day < 0 || day > 6) {
                isValid.set(false);
                break;
            }
            Map<String, Time> workingTime = value.get(day);
            if (!workingTime.containsKey("startTime")
                    || !workingTime.containsKey("endTime")
                    || parser.parse(workingTime.get("endTime").toString()).equals(parser.parse(workingTime.get("startTime").toString()))
                    || parser.parse(workingTime.get("endTime").toString()).before(parser.parse(workingTime.get("startTime").toString()))) {
                isValid.set(false);
                break;
            }


        }
        return isValid.get();


    }
}