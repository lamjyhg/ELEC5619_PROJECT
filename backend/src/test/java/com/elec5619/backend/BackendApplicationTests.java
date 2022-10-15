package com.elec5619.backend;

import com.elec5619.backend.entities.User;
import com.elec5619.backend.jwt.HashUtil;
import com.elec5619.backend.mappers.UserMapper;
import com.elec5619.backend.repositories.UserRepository;
import com.elec5619.backend.services.UserService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.stream.Stream;
import java.util.*;

import static org.mockito.Mockito.when;
import static org.junit.Assert.assertEquals;


@RunWith(SpringRunner.class)
@SpringBootTest
@DataJpaTest
public class BackendApplicationTests {






}
