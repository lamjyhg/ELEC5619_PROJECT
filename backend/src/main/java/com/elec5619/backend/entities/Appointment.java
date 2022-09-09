package com.elec5619.backend.entities;

import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.TypeDef;

import javax.persistence.Entity;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(name = "appointment")
@TypeDef(name = "json", typeClass = JsonType.class)
public class Appointment {
}
