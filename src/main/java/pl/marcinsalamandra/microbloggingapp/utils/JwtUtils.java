package pl.marcinsalamandra.microbloggingapp.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

public class JwtUtils {

    private static final String SECRET_KEY = "$2a$12$CIEAdpakluvGc9bVUvk.PedYLVfjGx/Hx7FHMbPeHTsrj7gXdhdTe";
    private static final Integer SECOND_IN_MILLIS = 1000;
    private static final Integer MINUTE_IN_MILLIS = 60 * SECOND_IN_MILLIS;
    private static final Integer HOUR_IN_MILLIS = 60 * MINUTE_IN_MILLIS;
    private static final Integer DAY_IN_MILLIS = 24 * HOUR_IN_MILLIS;
    private static final Integer WEEK_IN_MILLIS = 7 * DAY_IN_MILLIS;
    private static final Integer JWT_EXPIRATION_MILLIS = WEEK_IN_MILLIS;
    public static final String BAERER_PREFIX = "Bearer ";
    public static final Algorithm JWT_ALGORITHM = Algorithm.HMAC256(SECRET_KEY.getBytes());

    public static String createJwt(String username, String issuer, List<String> authorities) {
        return JWT
                .create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + JWT_EXPIRATION_MILLIS))
                .withIssuer(issuer)
                .withClaim("roles", authorities)
                .sign(JWT_ALGORITHM);
    }

    public static LocalDateTime getExpirationDate(String token) {
        return JWT.require(JWT_ALGORITHM)
                .build()
                .verify(token)
                .getExpiresAt()
                .toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
    }
}
