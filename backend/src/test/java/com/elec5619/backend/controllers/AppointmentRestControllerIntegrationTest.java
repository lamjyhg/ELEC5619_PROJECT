package com.elec5619.backend.controllers;

import com.apple.eawt.Application;
import com.elec5619.backend.mappers.AppointmentMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = AppointmentController.class)
public class AppointmentRestControllerIntegrationTest {

    private String URL = "/appointments";
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AppointmentController appointmentController;

    @Autowired
    private AppointmentMapper appointmentMapper;


//    @Test
//    void whenValidInput_thenReturns200() throws Exception {
//        RequestBuilder requestBuilder = MockMvcRequestBuilders.get(URL);
//        MvcResult mvcResult = mockMvc.perform(requestBuilder).andReturn();
//        String actualResponseBody = mvcResult.getResponse().getContentAsString();
//
//        assertThat(actualResponseBody).isEqualToIgnoringWhitespace(
//                objectMapper.writeValueAsString(expectedResponseBody));
//    }
@Test
public void contextLoads() throws Exception {
    assertThat(appointmentController).isNull();
}
}
