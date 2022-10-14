package com.elec5619.backend.entities;

import javax.persistence.*;

import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.TypeDef;

import java.util.*;

@Getter
@Setter
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", columnDefinition = "BINARY(16)", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "email", unique = false, nullable = false)
    private String email;

    @Column(name = "password", unique = false, nullable = false)
    private String password;

    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "name", unique = false, nullable = false)
    private String name;

    @Column(name = "type", unique = false, nullable = false)
    private String type;

    @Column(name = "active", nullable = false)
    private Boolean active = false;


    @Override
    public String toString() {
        return "\nid: " + this.id +
                "\nemail: " + this.email +
                "\npassword: " + this.password +
                "\nusername: " + this.username +
                "\nname: " + this.name +
                "\ntype: " + this.type;
    }

    @OneToMany(mappedBy = "owner")
    protected Collection<Gym> gyms = new ArrayList<Gym>();
//    @OneToMany(mappedBy = "user")
//    private List<Gym> gyms;

    @ManyToMany
    @JoinTable(
            name = "UserRole",
            joinColumns = @JoinColumn(name = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();


    public void addRole(Role role) {
        this.roles.add(role);
    }

    public String getUsername() {
        return this.username;
    }

    public Set<Role> getRole() {
        return this.roles;
    }

    public void updateRole(Role role) {
        Set<Role> newRoles = new HashSet<>();
        newRoles.add(role);
        this.roles = newRoles;
    }

    public void updateUsername(String username) {
        this.username = username;
    }

    public void addGyms(Gym gym) {
        gyms.add(gym);
    }

    public Boolean isAdmin() {
        return true;
    }

}
