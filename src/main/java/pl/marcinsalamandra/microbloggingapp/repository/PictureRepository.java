package pl.marcinsalamandra.microbloggingapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.marcinsalamandra.microbloggingapp.entity.Picture;

import java.util.Optional;

@Repository
public interface PictureRepository extends JpaRepository<Picture, Long> {
    Optional<Picture> findByKey(String key);
    Boolean existsByKey(String key);
    void deleteByKey(String key);
}
