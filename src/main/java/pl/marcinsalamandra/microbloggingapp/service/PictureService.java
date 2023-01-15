package pl.marcinsalamandra.microbloggingapp.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.marcinsalamandra.microbloggingapp.entity.Picture;
import pl.marcinsalamandra.microbloggingapp.exception.NotFoundException;
import pl.marcinsalamandra.microbloggingapp.repository.PictureRepository;

import java.io.IOException;

@Service
@AllArgsConstructor
public class PictureService {
    private final PictureRepository pictureRepository;

    public Picture getPictureByKey(String key) {
        return pictureRepository.findByKey(key)
                .orElseThrow(() -> new NotFoundException("Picture not found"));
    }

    public void deletePicture(String key) {
        pictureRepository.deleteByKey(key);
    }

    public void updatePicture(String key, MultipartFile file) throws IOException {
        if(pictureRepository.existsByKey(key)) {
            Picture picture = getPictureByKey(key);

            picture.setData(file.getBytes());
            picture.setName(file.getOriginalFilename());
            picture.setType(file.getContentType());

            pictureRepository.save(picture);
        }
        else {
            pictureRepository.save(new Picture(
                    file.getBytes(),
                    file.getOriginalFilename(),
                    file.getContentType(),
                    key
            ));
        }
    }
}
