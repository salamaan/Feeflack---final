package pl.marcinsalamandra.microbloggingapp.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import pl.marcinsalamandra.microbloggingapp.utils.AuthenticationUtils;
import pl.marcinsalamandra.microbloggingapp.utils.JwtUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static pl.marcinsalamandra.microbloggingapp.utils.JwtUtils.createJwt;
import static pl.marcinsalamandra.microbloggingapp.utils.SecurityErrorProvider.sendResponseWithError;

@SuppressWarnings("RedundantThrows")
public class UserAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    public UserAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
        this.setFilterProcessesUrl("/api/login");
    }

    @Override
    public Authentication attemptAuthentication(
            HttpServletRequest request,
            HttpServletResponse response) throws AuthenticationException {

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(username, password);

        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain,
            Authentication authentication) throws IOException, ServletException {

        User user = (User)authentication.getPrincipal();
        List<String> authorities = user.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        String accessToken = createJwt(
                user.getUsername(),
                request.getRequestURL().toString(),
                authorities
        );

        Map<String, String> body = Map.of(
                "accessToken", accessToken,
                "expiresAt", JwtUtils.getExpirationDate(accessToken).toString(),
                "issuerId", AuthenticationUtils.getIssuerId(user.getUsername()).toString()
        );

        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), body);
    }

    @Override
    protected void unsuccessfulAuthentication(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException exception) throws IOException, ServletException {

        sendResponseWithError(response, "Invalid username or password");
    }
}
