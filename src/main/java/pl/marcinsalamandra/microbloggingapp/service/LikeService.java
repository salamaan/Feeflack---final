package pl.marcinsalamandra.microbloggingapp.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.marcinsalamandra.microbloggingapp.exception.ConflictException;
import pl.marcinsalamandra.microbloggingapp.repository.LikeRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class LikeService {

    private final LikeRepository likeRepository;

    public void likePost(Long likedById, Long postId) {
        String key = String.format("%s_%s", likedById, postId);

        if(likeRepository.existsByKey(key)) {
            throw new ConflictException("Post already liked");
        }

        likeRepository.likePost(likedById, postId, key);
    }

    public void unlikePost(Long likedById, Long postId) {
        String key = String.format("%s_%s", likedById, postId);

        if(!likeRepository.existsByKey(key)) {
            throw new ConflictException("Post is not liked yet");
        }

        likeRepository.unlikePost(key);
    }
}
