package pl.marcinsalamandra.microbloggingapp.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.marcinsalamandra.microbloggingapp.repository.AppUserRepository;

@Component
public class AuthenticationUtils {

    private static AppUserRepository appUserRepository;

    @Autowired
    public AuthenticationUtils(AppUserRepository appUserRepository) {
        AuthenticationUtils.appUserRepository = appUserRepository;
    }

    public static Long getIssuerId(String username) {
        return appUserRepository.findIssuerId(username);
    }
}
