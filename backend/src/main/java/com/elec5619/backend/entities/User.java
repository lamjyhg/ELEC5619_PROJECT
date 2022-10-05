package com.elec5619.backend.entities;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

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
    @Column(name = "id", columnDefinition = "BINARY(16)",updatable = false, nullable = false)
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

    @Override
    public String toString(){
        return "\nid: " + this.id +
                "\nemail: " + this.email +
                "\npassword: " + this.password +
                "\nusername: " + this.username +
                "\nname: " + this.name +
                "\ntype: " + this.type;
    }

    @OneToMany(mappedBy = "user")
    protected Collection<Gym> gyms = new ArrayList<Gym>();

    @ManyToMany
    @JoinTable(
            name = "UserRole",
            joinColumns = @JoinColumn(name = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();




    public void addRole(Role role){
        this.roles.add(role);
    }

    public String getUsername(){
        return this.username;
    }

    public Set<Role> getRole(){
            return this.roles;
    }
    public void updateRole(Role role) {
        Set<Role> newRoles = new HashSet<>();
        newRoles.add(role);
        this.roles = newRoles;
    }
    public void addGyms(Gym gym){
        gyms.add(gym);
    }

}
