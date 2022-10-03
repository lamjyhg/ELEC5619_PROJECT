package com.elec5619.backend.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.var;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class AuthenticationFilter extends OncePerRequestFilter {


    @Override
    @SneakyThrows
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) {
        //log.debug("doFilterInternal() started");
        System.out.println(111);
        String usrName = request.getHeader("username");
        logger.info("Successfully authenticated user  " +
                usrName);
        filterChain.doFilter(request, response);
//        String authorizationHeader = request.getHeader("Authorization");
//        System.out.println(111);
//        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
//            //log.info("No authorizationHeader or header not startWith Bearer");
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//
//
//        String token = authorizationHeader.replace("Bearer ", "");
//
//        Jws<Claims> claimsJws = Jwts.parser()
//                .setSigningKey(secretKey)
//                .parseClaimsJws(token);
//        Claims body = claimsJws.getBody();
//        String username = body.getSubject();
//
//        var authorities = (List<Map<String, String>>) body.get("authorities");
//        Set<SimpleGrantedAuthority> grantedAuthorities = authorities.stream()
//                .map(map -> new SimpleGrantedAuthority(map.get("authority")))
//                .collect(Collectors.toSet());
//
//        Authentication authentication = new UsernamePasswordAuthenticationToken(
//                username,
//                null,
//                grantedAuthorities
//        );
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//

        filterChain.doFilter(request, response);
    }


    @Override
    protected boolean shouldNotFilterAsyncDispatch() {
        return false;
    }

    @Override
    protected boolean shouldNotFilterErrorDispatch() {
        return false;
    }

}
