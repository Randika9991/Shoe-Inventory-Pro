package lk.ijse.gdse66.footflex.demo.service.impl;

import lk.ijse.gdse66.footflex.demo.service.JwtService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Service
public class JwtServiceImpl implements JwtService {
    @Value("${token.key}")
    String jwtKey;
    @Override
    public String extractUserName(String token) {
        return extractClaims(token, Claims::getSubject); // extract the subject claim from a Claims object
    }

    @Override
    public String generateToken(UserDetails userDetails) {
        HashMap<String, Object> claims = new HashMap<>();
        claims.put("role",userDetails.getAuthorities());
        Date currentDate = new Date();
        Date expiredDate = new Date(currentDate.getTime() + 1000 * 60 * 60 * 24);
        String accessToken = Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername()) // set the "subject" (sub) claim of the JWT
                .setIssuedAt(currentDate) // set the "issued at" (iat) claim of the JWT
                .setExpiration(expiredDate) // set the "expiration" (exp) claim of the JWT
                .signWith(getSignKey(), SignatureAlgorithm.HS256) // give the signing key and the signing algorithm for signing the JWT
                .compact();
        //System.out.println("Generated Token: " + accessToken);
        return accessToken;
    }

    @Override
    public boolean isTokenValid(String token, UserDetails userDetails) {
        String subject = extractClaims(token, Claims::getSubject);
        return subject.equals(userDetails.getUsername()) && !isExpired(token);
    }

    private Key getSignKey(){
        byte[] bytes = Decoders.BASE64.decode(jwtKey); //decode the base64-encoded jwt
        return Keys.hmacShaKeyFor(bytes); // generate an HMAC (Hash-based Message Authentication Code) signing key
    }

    /*new edit*/
    /*private Key getSignKey() {
        byte[] keyBytes = hexStringToByteArray(jwtKey);
        System.out.println("Key Bytes: " + Arrays.toString(keyBytes));
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private byte[] hexStringToByteArray(String s) {
        int len = s.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4)
                    + Character.digit(s.charAt(i+1), 16));
        }
        return data;
    }*/
    /**/
    private Claims getAllClaims(String token){
        //System.out.println("Parsing Token: " + token);
        return Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody();
    }

    // extract all claims from jwt
    private <T> T extractClaims(String token, Function<Claims,T> claimResolve){
        Claims claims = getAllClaims(token);
        return claimResolve.apply(claims);
    }

    private boolean isExpired(String token){
        Date expiredDate = extractClaims(token, Claims::getExpiration);
        return expiredDate.before(new Date());
    }
}

