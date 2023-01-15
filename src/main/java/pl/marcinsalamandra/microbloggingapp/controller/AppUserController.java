package pl.marcinsalamandra.microbloggingapp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.marcinsalamandra.microbloggingapp.converter.AppUserConverter;
import pl.marcinsalamandra.microbloggingapp.converter.PostConverter;
import pl.marcinsalamandra.microbloggingapp.dto.request.CreateAppUserDTO;
import pl.marcinsalamandra.microbloggingapp.dto.request.UpdateAppUserDTO;
import pl.marcinsalamandra.microbloggingapp.dto.response.PostDTO;
import pl.marcinsalamandra.microbloggingapp.dto.response.AppUserDTO;
import pl.marcinsalamandra.microbloggingapp.entity.Picture;
import pl.marcinsalamandra.microbloggingapp.service.AppUserService;

import javax.validation.Valid;

import java.io.IOException;

import static org.springframework.data.domain.Sort.Direction.DESC;
import static org.springframework.http.HttpHeaders.CONTENT_DISPOSITION;
import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class AppUserController {

    private final AppUserService appUserService;

    @GetMapping("/{userId}")
    public ResponseEntity<AppUserDTO> getUser(
            @PathVariable("userId") Long userId,
            @RequestParam("issuer_id") Long issuerId) {

        return ResponseEntity.ok(AppUserConverter.toResponse(appUserService.getUser(userId), issuerId));
    }

    @GetMapping
    public ResponseEntity<Page<AppUserDTO>> getUsers(
            @PageableDefault(sort = {"id"}, direction = DESC) Pageable pageable,
            @RequestParam(name = "filter", required = false) String filter,
            @RequestParam("issuer_id") Long issuerId) {

        return ResponseEntity.ok(AppUserConverter.toResponsePage(appUserService.getUsers(filter, pageable), issuerId));
    }

    @GetMapping("/popular")
    public ResponseEntity<Page<AppUserDTO>> getMostPopularUsers(
            @PageableDefault(direction = DESC) Pageable pageable,
            @RequestParam("issuer_id") Long issuerId) {

        return ResponseEntity.ok(AppUserConverter.toResponsePage(appUserService.getMostPopularUsers(pageable), issuerId));
    }

    @GetMapping("/{userId}/followers")
    public ResponseEntity<Page<AppUserDTO>> getUserFollowers(
            @PageableDefault(sort = {"id"}, direction = DESC) Pageable pageable,
            @PathVariable("userId") Long userId,
            @RequestParam("issuer_id") Long issuerId) {

        return ResponseEntity.ok(AppUserConverter.toResponsePage(appUserService.getUserFollowers(userId, pageable), issuerId));
    }

    @GetMapping("/{userId}/following")
    public ResponseEntity<Page<AppUserDTO>> getUserFollowing(
            @PageableDefault(sort = {"id"}, direction = DESC) Pageable pageable,
            @PathVariable("userId") Long userId,
            @RequestParam("issuer_id") Long issuerId) {

        return ResponseEntity.ok(AppUserConverter.toResponsePage(appUserService.getUserFollowing(userId, pageable), issuerId));
    }

    @GetMapping("/{userId}/following/posts")
    public ResponseEntity<Page<PostDTO>> getPostsOfFollowing(
            @PageableDefault(sort = {"id"}, direction = DESC) Pageable pageable,
            @PathVariable("userId") Long userId,
            @RequestParam("issuer_id") Long issuerId) {

        return ResponseEntity.ok(PostConverter.toResponsePage(appUserService.getPostsOfFollowing(userId, pageable), issuerId));
    }

    @GetMapping("/{userId}/posts")
    public ResponseEntity<Page<PostDTO>> getPostsOfUser(
            @PageableDefault(sort = {"id"}, direction = DESC) Pageable pageable,
            @PathVariable("userId") Long userId,
            @RequestParam("issuer_id") Long issuerId) {

        return ResponseEntity.ok(PostConverter.toResponsePage(appUserService.getPostsOfUser(userId, pageable), issuerId));
    }

    @GetMapping("/{userId}/picture")
    public ResponseEntity<Resource> getProfilePicture(@PathVariable("userId") Long userId) {
        Picture picture = appUserService.getProfilePicture(userId);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(picture.getType()))
                .header(CONTENT_DISPOSITION, "attachment; filename=" + picture.getName())
                .body(new ByteArrayResource(picture.getData()));
    }

    @PostMapping
    public ResponseEntity<AppUserDTO> createUser(
            @RequestBody @Valid CreateAppUserDTO request) {

        return ResponseEntity.ok(AppUserConverter.convert(appUserService.createUser(request), false));
    }

    @PostMapping("/{fromUserId}/following")
    public ResponseEntity<Void> followUser(
            @PathVariable("fromUserId") Long fromUserId,
            @RequestParam("to_user_id") Long toUserId) {

        appUserService.followUser(fromUserId, toUserId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{fromUserId}/following")
    public ResponseEntity<Void> unfollowUser(
            @PathVariable("fromUserId") Long fromUserId,
            @RequestParam("to_user_id") Long toUserId) {

        appUserService.unfollowUser(fromUserId, toUserId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(
            @PathVariable("userId") Long userId) {

        appUserService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{userId}/picture", consumes = MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> updateProfilePicture(
            @PathVariable("userId") Long userId,
            @RequestBody MultipartFile picture) throws IOException {

        appUserService.updateProfilePicture(userId, picture);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Void> updateUser(
            @PathVariable("userId") Long userId,
            @RequestBody @Valid UpdateAppUserDTO request) {

        appUserService.updateUser(userId, request);
        return ResponseEntity.noContent().build();
    }
}
