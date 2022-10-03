import com.elec5619.backend.services.UserService;
import com.elec5619.backend.dtos.UserResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import javax.validation.*;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.lang.String;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/admin")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdminController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() throws IOException {
        // return ResponseEntity.ok("yes");
        return ResponseEntity.ok(userService.getAllUsers());
    }
}