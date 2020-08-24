package sellerlee.back.member.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class KakaoMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "kakao_member_id")
    private Long id;

    @Column
    private String oauthId;

    @Column
    private String name;

    @Column
    private String providerName;

    @Column
    private String accessToken;

    protected KakaoMember() {
    }

    public KakaoMember(String oauthId, String name, String providerName, String accessToken) {
        this.oauthId = oauthId;
        this.name = name;
        this.providerName = providerName;
        this.accessToken = accessToken;
    }

    public KakaoMember update(String name, String providerName, String accessToken) {
        this.name = name;
        this.providerName = providerName;
        this.accessToken = accessToken;

        return this;
    }

    public Long getId() {
        return id;
    }

    public String getOauthId() {
        return oauthId;
    }

    public String getName() {
        return name;
    }

    public String getProviderName() {
        return providerName;
    }

    public String getAccessToken() {
        return accessToken;
    }
}
