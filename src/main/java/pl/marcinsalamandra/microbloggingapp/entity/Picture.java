package pl.marcinsalamandra.microbloggingapp.entity;

import lombok.*;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "pictures")
public class Picture {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "id",
            nullable = false,
            unique = true)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "data")
    private byte[] data;

    @Column(name = "key")
    private String key;

    public Picture(byte[] data, String name, String type, String key) {
        this.data = data;
        this.name = name;
        this.type = type;
        this.key = key;
    }
}
