package pl.marcinsalamandra.microbloggingapp.security.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static pl.marcinsalamandra.microbloggingapp.utils.JwtUtils.BAERER_PREFIX;
import static pl.marcinsalamandra.microbloggingapp.utils.JwtUtils.JWT_ALGORITHM;
import static pl.marcinsalamandra.microbloggingapp.utils.SecurityErrorProvider.sendResponseWithError;

@SuppressWarnings("NullableProblems")
@AllArgsConstructor
public class UserAuthorizationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        boolean isLoginRequest = request.getServletPath().equals("/api/login");
        boolean isGetIssuerRequest = request.getServletPath().equals("/api/users/issuer");
        boolean isGetPictureRequest = request.getServletPath().contains("picture") && request.getMethod().equals("GET");
        boolean isRegisterRequest = request.getServletPath().equals("/api/users") && request.getMethod().equals("POST");

        if(!isLoginRequest && !isGetIssuerRequest && !isGetPictureRequest && !isRegisterRequest) {
            String authorizationHeader = request.getHeader(AUTHORIZATION);

            if(authorizationHeader != null && authorizationHeader.startsWith(BAERER_PREFIX)) {
                try {
                    String token = authorizationHeader.substring(BAERER_PREFIX.length());
                    JWTVerifier verifier = JWT.require(JWT_ALGORITHM).build();
                    DecodedJWT decodedJwt = verifier.verify(token);

                    String username = decodedJwt.getSubject();
                    String[] roles = decodedJwt.getClaim("roles").asArray(String.class);

                    Collection<SimpleGrantedAuthority> authorities =
                            Arrays.stream(roles)
                                    .map(SimpleGrantedAuthority::new)
                                    .collect(Collectors.toList());

                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(username, null, authorities);

                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                } catch(Exception exception) {
                    sendResponseWithError(response, "Bad request token");
                }
            } else {
                sendResponseWithError(response, "No request token");
            }
        }
        filterChain.doFilter(request, response);
    }
}
