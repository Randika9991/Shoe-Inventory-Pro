package lk.ijse.gdse66.footflex.demo.advice;/*
    this application is copyright protected
    Author : kumara
    Date : 5/1/2024
*/
import lk.ijse.gdse66.footflex.demo.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.footflex.demo.service.exception.NotFoundException;
import lk.ijse.gdse66.footflex.demo.service.exception.ServiceException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    private Map<String, Object> commonErrorAttribute = new HashMap<>();

    @ExceptionHandler(ServiceException.class)
    public ResponseEntity<Map<String,Object>> handleServiceException(ServiceException exp){
        Map<String, Object> commonErrorAttribute;
        if (exp instanceof DuplicateRecordException){
            commonErrorAttribute = getCommonErrorAttribute(HttpStatus.CONFLICT);
        }
        else if (exp instanceof NotFoundException){
            commonErrorAttribute = getCommonErrorAttribute(HttpStatus.NOT_FOUND);
        }

        else {
            commonErrorAttribute=getCommonErrorAttribute(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        commonErrorAttribute.put("message",exp.getMessage());

        return new ResponseEntity<>(commonErrorAttribute,HttpStatus.valueOf((Integer) commonErrorAttribute.get("code")));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String,Object>> handleMainException(Exception exp){
         Map<String, Object> commonErrorAttribute = new HashMap<>();
        if (exp instanceof MaxUploadSizeExceededException){
            commonErrorAttribute = getCommonErrorAttribute(HttpStatus.NOT_ACCEPTABLE);

        }

        return new ResponseEntity<>(commonErrorAttribute,HttpStatus.valueOf((Integer) commonErrorAttribute.get("code")));
    }

    public Map<String,Object> getCommonErrorAttribute(HttpStatus status){
        LinkedHashMap<String, Object> errAttribute = new LinkedHashMap<>();
        errAttribute.put("code",status.value());
        errAttribute.put("status",status);
        return errAttribute;

    }
}
